import { Account } from "@/server/user-management/Account";



export async function POST(request: Request) {
  const { email, oldPassword, newPassword } = await request.json();
  console.log("Received request to change password for:", email);

    // Here you would typically validate the old password and update it in your database
    // For demonstration, let's assume the password change is successful
    const changePass = Account.changePassword(email, newPassword);
    if (!changePass) {
        return new Response(
            JSON.stringify({ message: "Failed to change password" }),
            {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
            }
        );
    }
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    
    // Simulate a successful password change
    return new Response(
        JSON.stringify({ message: "Password changed successfully" }),
        {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        }
    );
    }