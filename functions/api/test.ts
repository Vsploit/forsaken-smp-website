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
    JSON.stringify({ success: true, data: { name: 'this works' } }),
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
export const onRequestPost: PagesFunction = () => {
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