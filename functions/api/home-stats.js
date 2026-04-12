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
        let stats = await env.DB.prepare('SELECT * FROM site_stats WHERE id = 1').first();
        
        const online = await env.DB.prepare(`
            SELECT COUNT(*) as count FROM active_users 
            WHERE last_seen > datetime('now', '-5 minutes')
        `).first();
        
        const today = new Date().toISOString().slice(0, 10);
        if (stats && stats.last_reset !== today) {
            await env.DB.prepare(`UPDATE site_stats SET today_visitors = 0, last_reset = ? WHERE id = 1`, [today]).run();
            stats.today_visitors = 0;
        }
        
        return new Response(JSON.stringify({
            success: true,
            data: {
                online_count: online?.count || 0,
                total_views: stats?.total_views || 0,
                total_followers: stats?.total_followers || 0,
                total_shares: stats?.total_shares || 0,
                today_visitors: stats?.today_visitors || 0,
                reactions: {
                    excellent: 0, interesting: 0, useful: 0,
                    thoughtful: 0, contemplative: 0, wonderful: 0, awesome: 0
                },
                trending: [],
                weekly_data: [120, 190, 150, 210, 280, 350, 300],
                monthly_data: [450, 620, 780, 950]
            }
        }), { headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    } catch (error) {
        return new Response(JSON.stringify({ success: false, error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
    }
}
