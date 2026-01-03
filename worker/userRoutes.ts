import { Hono } from "hono";
import type { MiddlewareHandler } from 'hono';
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    const healthHandler: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
        if (c.req.method !== 'GET') return next();
        return c.json({ success: true, data: { status: 'healthy', worker: true } });
    };
    app.use('/api/test', healthHandler);
    const applyHandler: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
        if (c.req.method !== 'POST') return next();
        try {
            const data = await c.req.json();
            const webhookUrl = ((c.env as any).DISCORD_WEBHOOK_URL as string) || 
              "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
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
                fields.push({
                    name: "Video Application / Portfolio",
                    value: `[View Submission](${data.videoLink})`,
                    inline: false
                } as any);
            }
            fields.push({
                name: "Status",
                value: data.rulesAccepted ? "✅ Rules Accepted" : "❌ Not Accepted"
            } as any);
            const payload = {
                embeds: [{
                    title: "🛡️ Forsaken SMP: New Membership Application (Worker)",
                    description: `A new application has arrived via the worker routing layer.`,
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
                console.error('Worker webhook failed:', await response.text());
                return c.json({ success: false, error: 'Failed to notify staff' }, 500);
            }
            return c.json({ success: true });
        } catch (error) {
            console.error('Worker application error:', error);
            return c.json({ success: false, error: 'Internal server error' }, 500);
        }
    };
    app.use('/api/apply', applyHandler);
}