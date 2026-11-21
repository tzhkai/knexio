/**
 * Cloudflare Pages worker: the retired AI-prompt section answers 410 Gone.
 * _redirects cannot express 410, so the status is enforced here, before assets.
 */
const RETIRED_PREFIXES = ["/guides", "/series", "/workflows", "/tools", "/games"];

const GONE_HTML = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,follow" /><title>Gone — 410 | Knexio</title>
<style>body{margin:0;background:#f6f2ea;color:#20211e;font-family:Georgia,serif;display:grid;min-height:100vh;place-items:center;padding:32px}
main{max-width:560px}h1{font-size:38px;letter-spacing:-.04em;margin:0 0 14px}p{font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#54564e}
a{color:#176b5b;font-weight:700}</style></head>
<body><main><h1>This section has been retired</h1>
<p>The article library that used to live here has been permanently removed. It is not coming back, and there is no replacement page to send you to.</p>
<p>What replaced it: a reference of U.S. residential electricity bills built from EIA Electric Power Monthly data.</p>
<p><a href="/average-electric-bill/">Average electric bill by state</a> &middot; <a href="/electricity-cost-calculator/">Electricity cost calculator</a></p>
</main></body></html>`;

function isRetired(pathname) {
  const lower = pathname.toLowerCase();
  return RETIRED_PREFIXES.some((prefix) => lower === prefix || lower.startsWith(`${prefix}/`));
}

const APEX_ORIGIN = "https://knexio.cc.cd";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    if (url.hostname.startsWith("www.")) {
      return Response.redirect(`${APEX_ORIGIN}${url.pathname}${url.search}`, 301);
    }
    if (isRetired(pathname)) {
      return new Response(request.method === "HEAD" ? null : GONE_HTML, {
        status: 410,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "public, max-age=3600",
          "x-robots-tag": "noindex",
        },
      });
    }
    return env.ASSETS.fetch(request);
  },
};
