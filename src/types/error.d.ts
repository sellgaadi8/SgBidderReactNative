type LoginErrors = {
  mobile?: string;
  password?: string;
};

type RegisterErrors = {
  otp?: string;
  phone?: string;
};

type PasswordErrors = {
  password?: string;
  confirmPassword?: string;
};

type EditProfileErrors = {
  name?: string;
  email?: string;
};
