import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    app.get('/api/test', (c) => c.json({ success: true, data: { name: 'this works' }}));
    app.post('/api/apply', async (c) => {
        try {
            const data = await c.req.json();
            const webhookUrl = "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
            const payload = {
                embeds: [{
                    title: "🚀 New SMP Membership Application",
                    color: 16347926, // #F97316 in decimal
                    fields: [
                        { name: "Discord Username", value: data.discord || "N/A", inline: true },
                        { name: "Age", value: data.age?.toString() || "N/A", inline: true },
                        { name: "Region/Timezone", value: data.region || "N/A" },
                        { name: "Playtime (MC)", value: data.playtime || "N/A", inline: true },
                        { name: "Weekly Activity", value: data.activity || "N/A", inline: true },
                        { name: "Why join?", value: data.whyJoin || "N/A" },
                        { name: "Skills/Contributions", value: data.skills || "N/A" },
                        { name: "Rule Acceptance", value: data.rulesAccepted ? "✅ Accepted all rules" : "❌ Not confirmed" }
                    ],
                    timestamp: new Date().toISOString(),
                    footer: { text: "Forsaken SMP Onboarding Portal" }
                }]
            };
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                console.error('Discord webhook failed:', await response.text());
                return c.json({ success: false, error: 'Failed to notify staff' }, 500);
            }
            return c.json({ success: true });
        } catch (error) {
            console.error('Application processing error:', error);
            return c.json({ success: false, error: 'Internal server error' }, 500);
        }
    });
}