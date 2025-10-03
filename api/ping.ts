// functions/api/ping.ts
export const onRequest: PagesFunction = () =>
  new Response(JSON.stringify({ ok: true, where: "pages-functions" }), {
    headers: { "content-type": "application/json" },
  });
