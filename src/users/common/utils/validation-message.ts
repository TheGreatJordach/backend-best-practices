export const ValidationMessages = {
  isString: (field: string) => ({
    message: `${field} must be a string`,
  }),
  isNotEmpty: (field: string) => ({
    message: `${field} cannot be empty`,
  }),
  length: (field: string, min: number, max: number) => ({
    message: `${field} must be between ${min} and ${max} characters`,
  }),
  isEmail: () => ({
    message: `Email must be a valid email address`,
  }),
  isStrongPassword: () => ({
    message: `Password must be strong (e.g., include uppercase, lowercase, numbers, and symbols)`,
  }),

  isMAPhoneNumber: () => ({
    message: `You must provide Morocco's phone number (e.g., 06 299 55 944)`,
  }),
};
