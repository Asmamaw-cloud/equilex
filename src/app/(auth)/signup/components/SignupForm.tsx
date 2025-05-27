// "use client";

// import { FileUploader } from "@/components/file-uploader";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { courts, languages, lawyerSpecialties } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { signIn } from "next-auth/react";
// import { Account } from "@/server/user-management/Account";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Invalid email address.",
//   }),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   confirm: z.string().min(6, "Repeat the password"),
//   phoneNumber: z.string().min(8, "Phone number is required"),
//   fullName: z.string().min(2, "Full Name must at least be 2 characters"),
//   description: z.string(),
//   type: z.string().min(2, "Required"),
//   languages: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one language.",
//   }),
//   specialties: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: "You have to select at least one specialty.",
//     }),

//   courts: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one court.",
//   }),
// });

// const SignupForm = () => {
//   const router = useRouter();
//   const [registeringUser, setRegisteringUser] = useState<boolean>(false);
//   const [id, setId] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [cv, setCv] = useState("");
//   const [resume, setResume] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [showPassword, setShowPassword] = useState<boolean>(false)

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       phoneNumber: "",
//       fullName: "",
//       password: "",
//       confirm: "",
//       description: "",
//       type: "LAWYER",
//       languages: ["AMHARIC"],
//       specialties: ["CRIMINAL_LAW"],
//       courts: ["ADMINISTRATIVE_COURT"],
//     },
//   });

//   const createLawyer = useMutation({
//     mutationFn: (user: any) => {
//       return axios.post("/api/lawyers", user);
//     },
//   });

//   const createClient = useMutation({
//     mutationFn: (user: any) => {
//       return axios.post("/api/clients", user);
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (values.password !== values.confirm) {
//       form.setError("confirm", {
//         message: "Passwords don't match",
//       });
//       return;
//     }

//     setRegisteringUser(true);

//     if (values.type == "CLIENT") {
//       createClient.mutate({
//         email: values.email,
//         password: values.password,
//         phone_number: values.phoneNumber,
//         full_name: values.fullName,
//       }, {
//         onSuccess: async () => {
//           const res = await Account.login(values.email, values.password)
//           router.push("/");
//           router.refresh()
//           setRegisteringUser(false)
//         },
//         onError: async (e) => {

//           toast(
//              "Couldn't create account"+ e.message );
//           setRegisteringUser(false);
//         },
//       });
//     }

//     if (values.type == "LAWYER") {
//       createLawyer.mutate(
//         {
//           email: values.email,
//           password: values.password,
//           id,
//           qualification,
//           cv,
//           resume,
//           courts: values.courts,
//           languages: values.languages,
//           specialties: values.specialties,
//           photo,
//           description: values.description,
//           phone_number: values.phoneNumber,
//           full_name: values.fullName,
//         },
//         {
//           onSuccess: async () => {
//             const res = await signIn("credentials", {
//               redirect: false,
//               email: values.email,
//               password: values.password,
//             });
//             if (!res?.ok) {
//               {
//                 throw new Error("");
//               }
//             }
//             router.push("/");
//             router.refresh();
//             setRegisteringUser(false);
//           },
//           onError: async (e) => {
//             toast("Couldn't create account" + e.message);
//             setRegisteringUser(false);
//           },
//         }
//       );
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   return (
//     <div className="lg:h-screen flex items-center lg:mt-10 mt-16 justify-center px-2">
//       <Card className="min-w-[450px] mx-auto">
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <div>
//               <CardTitle>Create Account</CardTitle>
//               <CardDescription>create new account</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-3 lg:flex gap-3 items-start"
//               >
//                 {form.watch("type") === "LAWYER" && (
//                   <ScrollArea className="h-[80vh] p-3 rounded-md border">
//                     <div className="flex flex-col gap-8">
//                       <div className="flex gap-3 lg:flex-row flex-col">
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Identification Card</Label>

//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setId(urls[0]);
//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Qualification</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setQualification(urls[0]);

//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex gap-3 lg:flex-row flex-col">
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>CV</Label>

//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setCv(urls[0]);

//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>

//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Resume</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setResume(urls[0]);

//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="space-y-2 lg:w-[300px]">
//                         <Label>Photo</Label>
//                         <div className="border rounded-lg p-6 bg-card">
//                           <FileUploader
//                             onUploadComplete={(urls) => {
//                               setPhoto(urls[0]);

//                             }}
//                             maxFiles={5}
//                             maxSize={4}
//                             fileTypes={["image", "pdf"]}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name="description"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="mt-3">About me</FormLabel>
//                           <FormControl>
//                             <Textarea {...field} className=" mt-3 " />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />

//                     <FormField
//                       control={form.control}
//                       name="languages"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">
//                               Language
//                             </FormLabel>
//                             <FormDescription>
//                               Select the language you speak
//                             </FormDescription>
//                           </div>
//                           {languages.map((language) => (
//                             <FormField
//                               key={language.id}
//                               control={form.control}
//                               name="languages"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={language.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           language.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 language.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== language.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {language.language}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="specialties"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">
//                               Specialty
//                             </FormLabel>
//                             <FormDescription>
//                               Select your specialties
//                             </FormDescription>
//                           </div>
//                           {lawyerSpecialties.map((specialty) => (
//                             <FormField
//                               key={specialty.id}
//                               control={form.control}
//                               name="specialties"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={specialty.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           specialty.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 specialty.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== specialty.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {specialty.specialty}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="courts"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">Courts</FormLabel>
//                             <FormDescription>
//                               Select your courts
//                             </FormDescription>
//                           </div>
//                           {courts.map((court) => (
//                             <FormField
//                               key={court.id}
//                               control={form.control}
//                               name="courts"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={court.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           court.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 court.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== court.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {court.label}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </ScrollArea>
//                 )}
//                 <div className="space-y-3">
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input {...field} className="lg:w-[400px]" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="fullName"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Full Name</FormLabel>
//                         <FormControl>
//                           <Input {...field} className="lg:w-[400px]" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="phoneNumber"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Phone Number</FormLabel>
//                         <FormControl>
//                           <Input {...field} className="lg:w-[400px]" />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="type"
//                     render={({ field }) => (
//                       <FormItem className="lg:w-[400px]">
//                         <FormLabel>Role</FormLabel>
//                         <Select
//                           onValueChange={field.onChange}
//                           defaultValue={field.value}
//                         >
//                           <FormControl>
//                             <SelectTrigger className=" w-full ">
//                               <SelectValue placeholder="Select the role." />
//                             </SelectTrigger>
//                           </FormControl>
//                           <SelectContent>
//                             <SelectItem value={"LAWYER"}>Lawyer</SelectItem>
//                             <SelectItem value={"CLIENT"}>Client</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Password</FormLabel>
//                         <FormControl>
//                         <div className="relative">
//                         <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                           <Input
//                             {...field}
//                             type={showPassword ? "text" : "password"}
//                             className="pl-10 pr-10"
//                             placeholder="••••••••"
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
//                             onClick={togglePasswordVisibility}
//                             aria-label={showPassword ? "Hide password" : "Show password"}
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </Button>
//                         </div>

//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                   <FormField
//                     control={form.control}
//                     name="confirm"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Repeat Password</FormLabel>
//                         <FormControl>
//                         <div className="relative">
//                           <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                           <Input
//                             {...field}
//                             type={showPassword ? "text" : "password"}
//                             className="pl-10 pr-10"
//                             placeholder="••••••••"
//                           />
//                           <Button
//                             type="button"
//                             variant="ghost"
//                             size="icon"
//                             className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
//                             onClick={togglePasswordVisibility}
//                             aria-label={showPassword ? "Hide password" : "Show password"}
//                           >
//                             {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                           </Button>
//                         </div>
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <Button
//                     disabled={
//                       registeringUser ||
//                       (form.watch("type") == "LAWYER" &&
//                         (!id || !qualification || !photo))
//                     }
//                     type="submit"
//                     className="w-full"
//                   >
//                     {registeringUser && (
//                       <Loader2 className="mr-1 h-4 w-4 animate-spin" />
//                     )}
//                     Create
//                   </Button>
//                   <p className="text-center text-sm">
//                     Already have an account?
//                   </p>
//                   <Button asChild className="w-full" variant="outline">
//                     <Link href="/signin">Sign In</Link>
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignupForm;

// "use client";

// import { FileUploader } from "@/components/file-uploader";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { courts, languages, lawyerSpecialties } from "@/lib/utils";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import * as z from "zod";
// import axios from "axios";
// import { useMutation } from "@tanstack/react-query";
// import { signIn } from "next-auth/react";
// import { Account } from "@/server/user-management/Account";

// const formSchema = z.object({
//   email: z.string().email({
//     message: "Invalid email address.",
//   }),
//   password: z.string().min(6, "Password must be at least 6 characters"),
//   confirm: z.string().min(6, "Repeat the password"),
//   phoneNumber: z.string().min(8, "Phone number is required"),
//   fullName: z.string().min(2, "Full Name must at least be 2 characters"),
//   description: z.string(),
//   type: z.string().min(2, "Required"),
//   languages: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one language.",
//   }),
//   specialties: z
//     .array(z.string())
//     .refine((value) => value.some((item) => item), {
//       message: "You have to select at least one specialty.",
//     }),
//   courts: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one court.",
//   }),
// });

// const SignupForm = () => {
//   const router = useRouter();
//   const [registeringUser, setRegisteringUser] = useState<boolean>(false);
//   const [id, setId] = useState("");
//   const [qualification, setQualification] = useState("");
//   const [cv, setCv] = useState("");
//   const [resume, setResume] = useState("");
//   const [photo, setPhoto] = useState("");
//   const [showPassword, setShowPassword] = useState<boolean>(false);
//   const [showOTP, setShowOTP] = useState<boolean>(false);
//   const [otp, setOtp] = useState("");
//   const [tempUserData, setTempUserData] = useState<any>(null);
//   const [otpToken, setOtpToken] = useState("");

//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: "",
//       phoneNumber: "",
//       fullName: "",
//       password: "",
//       confirm: "",
//       description: "",
//       type: "LAWYER",
//       languages: ["AMHARIC"],
//       specialties: ["CRIMINAL_LAW"],
//       courts: ["ADMINISTRATIVE_COURT"],
//     },
//   });

//   const createLawyer = useMutation({
//     mutationFn: (user: any) => {
//       return axios.post("/api/lawyers", user);
//     },
//   });

//   const createClient = useMutation({
//     mutationFn: (user: any) => {
//       return axios.post("/api/clients", user);
//     },
//   });

//   const sendOTP = useMutation({
//     mutationFn: (email: string) => {
//       return axios.post("/api/auth/sendOtp", { email });
//     },
    
//   });
  

//   console.log("here is the response token: ", sendOTP);

//   const verifyOTP = useMutation({
//     mutationFn: ({ otpToken, otp }: { otpToken: string; otp: string }) => {
//       return axios.post("/api/auth/verifyOtp", { otpToken, otp });
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     if (values.password !== values.confirm) {
//       form.setError("confirm", {
//         message: "Passwords don't match",
//       });
//       return;
//     }

//     setRegisteringUser(true);
//     setTempUserData(values);

//     try {
//       await sendOTP.mutateAsync(values.email, {
//         onSuccess: () => {
//           setShowOTP(true);
//           toast.success("OTP sent to your email");
//           setRegisteringUser(false);
//         },
//         onError: (e) => {
//           toast.error("Failed to send OTP: " + e.message);
//           setRegisteringUser(false);
//         },
//       });
//     } catch (error) {
//       toast.error("Error sending OTP");
//       setRegisteringUser(false);
//     }
//   };

//   const handleOTPSubmit = async () => {
//     if (!tempUserData || !otp) return;

//     setRegisteringUser(true);

//     try {
//       await verifyOTP.mutateAsync(
//         { email: tempUserData.email, otp },
//         {
//           onSuccess: async () => {
//             if (tempUserData.type === "CLIENT") {
//               await createClient.mutateAsync(
//                 {
//                   email: tempUserData.email,
//                   password: tempUserData.password,
//                   phone_number: tempUserData.phoneNumber,
//                   full_name: tempUserData.fullName,
//                 },
//                 {
//                   onSuccess: async () => {
//                     router.push("/signin");
//                     setRegisteringUser(false);
//                     toast.success(
//                       "Account created successfully! Please sign in."
//                     );
//                   },
//                   onError: (e) => {
//                     toast.error("Couldn't create account: " + e.message);
//                     setRegisteringUser(false);
//                   },
//                 }
//               );
//             } else if (tempUserData.type === "LAWYER") {
//               await createLawyer.mutateAsync(
//                 {
//                   email: tempUserData.email,
//                   password: tempUserData.password,
//                   id,
//                   qualification,
//                   cv,
//                   resume,
//                   courts: tempUserData.courts,
//                   languages: tempUserData.languages,
//                   specialties: tempUserData.specialties,
//                   photo,
//                   description: tempUserData.description,
//                   phone_number: tempUserData.phoneNumber,
//                   full_name: tempUserData.fullName,
//                 },
//                 {
//                   onSuccess: async () => {
//                     router.push("/signin");
//                     setRegisteringUser(false);
//                     toast.success(
//                       "Account created successfully! Please sign in."
//                     );
//                   },
//                   onError: (e) => {
//                     toast.error("Couldn't create account: " + e.message);
//                     setRegisteringUser(false);
//                   },
//                 }
//               );
//             }
//           },
//           onError: (e) => {
//             toast.error("Invalid OTP: " + e.message);
//             setRegisteringUser(false);
//           },
//         }
//       );
//     } catch (error) {
//       toast.error("Error verifying OTP");
//       setRegisteringUser(false);
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <div className="lg:h-screen flex items-center lg:mt-10 mt-16 justify-center px-2">
//       <Card className="min-w-[450px] mx-auto">
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <div>
//               <CardTitle>Create Account</CardTitle>
//               <CardDescription>create new account</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="flex flex-col lg:flex-row gap-8">
//           <div className="w-full">
//             <Form {...form}>
//               <form
//                 onSubmit={form.handleSubmit(onSubmit)}
//                 className="space-y-3 lg:flex gap-3 items-start"
//               >
//                 {form.watch("type") === "LAWYER" && !showOTP && (
//                   <ScrollArea className="h-[80vh] p-3 rounded-md border">
//                     <div className="flex flex-col gap-8">
//                       <div className="flex gap-3 lg:flex-row flex-col">
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Identification Card</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setId(urls[0]);
//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Qualification</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setQualification(urls[0]);
//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex gap-3 lg:flex-row flex-col">
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>CV</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setCv(urls[0]);
//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                         <div className="space-y-2 lg:w-[300px]">
//                           <Label>Resume</Label>
//                           <div className="border rounded-lg p-6 bg-card">
//                             <FileUploader
//                               onUploadComplete={(urls) => {
//                                 setResume(urls[0]);
//                               }}
//                               maxFiles={5}
//                               maxSize={4}
//                               fileTypes={["image", "pdf"]}
//                             />
//                           </div>
//                         </div>
//                       </div>
//                       <div className="space-y-2 lg:w-[300px]">
//                         <Label>Photo</Label>
//                         <div className="border rounded-lg p-6 bg-card">
//                           <FileUploader
//                             onUploadComplete={(urls) => {
//                               setPhoto(urls[0]);
//                             }}
//                             maxFiles={5}
//                             maxSize={4}
//                             fileTypes={["image", "pdf"]}
//                           />
//                         </div>
//                       </div>
//                     </div>
//                     <FormField
//                       control={form.control}
//                       name="description"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel className="mt-3">About me</FormLabel>
//                           <FormControl>
//                             <Textarea {...field} className=" mt-3 " />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="languages"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">
//                               Language
//                             </FormLabel>
//                             <FormDescription>
//                               Select the language you speak
//                             </FormDescription>
//                           </div>
//                           {languages.map((language) => (
//                             <FormField
//                               key={language.id}
//                               control={form.control}
//                               name="languages"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={language.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           language.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 language.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== language.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {language.language}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="specialties"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">
//                               Specialty
//                             </FormLabel>
//                             <FormDescription>
//                               Select your specialties
//                             </FormDescription>
//                           </div>
//                           {lawyerSpecialties.map((specialty) => (
//                             <FormField
//                               key={specialty.id}
//                               control={form.control}
//                               name="specialties"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={specialty.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           specialty.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 specialty.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== specialty.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {specialty.specialty}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={form.control}
//                       name="courts"
//                       render={() => (
//                         <FormItem>
//                           <div className="my-4">
//                             <FormLabel className="text-base">Courts</FormLabel>
//                             <FormDescription>
//                               Select your courts
//                             </FormDescription>
//                           </div>
//                           {courts.map((court) => (
//                             <FormField
//                               key={court.id}
//                               control={form.control}
//                               name="courts"
//                               render={({ field }) => {
//                                 return (
//                                   <FormItem
//                                     key={court.id}
//                                     className="flex flex-row items-start space-x-3 space-y-0"
//                                   >
//                                     <FormControl>
//                                       <Checkbox
//                                         checked={field.value?.includes(
//                                           court.value
//                                         )}
//                                         onCheckedChange={(checked: any) => {
//                                           return checked
//                                             ? field.onChange([
//                                                 ...field.value,
//                                                 court.value,
//                                               ])
//                                             : field.onChange(
//                                                 field.value?.filter(
//                                                   (value) =>
//                                                     value !== court.value
//                                                 )
//                                               );
//                                         }}
//                                       />
//                                     </FormControl>
//                                     <FormLabel className="text-sm font-normal">
//                                       {court.label}
//                                     </FormLabel>
//                                   </FormItem>
//                                 );
//                               }}
//                             />
//                           ))}
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </ScrollArea>
//                 )}
//                 <div className="space-y-3">
//                   {!showOTP ? (
//                     <>
//                       <FormField
//                         control={form.control}
//                         name="email"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Email</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="lg:w-[400px]" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="fullName"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Full Name</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="lg:w-[400px]" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="phoneNumber"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Phone Number</FormLabel>
//                             <FormControl>
//                               <Input {...field} className="lg:w-[400px]" />
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="type"
//                         render={({ field }) => (
//                           <FormItem className="lg:w-[400px]">
//                             <FormLabel>Role</FormLabel>
//                             <Select
//                               onValueChange={field.onChange}
//                               defaultValue={field.value}
//                             >
//                               <FormControl>
//                                 <SelectTrigger className=" w-full ">
//                                   <SelectValue placeholder="Select the role." />
//                                 </SelectTrigger>
//                               </FormControl>
//                               <SelectContent>
//                                 <SelectItem value={"LAWYER"}>Lawyer</SelectItem>
//                                 <SelectItem value={"CLIENT"}>Client</SelectItem>
//                               </SelectContent>
//                             </Select>
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="password"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Password</FormLabel>
//                             <FormControl>
//                               <div className="relative">
//                                 <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                   {...field}
//                                   type={showPassword ? "text" : "password"}
//                                   className="pl-10 pr-10"
//                                   placeholder="••••••••"
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
//                                   onClick={togglePasswordVisibility}
//                                   aria-label={
//                                     showPassword
//                                       ? "Hide password"
//                                       : "Show password"
//                                   }
//                                 >
//                                   {showPassword ? (
//                                     <EyeOff className="h-4 w-4" />
//                                   ) : (
//                                     <Eye className="h-4 w-4" />
//                                   )}
//                                 </Button>
//                               </div>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <FormField
//                         control={form.control}
//                         name="confirm"
//                         render={({ field }) => (
//                           <FormItem>
//                             <FormLabel>Repeat Password</FormLabel>
//                             <FormControl>
//                               <div className="relative">
//                                 <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
//                                 <Input
//                                   {...field}
//                                   type={showPassword ? "text" : "password"}
//                                   className="pl-10 pr-10"
//                                   placeholder="••••••••"
//                                 />
//                                 <Button
//                                   type="button"
//                                   variant="ghost"
//                                   size="icon"
//                                   className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
//                                   onClick={togglePasswordVisibility}
//                                   aria-label={
//                                     showPassword
//                                       ? "Hide password"
//                                       : "Show password"
//                                   }
//                                 >
//                                   {showPassword ? (
//                                     <EyeOff className="h-4 w-4" />
//                                   ) : (
//                                     <Eye className="h-4 w-4" />
//                                   )}
//                                 </Button>
//                               </div>
//                             </FormControl>
//                             <FormMessage />
//                           </FormItem>
//                         )}
//                       />
//                       <Button
//                         disabled={
//                           registeringUser ||
//                           (form.watch("type") === "LAWYER" &&
//                             (!id || !qualification || !photo))
//                         }
//                         type="submit"
//                         className="w-full"
//                       >
//                         {registeringUser && (
//                           <Loader2 className="mr-1 h-4 w-4 animate-spin" />
//                         )}
//                         Create
//                       </Button>
//                     </>
//                   ) : (
//                     <div className="space-y-3">
//                       <FormItem>
//                         <FormLabel>Enter OTP</FormLabel>
//                         <FormControl>
//                           <Input
//                             value={otp}
//                             onChange={(e) => setOtp(e.target.value)}
//                             placeholder="Enter OTP"
//                             className="lg:w-[400px]"
//                           />
//                         </FormControl>
//                       </FormItem>
//                       <Button
//                         disabled={registeringUser || !otp}
//                         onClick={handleOTPSubmit}
//                         className="w-full"
//                       >
//                         {registeringUser && (
//                           <Loader2 className="mr-1 h-4 w-4 animate-spin" />
//                         )}
//                         Verify OTP
//                       </Button>
//                       <Button
//                         variant="outline"
//                         onClick={() => {
//                           setShowOTP(false);
//                           setOtp("");
//                         }}
//                         className="w-full"
//                       >
//                         Back to Sign Up
//                       </Button>
//                     </div>
//                   )}
//                   <p className="text-center text-sm">
//                     Already have an account?
//                   </p>
//                   <Button asChild className="w-full" variant="outline">
//                     <Link href="/signin">Sign In</Link>
//                   </Button>
//                 </div>
//               </form>
//             </Form>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default SignupForm;





"use client";

import { FileUploader } from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { courts, languages, lawyerSpecialties } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { Account } from "@/server/user-management/Account";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string().min(6, "Repeat the password"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  fullName: z.string().min(2, "Full Name must at least be 2 characters"),
  description: z.string(),
  type: z.string().min(2, "Required"),
  languages: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one language.",
  }),
  specialties: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one specialty.",
    }),
  courts: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one court.",
  }),
});

const SignupForm = () => {
  const router = useRouter();
  const [registeringUser, setRegisteringUser] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [qualification, setQualification] = useState("");
  const [cv, setCv] = useState("");
  const [resume, setResume] = useState("");
  const [photo, setPhoto] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const [tempUserData, setTempUserData] = useState<any>(null);
  const [otpToken, setOtpToken] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      fullName: "",
      password: "",
      confirm: "",
      description: "",
      type: "LAWYER",
      languages: ["AMHARIC"],
      specialties: ["CRIMINAL_LAW"],
      courts: ["ADMINISTRATIVE_COURT"],
    },
  });

  const createLawyer = useMutation({
    mutationFn: (user: any) => {
      return axios.post("/api/lawyers", user);
    },
  });

  const createClient = useMutation({
    mutationFn: (user: any) => {
      return axios.post("/api/clients", user);
    },
  });

  const sendOTP = useMutation({
    mutationFn: (email: string) => {
      return axios.post("/api/auth/sendOtp", { email });
    },
    onSuccess: (response) => {
      setOtpToken(response.data.otpToken);
      setShowOTP(true);
      toast.success("OTP sent to your email");
      setRegisteringUser(false);
    },
    onError: (e) => {
      toast.error("Failed to send OTP: " + e.message);
      setRegisteringUser(false);
    },
  });
  console.log("here is the otp response: ",sendOTP )
  console.log("here is the otp token: ", otpToken)
  
  const verifyOTP = useMutation({
    mutationFn: ({ otpToken, otp }: { otpToken: string; otp: string }) => {
      return axios.post("/api/auth/verifyOtp", { otpToken, otp });
    },
    onSuccess: async () => {
      if (tempUserData.type === "CLIENT") {
        await createClient.mutateAsync(
          {
            email: tempUserData.email,
            password: tempUserData.password,
            phone_number: tempUserData.phoneNumber,
            full_name: tempUserData.fullName,
          },
          {
            onSuccess: async () => {
              router.push("/signin");
              setRegisteringUser(false);
              toast.success("Account created successfully! Please sign in.");
            },
            onError: (e) => {
              toast.error("Couldn't create account: " + e.message);
              setRegisteringUser(false);
            },
          }
        );
      } else if (tempUserData.type === "LAWYER") {
        await createLawyer.mutateAsync(
          {
            email: tempUserData.email,
            password: tempUserData.password,
            id,
            qualification,
            cv,
            resume,
            courts: tempUserData.courts,
            languages: tempUserData.languages,
            specialties: tempUserData.specialties,
            photo,
            description: tempUserData.description,
            phone_number: tempUserData.phoneNumber,
            full_name: tempUserData.fullName,
          },
          {
            onSuccess: async () => {
              router.push("/signin");
              setRegisteringUser(false);
              toast.success("Account created successfully! Please sign in.");
            },
            onError: (e) => {
              toast.error("Couldn't create account: " + e.message);
              setRegisteringUser(false);
            },
          }
        );
      }
    },
    onError: (e) => {
      toast.error("Invalid OTP: " + e.message);
      setRegisteringUser(false);
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.password !== values.confirm) {
      form.setError("confirm", {
        message: "Passwords don't match",
      });
      return;
    }

    setRegisteringUser(true);
    setTempUserData(values);

    await sendOTP.mutateAsync(values.email);
  };

  const handleOTPSubmit = async () => {
    if (!tempUserData || !otp || !otpToken) return;

    setRegisteringUser(true);
    await verifyOTP.mutateAsync({ otpToken, otp });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="lg:h-screen flex items-center lg:mt-10 mt-16 justify-center px-2">
      <Card className="min-w-[450px] mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>create new account</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-8">
          <div className="w-full">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 lg:flex gap-3 items-start"
              >
                {form.watch("type") === "LAWYER" && !showOTP && (
                  <ScrollArea className="h-[80vh] p-3 rounded-md border">
                    <div className="flex flex-col gap-8">
                      <div className="flex gap-3 lg:flex-row flex-col">
                        <div className="space-y-2 lg:w-[300px]">
                          <Label>Identification Card</Label>
                          <div className="border rounded-lg p-6 bg-card">
                            <FileUploader
                              onUploadComplete={(urls) => {
                                setId(urls[0]);
                              }}
                              maxFiles={5}
                              maxSize={4}
                              fileTypes={["image", "pdf"]}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 lg:w-[300px]">
                          <Label>Qualification</Label>
                          <div className="border rounded-lg p-6 bg-card">
                            <FileUploader
                              onUploadComplete={(urls) => {
                                setQualification(urls[0]);
                              }}
                              maxFiles={5}
                              maxSize={4}
                              fileTypes={["image", "pdf"]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 lg:flex-row flex-col">
                        <div className="space-y-2 lg:w-[300px]">
                          <Label>CV</Label>
                          <div className="border rounded-lg p-6 bg-card">
                            <FileUploader
                              onUploadComplete={(urls) => {
                                setCv(urls[0]);
                              }}
                              maxFiles={5}
                              maxSize={4}
                              fileTypes={["image", "pdf"]}
                            />
                          </div>
                        </div>
                        <div className="space-y-2 lg:w-[300px]">
                          <Label>Resume</Label>
                          <div className="border rounded-lg p-6 bg-card">
                            <FileUploader
                              onUploadComplete={(urls) => {
                                setResume(urls[0]);
                              }}
                              maxFiles={5}
                              maxSize={4}
                              fileTypes={["image", "pdf"]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 lg:w-[300px]">
                        <Label>Photo</Label>
                        <div className="border rounded-lg p-6 bg-card">
                          <FileUploader
                            onUploadComplete={(urls) => {
                              setPhoto(urls[0]);
                            }}
                            maxFiles={5}
                            maxSize={4}
                            fileTypes={["image", "pdf"]}
                          />
                        </div>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="mt-3">About me</FormLabel>
                          <FormControl>
                            <Textarea {...field} className=" mt-3 " />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="languages"
                      render={() => (
                        <FormItem>
                          <div className="my-4">
                            <FormLabel className="text-base">Language</FormLabel>
                            <FormDescription>
                              Select the language you speak
                            </FormDescription>
                          </div>
                          {languages.map((language) => (
                            <FormField
                              key={language.id}
                              control={form.control}
                              name="languages"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={language.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          language.value
                                        )}
                                        onCheckedChange={(checked: any) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                language.value,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== language.value
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {language.language}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="specialties"
                      render={() => (
                        <FormItem>
                          <div className="my-4">
                            <FormLabel className="text-base">Specialty</FormLabel>
                            <FormDescription>
                              Select your specialties
                            </FormDescription>
                          </div>
                          {lawyerSpecialties.map((specialty) => (
                            <FormField
                              key={specialty.id}
                              control={form.control}
                              name="specialties"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={specialty.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          specialty.value
                                        )}
                                        onCheckedChange={(checked: any) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                specialty.value,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== specialty.value
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {specialty.specialty}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="courts"
                      render={() => (
                        <FormItem>
                          <div className="my-4">
                            <FormLabel className="text-base">Courts</FormLabel>
                            <FormDescription>
                              Select your courts
                            </FormDescription>
                          </div>
                          {courts.map((court) => (
                            <FormField
                              key={court.id}
                              control={form.control}
                              name="courts"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={court.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          court.value
                                        )}
                                        onCheckedChange={(checked: any) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                court.value,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !== court.value
                                                )
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {court.label}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </ScrollArea>
                )}
                <div className="space-y-3">
                  {!showOTP ? (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input {...field} className="lg:w-[400px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input {...field} className="lg:w-[400px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} className="lg:w-[400px]" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem className="lg:w-[400px]">
                            <FormLabel>Role</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className=" w-full ">
                                  <SelectValue placeholder="Select the role." />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value={"LAWYER"}>Lawyer</SelectItem>
                                <SelectItem value={"CLIENT"}>Client</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  className="pl-10 pr-10"
                                  placeholder="••••••••"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                                  onClick={togglePasswordVisibility}
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Repeat Password</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                  {...field}
                                  type={showPassword ? "text" : "password"}
                                  className="pl-10 pr-10"
                                  placeholder="••••••••"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                                  onClick={togglePasswordVisibility}
                                  aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        disabled={
                          registeringUser ||
                          (form.watch("type") === "LAWYER" &&
                            (!id || !qualification || !photo))
                        }
                        type="submit"
                        className="w-full"
                      >
                        {registeringUser && (
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        )}
                        Create
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <FormItem>
                        <FormLabel>Enter OTP</FormLabel>
                        <FormControl>
                          <Input
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter OTP"
                            className="lg:w-[400px]"
                          />
                        </FormControl>
                      </FormItem>
                      <Button
                        disabled={registeringUser || !otp || !otpToken}
                        onClick={handleOTPSubmit}
                        className="w-full"
                      >
                        {registeringUser && (
                          <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                        )}
                        Verify OTP
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowOTP(false);
                          setOtp("");
                          setOtpToken("");
                        }}
                        className="w-full"
                      >
                        Back to Sign Up
                      </Button>
                    </div>
                  )}
                  <p className="text-center text-sm">
                    Already have an account?
                  </p>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;