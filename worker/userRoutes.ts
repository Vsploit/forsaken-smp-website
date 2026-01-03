import { Hono } from "hono";
import type { MiddlewareHandler } from 'hono';
import { Env } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
    const testHandler: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
        if (c.req.method !== 'GET') return next();
        return c.json({ success: true, data: { name: 'this works' } });
    };
    app.use('/api/test', testHandler);
    const applyHandler: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
        if (c.req.method !== 'POST') return next();
        try {
            const data = await c.req.json();
            const webhookUrl = ((c.env as any).DISCORD_WEBHOOK_URL as string) || "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
            // Build the basic fields array
            const fields = [
                { name: "Discord Username", value: `\`${data.discord || "N/A"}\``, inline: true },
                { name: "Age", value: data.age?.toString() || "N/A", inline: true },
                { name: "Region/Timezone", value: data.region || "N/A" },
                { name: "Playtime (MC)", value: data.playtime || "N/A", inline: true },
                { name: "Weekly Activity", value: data.activity || "N/A", inline: true },
                { name: "Why join?", value: data.whyJoin || "N/A" },
                { name: "Skills/Contributions", value: data.skills || "N/A" }
            ];
            // Conditionally add the video application link if provided
            if (data.videoLink && typeof data.videoLink === 'string' && data.videoLink.trim() !== '') {
                fields.push({
                    name: "Video Application",
                    value: `[Click to View Video](${data.videoLink})`,
                    inline: false
                } as any);
            }
            // Add final administrative field
            fields.push({ 
                name: "Rule Acceptance", 
                value: data.rulesAccepted ? "✅ Accepted all rules" : "❌ Not confirmed" 
            } as any);
            const payload = {
                embeds: [{
                    title: "�� New SMP Membership Application",
                    description: `A new player has submitted an application for Forsaken SMP.`,
                    color: 16347926, // #F97316 in decimal
                    fields: fields,
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
    };
    app.use('/api/apply', applyHandler);
}