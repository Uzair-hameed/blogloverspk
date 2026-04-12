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
        
        const existing = await env.DB.prepare(`SELECT * FROM followers_log WHERE ip = ? AND DATE(followed_at) = ?`, [ip, today]).first();
        
        if (!existing) {
            await env.DB.prepare(`UPDATE site_stats SET total_followers = total_followers + 1 WHERE id = 1`).run();
            await env.DB.prepare(`INSERT INTO followers_log (ip) VALUES (?)`, [ip]).run();
        }
        
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}
