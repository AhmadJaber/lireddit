import { UsernamePasswordInput } from "../resolvers/UsernamePasswordInput";

function emailIsValid(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const validateRegister = (options: UsernamePasswordInput) => {
  const rightUsername = /^[a-z0-9_-]+$/gim;

  if (!emailIsValid(options.email)) {
    return [
      {
        field: "email",
        message: "Please fix your email to continue.",
      },
    ];
  }

  if (options.username.length === 0) {
    return [
      {
        field: "username",
        message: "You didn't enter a username.",
      },
    ];
  }

  if (options.username.length <= 2 || options.username.length > 16) {
    return [
      {
        field: "username",
        message: "Username must be between 3 and 16 characters.",
      },
    ];
  }

  if (!rightUsername.test(options.username)) {
    return [
      {
        field: "username",
        message:
          "Letters, numbers, dashes, and underscores only. Please try again without symbols.",
      },
    ];
  }

  if (options.password.length <= 5) {
    return [
      {
        field: "password",
        message: "Password must be at least 6 characters long.",
      },
    ];
  }

  return null;
};
