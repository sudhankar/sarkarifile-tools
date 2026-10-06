# SarkariFile Tools

Blogger-safe client-side tools.

## Architecture

- Tool HTML: Blogger post
- CSS: Cloudflare Pages
- JavaScript: Cloudflare Pages
- PDF library: loaded only when PDF Merge is actually used
- iframe: not used
- AdSense code: not included
- Processing: browser-side for this PDF Merge prototype

## Cloudflare Pages

Static project. No framework is required.

Recommended:
- Production branch: `main`
- Build command: `exit 0`
- Build output directory: `.`

Cloudflare Pages will provide a `*.pages.dev` URL.

## Blogger

Copy `blogger/pdf-merge.html` into the Blogger post HTML editor and replace:

`https://YOUR-PAGES-DOMAIN.pages.dev`

with the actual Pages URL.

Do not add the CSS or PDF Merge JS to Blogger.
