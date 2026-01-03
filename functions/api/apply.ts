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
  try {
    const data = await request.json();
    const webhookUrl = (env as any).DISCORD_WEBHOOK_URL || 
      "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
    // Build the basic fields array - exact replica of worker logic
    const fields = [
      { name: "Discord Username", value: `\`${data.discord || "N/A"}\``, inline: true },
      { name: "Age", value: data.age?.toString() || "N/A", inline: true },
      { name: "Region/Timezone", value: data.region || "N/A" },
      { name: "Playtime (MC)", value: data.playtime || "N/A", inline: true },
      { name: "Weekly Activity", value: data.activity || "N/A", inline: true },
      { name: "Why join?", value: data.whyJoin || "N/A" },
      { name: "Skills/Contributions", value: data.skills || "N/A" }
    ];
    // Conditionally add the video application link if provided - exact logic
    if (data.videoLink && typeof data.videoLink === 'string' && data.videoLink.trim() !== '') {
      fields.push({
        name: "Video Application",
        value: `[Click to View Video](${data.videoLink})`,
        inline: false
      });
    }
    // Add final administrative field
    fields.push({
      name: "Rule Acceptance",
      value: data.rulesAccepted ? "✅ Accepted all rules" : "❌ Not confirmed"
    });
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
      const errorText = await response.text();
      console.error('Discord webhook failed:', errorText);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to notify staff' }),
        {
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Content-Type': 'application/json',
          },
        }
      );
    }
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Application processing error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
export const onRequestGet: PagesFunction = () => {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Type': 'application/json',
      },
    }
  );
};
export const onRequestPut: PagesFunction = () => {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Type': 'application/json',
      },
    }
  );
};
export const onRequestDelete: PagesFunction = () => {
  return new Response(
    JSON.stringify({ success: false, error: 'Method not allowed' }),
    {
      status: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Type': 'application/json',
      },
    }
  );
};