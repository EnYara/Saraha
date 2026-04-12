import { EventEmitter } from "node:events";
import { emailEnum } from "./email.enum.js";




export const eventEmitter = new EventEmitter();

eventEmitter.on(emailEnum.confirmEmail, async ({ email, otp, subject }) => {
  await sendEmail({
    to: email,
    subject: subject,
    html: emailTemplate(otp),
  });

  await set({
    key: otpKey({ email, subject }),
    value: Hash({ plainText: `${otp}` }),
    ttl: 60 * 2,
  });

  await incr(max_otpKey({ email }));
  await expire(max_otpKey({ email }), 60 * 5);
});