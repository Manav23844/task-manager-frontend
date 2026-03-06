import API from "../src/services/api";

test("api base url exists", () => {

  expect(API.defaults.baseURL).toBeDefined();

});