import { Hono } from "hono";
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    // Note: CORS is handled in index.ts for global /api coverage
    app.get('/api/test', async (c) => {
        return c.json({
            success: true,
            data: {
                status: 'healthy',
                service: 'Forsaken SMP API',
                timestamp: new Date().toISOString()
            }
        });
    });
    app.get('/api/test-webhook', async (c) => {
        try {
            const webhookUrl = (c.env as any).DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8';
            const testPayload = {
                embeds: [{
                    title: '🧪 Forsaken SMP Webhook Test',
                    description: `Test at ${new Date().toISOString()}`,
                    color: 5814783,
                    footer: { text: 'Auto-test' }
                }]
            };
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(testPayload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Test webhook failed (${response.status}):`, errorText);
                return c.json({
                    success: false,
                    error: `Webhook test failed (${response.status}): ${errorText.substring(0, 200)}`
                }, 500);
            }
            return c.json({ success: true, message: 'Webhook OK', status: response.status });
        } catch (error) {
            console.error('Webhook test error:', error);
            return c.json({ success: false, error: 'Internal Server Error' }, 500);
        }
    });
    app.post('/api/apply', async (c) => {
        try {
            const data = await c.req.json();
            const webhookUrl = (c.env as any).DISCORD_WEBHOOK_URL || 'https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8';
            const fields = [
                { name: "Discord Username", value: `\`${data.discord || "N/A"}\``, inline: true },
                { name: "Age", value: data.age?.toString() || "N/A", inline: true },
                { name: "Region/Timezone", value: data.region || "N/A" },
                { name: "Playtime (MC)", value: data.playtime || "N/A", inline: true },
                { name: "Weekly Activity", value: data.activity || "N/A", inline: true },
                { name: "Why join?", value: data.whyJoin || "N/A" },
                { name: "Skills/Contributions", value: data.skills || "N/A" }
            ];
            if (data.videoLink && typeof data.videoLink === 'string' && data.videoLink.trim() !== '') {
                fields.push({ name: "Video Application / Portfolio", value: `[View Submission](${data.videoLink})`, inline: false });
            }
            fields.push({ name: "Status", value: data.rulesAccepted ? "✅ Rules Accepted" : "❌ Rules Not Accepted" });
            const payload = {
                embeds: [{
                    title: "🛡️ Forsaken SMP: New Membership Application",
                    description: `A new player has submitted an application for review.`,
                    color: 16347926,
                    fields: fields,
                    timestamp: new Date().toISOString(),
                    footer: { text: "Forsaken SMP Gateway" }
                }]
            };
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorText = await response.text();
                const status = response.status || 'unknown';
                console.error(`Discord webhook failed (${status}): ${errorText}`);
                return c.json({
                    success: false,
                    error: `Discord webhook failed (${status}): ${errorText.substring(0, 200)}`
                }, 500);
            }
            return c.json({ success: true });
        } catch (error) {
            console.error('Application error:', error);
            return c.json({ success: false, error: 'Internal Server Error' }, 500);
        }
    });
}