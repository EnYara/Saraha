import { EventEmitter } from "node:events";
import { emailEnum } from "./email.enum.js";
import { sendEmail } from "./send.email.js";
import { emailTemplate } from "./email.template.js";
import { set, incr, expire } from "../../../DB/redis/redis.service.js";

export const eventEmitter = new EventEmitter();

eventEmitter.on(emailEnum.confirmEmail, async ({ email, otp, subject }) => {
  await sendEmail({
    to: email,
    subject:
      subject === emailEnum.confirmEmail
        ? "Confirm your email"
        : "Reset your password",
    html: emailTemplate(otp),
  });

  // ✅ save OTP
  await set({
    key: otpKey({ email, subject }),
    value: Hash({ plainText: `${otp}` }),
    ttl: 60 * 2, // 2 دقايق
  });

  // ✅ increment attempts
  await incr(max_otpKey({ email }));
  await expire(max_otpKey({ email }), 60 * 5); // 🔥 5 دقايق
});