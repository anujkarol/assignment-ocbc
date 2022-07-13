import { rest } from "msw";
import { client } from "../customHooks/apiClient";
import { server } from "../mocks/server";

const baseurl = process.env.REACT_APP_DEVELOPMENT_URL;

test("WHEN calls fetch at the endpoint with the arguments for GET requests THEN it should match the mock response", async () => {
  const endpoint = "test-endpoint1";
  const mockResult = { balance: 15000, success: "success" };

  server.use(
    rest.get(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(mockResult));
    })
  );

  const result = await client(endpoint);
  expect(result).toEqual(mockResult);
});

test("when data is provided, it is stringified and the method defaults to POST", async () => {
  const endpoint = "test-endpoint1";
  server.use(
    rest.post(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      return res(ctx.json(req.body));
    })
  );
  const data = { a: "b" };
  const result = await client(endpoint, { data });

  expect(result).toEqual(data);
});

test("WHEN token is provided THEN add token in request", async () => {
  const token = "FAKE_TOKEN_DATA";

  let request;
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "VALUE" };
  server.use(
    rest.get(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await client(endpoint, { token });

  expect(request.headers.get("Authorization")).toBe(`${token}`);
});

test(`WHEN promises catches error THEN throw error object`, async () => {
  const testError = { message: "Test error" };
  const endpoint = "test-endpoint";
  server.use(
    rest.get(`${baseurl}${endpoint}`, async (req, res, ctx) => {
      return res(ctx.status(400), ctx.json(testError));
    })
  );

  const error = await client(endpoint).catch((e) => e);

  expect(error).toEqual(testError);
});
