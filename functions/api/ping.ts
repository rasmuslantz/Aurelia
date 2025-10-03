export const onRequest: PagesFunction = () =>
  new Response(JSON.stringify({ ok: true }), { headers: { "content-type": "application/json" }});
