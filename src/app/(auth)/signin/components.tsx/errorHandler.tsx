// still "use client"
"use client";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import React, { useEffect } from "react";

const ErrorHandler = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      toast.error(`Authentication error: ${error}`);
    }
  }, [error]);

  return null;
};

export default ErrorHandler;