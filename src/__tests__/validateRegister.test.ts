import * as errorConstant from "../constants/errors";
import validateRegisterForm from "../utils/validateRegister";

test("WHEN userdata is empty THEN it should errors and form validity", () => {
  expect(
    validateRegisterForm({
      username: "123",
      password: "",
      confirmpassword: ""
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      password: errorConstant.errors.password.invalid
    }
  });
});
test("WHEN userdata is wrong THEN it should give error and form validity", () => {
  expect(
    validateRegisterForm({
      username: "",
      password: "123",
      confirmpassword: ""
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      username: errorConstant.errors.username.empty
    }
  });
});

test("WHEN confirmpassword is empty THEN it should give confirm password empty error", () => {
  expect(
    validateRegisterForm({
      username: "anuj",
      password: "12334",
      confirmpassword: ""
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      confirmpassword: errorConstant.errors.confirmpassword.invalid
    }
  });
});

test("WHEN userdata is correct THEN it should form validity", () => {
  expect(
    validateRegisterForm({
      username: "ocbc",
      password: "1234",
      confirmpassword: "1234"
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      password: errorConstant.errors.password.length
    }
  });
});

test("WHEN confirmpassword lentgh is smaller < 5 THEN it should throw error", () => {
  expect(
    validateRegisterForm({
      username: "ocbc",
      password: "12345",
      confirmpassword: "123"
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      confirmpassword: errorConstant.errors.confirmpassword.length
    }
  });
});
test("WHEN userdata is correct THEN it form should be valid", () => {
  expect(
    validateRegisterForm({
      username: "ocbc",
      password: "12345",
      confirmpassword: "12345"
    })
  ).toStrictEqual({
    isFormValid: true,
    errors: {}
  });
});

test("WHEN userdata is correct THEN it form should throw mismatch error", () => {
  expect(
    validateRegisterForm({
      username: "ocbc",
      password: "12345",
      confirmpassword: "123415"
    })
  ).toStrictEqual({
    isFormValid: false,
    errors: {
      confirmpassword: errorConstant.errors.confirmpassword.match
    }
  });
});
