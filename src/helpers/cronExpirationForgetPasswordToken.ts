import cron from "node-cron";
import { UserSchema } from "../models";

// This scheduled task will delete the tokens whose expiration date has passed 10 minutes for those users who wanted to reset their password, because the token duration is 10 minutes and it is already expired it is garbage for the database, in this case the user will generate a new token if he wants to reset his password.

// The task is executed at the first minute of every hour. (0)
cron.schedule("0 * * * *", async () => {
  const currentDate = new Date();
  try {
    // If the passwordTokenExpirationDate is less than the current date, it means that the token has expired and therefore we will look for the values in the model that meet the condition and remove the properties on each value to avoid junk properties.
    await UserSchema.updateMany(
      { passwordTokenExpirationDate: { $lt: currentDate } },
      { $unset: { passwordToken: "", passwordTokenExpirationDate: "" } }
    );
  } catch (error) {
    console.log(error);
  }
});
