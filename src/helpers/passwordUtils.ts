import bcryptjs from "bcryptjs";

const hashPassword = async (password: string) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isMatch = await bcryptjs.compare(password, hashedPassword);
  return isMatch;
};

export { hashPassword, comparePassword };
