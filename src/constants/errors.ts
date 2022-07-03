import { ERRORS } from "../constants/locales";

export const errors = {
  username: {
    empty: ERRORS.USERNAME.EMPTY,
    invalid: ERRORS.USERNAME.INVALID
  },
  password: {
    length: ERRORS.PASSWORD.LENGTH,
    invalid: ERRORS.PASSWORD.EMPTY
  },
  confirmpassword: {
    length: ERRORS.CONFIRM_PASSWORD.LENGTH,
    invalid: ERRORS.CONFIRM_PASSWORD.EMPTY,
    match: ERRORS.CONFIRM_PASSWORD.NOTMATCH
  },
  recepient: {
    empty: ERRORS.RECEPIENT.EMPTY
  },
  amount: {
    empty: ERRORS.AMOUNT.EMPTY
  },
  date: {
    empty: ERRORS.DATE.EMPTY
  },
  serveDown: ERRORS.SERVER.DOWN
};
