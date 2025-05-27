// import { NextRequest } from "next/server";
// const { verifyOtpToken } = await import("../../manageOtp/generateOtp");


// export async function POST(req:NextRequest) {
//   try {
//     const body = await req.json();
//     console.log("here is the request body: ", body)
//     const { otpToken, otp } = body;
//     console.log("Received token:", otpToken);
//     console.log("Received OTP:", otp);


//     const result = await verifyOtpToken(otpToken, otp);
//     console.log("OTP verification result:", result);

//     return new Response(JSON.stringify({ message: "OTP verified successfully", data: result }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error("Error verifying OTP:", error);
//     return new Response(JSON.stringify({ message: "OTP verification failed", error: error.message }), {
//       status: 400,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
    
// }





import { NextRequest } from "next/server";
const { verifyOtpToken } = await import("../../manageOtp/generateOtp");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("✅ Request body received:", body);

    const { otpToken, otp, token } = body;
    const actualToken = otpToken || token; // support fallback if needed

    console.log("Using token:", actualToken);
    console.log("Using OTP:", otp);

    const result = await verifyOtpToken(actualToken, otp);
    console.log("✅ OTP verification result:", result);

    return new Response(
      JSON.stringify({ message: "OTP verified successfully", data: result }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error: any) {
    console.error("❌ Error verifying OTP:", error);
    return new Response(
      JSON.stringify({
        message: "OTP verification failed",
        error: error.message,
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
