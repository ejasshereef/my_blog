import validator from "validator";

const email = "test@example.com";
export const isValidEmail = validator.isEmail(email); // Returns true if valid

const phone = "+1234567890";
export const isValidPhone = validator.isMobilePhone(phone); // Returns true if valid
