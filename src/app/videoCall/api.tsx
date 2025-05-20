// // Define a fallback token for development (replace with your actual token)
// export const authToken: string = process.env.NEXT_PUBLIC_VIDEO_AUTH_KEY || "YOUR_FALLBACK_TOKEN_FOR_DEVELOPMENT"

// export const createMeeting = async ({ token }: { token: string }) => {
//   try {
//     console.log("Using auth token:", token)
//     const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({}),
//     })

//     if (!res.ok) {
//       const errorData = await res.json()
//       console.error("API Error:", errorData)
//       throw new Error(`Failed to create meeting: ${res.status}`)
//     }

//     const { roomId }: { roomId: string } = await res.json()
//     console.log("Meeting created with ID:", roomId)
//     return roomId
//   } catch (error) {
//     console.error("Error creating meeting:", error)
//     throw error
//   }
// }




// We'll try different authentication methods to resolve the token issue
export const authToken: string = process.env.NEXT_PUBLIC_VIDEO_AUTH_KEY || ""

export const createMeeting = async ({ token }: { token: string }) => {
  try {
    // Validate token
    if (!token || token.trim() === "") {
      throw new Error("Authentication token is missing or empty")
    }

    console.log("Token length:", token.length)

    // First attempt - try with authorization header (lowercase)
    try {
      const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
          authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      if (res.ok) {
        const { roomId } = await res.json()
        console.log("Meeting created with ID:", roomId)
        return roomId
      }

      console.log("First attempt failed, trying with Bearer prefix...")
    } catch (e) {
      console.error("First attempt error:", e)
    }

    // Second attempt - try with Authorization header (capitalized) and Bearer prefix
    try {
      const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      })

      if (res.ok) {
        const { roomId } = await res.json()
        console.log("Meeting created with ID (second attempt):", roomId)
        return roomId
      }

      const errorData = await res.json()
      console.error("API Error (second attempt):", errorData)
      throw new Error(`Failed to create meeting: ${errorData.error || res.status}`)
    } catch (e) {
      console.error("Second attempt error:", e)
      throw e
    }
  } catch (error) {
    console.error("Error creating meeting:", error)
    throw error
  }
}

// Function to validate a VideoSDK token format
export const isValidToken = (token: string): boolean => {
  // Basic check: VideoSDK tokens are JWT tokens that should be in three parts separated by dots
  const parts = token.split(".")
  return parts.length === 3 && token.length > 50
}
