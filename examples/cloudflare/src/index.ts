import transform from "./transform";
import * as slimdom from "slimdom";
export default {
  async fetch(request, env, ctx): Promise<Response> {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    if (url === null) {
      throw new Error("Bad URL");
    }
    const serializer = new slimdom.XMLSerializer();
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const transformed = transform(
      slimdom.parseXmlDocument(await response.text()),
    ).get("#default").document;
    const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
    <body>${serializer.serializeToString(transformed)}</body>
</html>`;

    return new Response(html, {
      headers: new Headers({ "Content-Type": "text/html" }),
    });
  },
} satisfies ExportedHandler<Env>;
