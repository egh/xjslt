const functions = require("@google-cloud/functions-framework");
const transform = require("./transform");
const slimdom = require("slimdom");

// Register an HTTP function with the Functions Framework that will be executed
// when you make an HTTP request to the deployed function's endpoint.
functions.http("transform", async (req, res) => {
  console.log(req.query.url);
  const url = req.query.url;
  if (url === null) {
    throw new Error("Bad URL");
  }
  const serializer = new slimdom.XMLSerializer();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  const transformed = transform
    .transform(slimdom.parseXmlDocument(await response.text()), {})
    .get("#default").document;
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="utf-8" />
  <title></title>
  </head>
  <body>${serializer.serializeToString(transformed)}</body>
  </html>`;

  res.send(html);
});
