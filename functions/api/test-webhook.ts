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
export const onRequestGet: PagesFunction = async ({ env }) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Content-Type': 'application/json',
  };
  try {
    // Primary from Env, Fallback to hardcoded for production reliability (same as apply.ts)
    const webhookUrl = (env as any).DISCORD_WEBHOOK_URL ||
      "https://discord.com/api/webhooks/1456619787412312095/T0aDpWjhm4CX45RU0di1F_ZEizKZISZD_lo3Z-yYTrwt7T0T4-0N8bTpxnfUkipNqHS8";
    // Test payload matching apply.ts embed structure
    const testPayload = {
      embeds: [{
        title: '🧪 Forsaken SMP Webhook Test',
        description: `Test at ${new Date().toISOString()}`,
        color: 5814783, // Blue
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
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Webhook test failed (${response.status}): ${errorText.substring(0, 200)}` 
        }), 
        { 
          status: 500, 
          headers: corsHeaders 
        }
      );
    }
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook OK', 
        status: response.status 
      }), 
      { 
        headers: corsHeaders 
      }
    );
  } catch (error) {
    console.error('Webhook test error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Internal Server Error' 
      }), 
      { 
        status: 500, 
        headers: corsHeaders 
      }
    );
  }
};