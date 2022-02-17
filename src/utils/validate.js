const validateRegister = (userRegister) => {
  const { name, email, password, confirm_pasword } = userRegister;

  const error = [];

  if (name.length > 10)
    error.push("Display name should not be longer than 10 characters");

  if (!validateEmail(email)) error.push("Invalid email format");

  if (password !== confirm_pasword) error.push("Password does not match");

  return error;
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export { validateRegister };
