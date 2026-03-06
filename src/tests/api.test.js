import MockAdapter from "axios-mock-adapter";

beforeEach(() => {
  localStorage.clear();
});

test("API uses VITE_API_URL and attaches Bearer token", async () => {
  process.env.VITE_API_URL = "http://example.test/api";
  localStorage.setItem("token", "jwt-123");

  const { default: API } = await import("../services/api");

  expect(API.defaults.baseURL).toBe("http://example.test/api");

  const mock = new MockAdapter(API);
  mock.onGet("/tasks").reply((config) => {
    const authHeader =
      config.headers?.Authorization ??
      config.headers?.authorization ??
      config.headers?.get?.("Authorization");

    expect(authHeader).toBe("Bearer jwt-123");
    return [200, []];
  });

  await API.get("/tasks");
  mock.restore();
});

