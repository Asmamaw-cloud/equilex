import { NextRequest } from "next/server";
const { verifyOtpToken } = await import("../../manageOtp/generateOtp");


export async function POST(req:NextRequest) {
  try {
    const { token, otp } = await req.json();
    console.log("Received token:", token);
    console.log("Received OTP:", otp);


    const result = await verifyOtpToken(token, otp);
    console.log("OTP verification result:", result);

    return new Response(JSON.stringify({ message: "OTP verified successfully", data: result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return new Response(JSON.stringify({ message: "OTP verification failed", error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
    
}