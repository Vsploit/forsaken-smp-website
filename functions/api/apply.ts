export const onRequestOptions: PagesFunction = () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    },
  });
};
export const onRequestPost: PagesFunction = async ({ request, env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Content-Type': 'application/json',
  };
  try {
    const data = await request.json();
    // Primary from Env, Fallback to hardcoded for production reliability
    const webhookUrl = (env as any).DISCORD_WEBHOOK_URL || 
      "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
    // Build fields for Discord Embed
    const fields = [
      { name: "Discord Username", value: `\`${data.discord || "N/A"}\``, inline: true },
      { name: "Age", value: data.age?.toString() || "N/A", inline: true },
      { name: "Region/Timezone", value: data.region || "N/A" },
      { name: "Playtime (MC)", value: data.playtime || "N/A", inline: true },
      { name: "Weekly Activity", value: data.activity || "N/A", inline: true },
      { name: "Why join?", value: data.whyJoin || "N/A" },
      { name: "Skills/Contributions", value: data.skills || "N/A" }
    ];
    // Video Application formatting
    if (data.videoLink && typeof data.videoLink === 'string' && data.videoLink.trim() !== '') {
      fields.push({
        name: "Video Application / Portfolio",
        value: `[View Submission](${data.videoLink})`,
        inline: false
      });
    }
    fields.push({
      name: "Status",
      value: data.rulesAccepted ? "✅ Rules Accepted" : "❌ Rules Not Accepted"
    });
    const payload = {
      embeds: [{
        title: "🛡️ Forsaken SMP: New Membership Application",
        description: `A new player has submitted an application for review.`,
        color: 16347926, // Orange
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
      console.error('Discord webhook failed:', errorText);
      return new Response(JSON.stringify({ success: false, error: 'Webhook delivery failed' }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
    return new Response(JSON.stringify({ success: true }), { 
      headers: corsHeaders 
    });
  } catch (error) {
    console.error('Application error:', error);
    return new Response(JSON.stringify({ success: false, error: 'Internal Server Error' }), { 
      status: 500, 
      headers: corsHeaders 
    });
  }
};