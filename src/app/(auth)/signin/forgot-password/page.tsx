// "use client";

// import * as z from "zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Loader2,
//   Mail,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import axios from "axios";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
// });

// const ForgotPasswordPage = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [submittedEmail, setSubmittedEmail] = useState<string>("");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       setIsLoading(true);
//       console.log("post(/api/auth/sendOtp called")
//       const response = await axios.post("/api/auth/sendOtp", {
//         email: values.email,
//       });
//       console.log("Password reset response:", response);

//       if (response.status === 200) {
//         setSubmittedEmail(values.email);
//         setIsSubmitted(true);
//         toast.success("Password reset email sent successfully!");
//       }
//     } catch (error: any) {
//       console.error("Password reset error:", error);

//       // Axios error handling
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "An error occurred. Please try again later.";

//       toast.error(message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const handleResendEmail = async () => {
//     if (submittedEmail) {
//       await onSubmit({ email: submittedEmail });
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center space-y-2">
//             <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
//             <h1 className="text-3xl font-bold tracking-tight">
//               Check your email
//             </h1>
//             <p className="text-muted-foreground">
//               We've sent a password reset link to your email address
//             </p>
//           </div>

//           <Card className="border-muted/40 shadow-lg">
//             <CardContent className="pt-6">
//               <Alert>
//                 <Mail className="h-4 w-4" />
//                 <AlertDescription>
//                   We've sent a password reset link to{" "}
//                   <strong>{submittedEmail}</strong>. Click the link in the email
//                   to reset your password.
//                 </AlertDescription>
//               </Alert>

//               <div className="mt-6 space-y-4">
//                 <p className="text-sm text-muted-foreground text-center">
//                   Didn't receive the email? Check your spam folder or try again.
//                 </p>

//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={handleResendEmail}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : (
//                     <Mail className="mr-2 h-4 w-4" />
//                   )}
//                   Resend email
//                 </Button>

//                 <Button variant="ghost" className="w-full" asChild>
//                   <Link href="/signin">
//                     <ArrowLeft className="mr-2 h-4 w-4" />
//                     Back to sign in
//                   </Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Forgot your password?
//           </h1>
//           <p className="text-muted-foreground">
//             Enter your email address and we'll send you a link to reset your
//             password
//           </p>
//         </div>

//         <Card className="border-muted/40 shadow-lg">
//           <CardHeader className="space-y-1 pb-6">
//             <CardTitle className="text-xl">Reset password</CardTitle>
//             <CardDescription>
//               We'll send you a secure link to reset your password
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email address</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                           <Input
//                             {...field}
//                             className="pl-10"
//                             placeholder="name@example.com"
//                             type="email"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   disabled={isLoading}
//                   type="submit"
//                   className="w-full cursor-pointer"
//                   size="lg"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : (
//                     <Mail className="mr-2 h-4 w-4" />
//                   )}
//                   Send reset link
//                 </Button>
//               </form>
//             </Form>

//             <div className="mt-6">
//               <Button variant="ghost" className="w-full" asChild>
//                 <Link href="/signin">
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back to sign in
//                 </Link>
//               </Button>
//             </div>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4 border-t bg-muted/50 p-6">
//             <Alert>
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription className="text-xs">
//                 For security reasons, we'll send the reset link even if the
//                 email address isn't associated with an account. This prevents
//                 email enumeration attacks.
//               </AlertDescription>
//             </Alert>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;




// "use client";

// import * as z from "zod";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
//   CardFooter,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Loader2,
//   Mail,
//   ArrowLeft,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";
// import Link from "next/link";
// import { toast } from "sonner";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import axios from "axios";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Please enter a valid email address.",
//   }),
// });

// const ForgotPasswordPage = () => {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [submittedEmail, setSubmittedEmail] = useState<string>("");
//   const [otp, setOtp] = useState<string>("");
//   const [otpToken, setOtpToken] = useState<string>("");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//     },
//   });

//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     try {
//       setIsLoading(true);
//       const response = await axios.post("/api/auth/sendOtp", {
//         email: values.email,
//       });
//       console.log("Password reset response:", response);

//       if (response.status === 200) {
//         setSubmittedEmail(values.email);
//         console.log("OTP token received:", response.data.otpToken);
//         setOtpToken(response.data.otpToken); // store token from backend
//         setIsSubmitted(true);
//         toast.success("OTP sent to your email");
//       }
//     } catch (error: any) {
//       console.error("Password reset error:", error);
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         "An error occurred. Please try again later.";
//       toast.error(message);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const handleResendEmail = async () => {
//     if (submittedEmail) {
//       await onSubmit({ email: submittedEmail });
//     }
//   };

//   const handleVerifyOtp = async () => {
//     try {
//       setIsLoading(true);
//       console.log("Verifying OTP with token:", otpToken);
//       const response = await axios.post("/api/auth/verifyOtp", {
//         token: otpToken,
//         otp,
//       });

//       console.log("OTP verification response:", response);

//       if (response.status === 200) {
//         toast.success("OTP verified successfully!");
//         // TODO: Redirect to reset password page or enable new password form
//       }
//     } catch (error: any) {
//       console.error("OTP verification failed:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "OTP verification failed. Please try again."
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   if (isSubmitted) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
//         <div className="w-full max-w-md space-y-8">
//           <div className="text-center space-y-2">
//             <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
//             <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
//             <p className="text-muted-foreground">
//               We've sent a verification code to <strong>{submittedEmail}</strong>
//             </p>
//           </div>

//           <Card className="border-muted/40 shadow-lg">
//             <CardContent className="pt-6 space-y-4">
//               <Input
//                 placeholder="Enter 6-digit OTP"
//                 maxLength={6}
//                 className="text-center tracking-widest"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//               />

//               <Button
//                 className="w-full"
//                 onClick={handleVerifyOtp}
//                 disabled={otp.length !== 6 || isLoading}
//               >
//                 {isLoading ? (
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                 ) : (
//                   <CheckCircle className="mr-2 h-4 w-4" />
//                 )}
//                 Verify OTP
//               </Button>

//               <p className="text-sm text-muted-foreground text-center">
//                 Didn't get the code?{" "}
//                 <Button
//                   variant="link"
//                   className="p-0 text-sm"
//                   onClick={handleResendEmail}
//                   disabled={isLoading}
//                 >
//                   Resend
//                 </Button>
//               </p>

//               <Button variant="ghost" className="w-full" asChild>
//                 <Link href="/signin">
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back to sign in
//                 </Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center space-y-2">
//           <h1 className="text-3xl font-bold tracking-tight">
//             Forgot your password?
//           </h1>
//           <p className="text-muted-foreground">
//             Enter your email address and we'll send you a link to reset your
//             password
//           </p>
//         </div>

//         <Card className="border-muted/40 shadow-lg">
//           <CardHeader className="space-y-1 pb-6">
//             <CardTitle className="text-xl">Reset password</CardTitle>
//             <CardDescription>
//               We'll send you a secure link to reset your password
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-4"
//               >
//                 <FormField
//                   control={form.control}
//                   name="email"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>Email address</FormLabel>
//                       <FormControl>
//                         <div className="relative">
//                           <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                           <Input
//                             {...field}
//                             className="pl-10"
//                             placeholder="name@example.com"
//                             type="email"
//                           />
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />

//                 <Button
//                   disabled={isLoading}
//                   type="submit"
//                   className="w-full cursor-pointer"
//                   size="lg"
//                 >
//                   {isLoading ? (
//                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   ) : (
//                     <Mail className="mr-2 h-4 w-4" />
//                   )}
//                   Send reset link
//                 </Button>
//               </form>
//             </Form>

//             <div className="mt-6">
//               <Button variant="ghost" className="w-full" asChild>
//                 <Link href="/signin">
//                   <ArrowLeft className="mr-2 h-4 w-4" />
//                   Back to sign in
//                 </Link>
//               </Button>
//             </div>
//           </CardContent>
//           <CardFooter className="flex flex-col space-y-4 border-t bg-muted/50 p-6">
//             <Alert>
//               <AlertCircle className="h-4 w-4" />
//               <AlertDescription className="text-xs">
//                 For security reasons, we'll send the reset link even if the
//                 email address isn't associated with an account. This prevents
//                 email enumeration attacks.
//               </AlertDescription>
//             </Alert>
//           </CardFooter>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default ForgotPasswordPage;






"use client";

import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Mail,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const passwordSchema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>("");
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/sendOtp", {
        email: values.email,
      });
      if (response.status === 200) {
        setSubmittedEmail(values.email);
        setOtpToken(response.data.otpToken);
        setIsSubmitted(true);
        toast.success("OTP sent to your email");
      }
      console.log("the otpToken is: ", otpToken)
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "An error occurred. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendEmail = async () => {
    if (submittedEmail) await onSubmit({ email: submittedEmail });
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/verifyOtp", {
        otpToken: otpToken,
        otp,
      });
      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "OTP verification failed."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (values: z.infer<typeof passwordSchema>) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/changePassword", {
        email: submittedEmail,
        newPassword: values.newPassword,
      });
      if (response.status === 200) {
        toast.success("Password changed successfully!");
        router.push("/signin");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (otpVerified) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight">Create New Password</h1>
            <p className="text-muted-foreground">Set a new password for your account.</p>
          </div>
          <Card className="border-muted/40 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <Form {...passwordForm}>
                <form onSubmit={passwordForm.handleSubmit(handleChangePassword)} className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Enter new password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} placeholder="Re-enter password" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />} 
                    Change Password
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
            <h1 className="text-3xl font-bold tracking-tight">Enter OTP</h1>
            <p className="text-muted-foreground">
              We've sent a verification code to <strong>{submittedEmail}</strong>
            </p>
          </div>

          <Card className="border-muted/40 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <Input
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                className="text-center tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <Button
                className="w-full"
                onClick={handleVerifyOtp}
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle className="mr-2 h-4 w-4" />
                )}
                Verify OTP
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Didn't get the code? {" "}
                <Button
                  variant="link"
                  className="p-0 text-sm"
                  onClick={handleResendEmail}
                  disabled={isLoading}
                >
                  Resend
                </Button>
              </p>

              <Button variant="ghost" className="w-full" asChild>
                <Link href="/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted/30">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Forgot your password?</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <Card className="border-muted/40 shadow-lg">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-xl">Reset password</CardTitle>
            <CardDescription>
              We'll send you a secure link to reset your password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            {...field}
                            className="pl-10"
                            placeholder="name@example.com"
                            type="email"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} type="submit" className="w-full cursor-pointer" size="lg">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Mail className="mr-2 h-4 w-4" />
                  )}
                  Send reset link
                </Button>
              </form>
            </Form>
            <div className="mt-6">
              <Button variant="ghost" className="w-full" asChild>
                <Link href="/signin">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t bg-muted/50 p-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs">
                For security reasons, we'll send the reset link even if the email address isn't associated with an account. This prevents email enumeration attacks.
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;