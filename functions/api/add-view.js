export async function onRequest(context) {
    const { request, env } = context;
    
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (request.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }
    
    try {
        const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
        const today = new Date().toISOString().slice(0, 10);
        
        const existing = await env.DB.prepare(`SELECT * FROM daily_visitors WHERE ip = ? AND date = ?`, [ip, today]).first();
        
        if (!existing) {
            await env.DB.prepare(`UPDATE site_stats SET today_visitors = today_visitors + 1 WHERE id = 1`).run();
            await env.DB.prepare(`INSERT INTO daily_visitors (ip, date) VALUES (?, ?)`, [ip, today]).run();
        }
        
        await env.DB.prepare(`UPDATE site_stats SET total_views = total_views + 1 WHERE id = 1`).run();
        await env.DB.prepare(`INSERT OR REPLACE INTO active_users (ip, last_seen) VALUES (?, datetime('now'))`, [ip]).run();
        
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}
