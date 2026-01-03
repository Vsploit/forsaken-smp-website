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
export const onRequestGet: PagesFunction = () => {
  return new Response(
    JSON.stringify({ 
      success: true, 
      data: { 
        status: 'healthy', 
        service: 'Forsaken SMP API',
        timestamp: new Date().toISOString() 
      } 
    }),
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Content-Type': 'application/json',
      },
    }
  );
};