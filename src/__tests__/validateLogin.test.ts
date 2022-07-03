import validateForm from "../utils/validateLogin";
import * as errorConstant from "../constants/errors";

test("WHEN userdata is empty THEN it should errors and form validity", () => {
  expect(validateForm({ username: "123", password: "" })).toStrictEqual({
    isFormValid: false,
    errors: {
      password: errorConstant.errors.password.invalid
    }
  });
});
test("WHEN userdata is wrong THEN it should give error and form validity", () => {
  expect(validateForm({ username: "", password: "123" })).toStrictEqual({
    isFormValid: false,
    errors: {
      username: errorConstant.errors.username.empty
    }
  });
});

test("WHEN userdata is correct THEN it should form validity", () => {
  expect(validateForm({ username: "ocbc", password: "1234" })).toStrictEqual({
    isFormValid: false,
    errors: {
      password: errorConstant.errors.password.length
    }
  });
});
test("WHEN userdata is correct THEN it form should be valid", () => {
  expect(validateForm({ username: "ocbc", password: "12345" })).toStrictEqual({
    isFormValid: true,
    errors: {}
  });
});
