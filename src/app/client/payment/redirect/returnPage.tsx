"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ReturnPage() {
  const searchParams = useSearchParams();
  console.log("search params: ", searchParams);
  const tx_ref = searchParams.get("tx_ref");
  const status = searchParams.get("status");

  // Determine message and styling based on status
  let message, icon, statusClass;
  switch (status) {
    case "success":
      message = `Payment successful! Transaction Reference: ${tx_ref || "N/A"}`;
      icon = "✅";
      statusClass = "bg-green-100 text-green-800";
      break;
    case "failed":
      message = `Payment failed. Transaction Reference: ${
        tx_ref || "N/A"
      }. Please try again.`;
      icon = "❌";
      statusClass = "bg-red-100 text-red-800";
      break;
    case "pending":
      message = `Payment is pending. Transaction Reference: ${
        tx_ref || "N/A"
      }. We'll notify you once it's confirmed.`;
      icon = "⏳";
      statusClass = "bg-yellow-100 text-yellow-800";
      break;
    default:
      message = "Processing your payment...";
      icon = "🔄";
      statusClass = "bg-gray-100 text-gray-800";
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto p-6">
        <div
          className={`max-w-md mx-auto p-6 rounded-lg shadow-lg ${statusClass}`}
        >
          <div className="text-4xl mb-4 text-center">{icon}</div>
          <h1 className="text-2xl font-bold mb-4 text-center">
            Payment Status
          </h1>
          <p className="text-lg mb-6 text-center">{message}</p>
          <div className="flex justify-center gap-4">
            <Link href="/">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                Back to Home
              </button>
            </Link>
            {status === "failed" && (
              <Link href="/">
                <button className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
                  Try Again
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
