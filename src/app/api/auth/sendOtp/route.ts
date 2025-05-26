import {
  generateOtp,
  generateOtpToken,
  sendOtpEmail,
} from "../../manageOtp/generateOtp";

export async function POST(request: Request) {
  const { email } = await request.json();
  console.log("Received request to send OTP to:", email);

  console.log("Received email:", email);
  const otp = generateOtp();
  console.log("Generated OTP:", otp);

  await sendOtpEmail(email, otp);
  const otpToken = await generateOtpToken(email, otp);
  console.log("generated OTP token: ",otpToken )

return new Response(
  JSON.stringify({ message: "OTP sent successfully", otpToken }),
  {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  }
);}
