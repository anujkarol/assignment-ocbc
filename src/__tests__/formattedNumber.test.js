import { formattedNumber } from "../utils/formattedNumber";

test("WHEN number is passed to function THEN it should return the formatted number", () => {
  expect(formattedNumber(1234567)).toStrictEqual("1,234,567");
});
