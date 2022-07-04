import validateForm from "../utils/validateTransfer";

const values = {
  receipientAccountNo: "",
  amount: "",
  description: "",
  date: ""
};
test("WHEN userdata is wrong THEN it should form validity", () => {
  expect(
    validateForm({
      receipientAccountNo: "anuj",
      amount: "123",
      description: "test",
      date: "312433545"
    })
  ).toStrictEqual({
    isFormValid: true,
    errors: {}
  });
});

test("WHEN userdata is empty THEN it should errors and form validity", () => {
  expect(validateForm(values)).toStrictEqual({
    isFormValid: false,
    errors: {
      amount: "Amount is required",
      date: "Date is required",
      receipientAccountNo: "Please select recipient"
    }
  });
});
