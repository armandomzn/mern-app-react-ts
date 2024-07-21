import crypto from "crypto";

// This function allows us to hash the user token when creating a request to reset the password, the original token will only have the user because it is sent by mail and the database will have the hashed token.
const createHashToken = (tokeToHash: string) => {
  return crypto.createHash("sha256").update(tokeToHash).digest("hex");
};

export { createHashToken };
