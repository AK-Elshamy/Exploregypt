const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const app = require("../src/app");

const request = (path) =>
  new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();

      const req = http.request(
        {
          hostname: "127.0.0.1",
          port,
          path,
          method: "GET",
        },
        (res) => {
          let body = "";

          res.on("data", (chunk) => {
            body += chunk;
          });

          res.on("end", () => {
            server.close();
            resolve({
              statusCode: res.statusCode,
              body: JSON.parse(body),
            });
          });
        }
      );

      req.on("error", (error) => {
        server.close();
        reject(error);
      });

      req.end();
    });
  });

test("GET / returns API health response", async () => {
  const response = await request("/");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.status, "ok");
  assert.equal(response.body.message, "Exploregypt API is running");
});

test("Unknown routes return 404 JSON response", async () => {
  const response = await request("/api/does-not-exist");

  assert.equal(response.statusCode, 404);
  assert.equal(response.body.message, "Route not found");
});
