"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useUploadThing } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";

type FileWithPreview = File & {
  preview: string;
};

interface FileUploaderProps {
  onUploadComplete?: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // in MB
  fileTypes?: string[]; // e.g. ["image", "pdf"]
}

export function FileUploader({
  onUploadComplete,
  maxFiles = 1,
  maxSize = 50, // 4MB default
  fileTypes = ["image", "pdf"],
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const {
    startUpload,
    isUploading: isUploadingFile,
    routeConfig,
  } = useUploadThing(
    "fileUploader", // This should match your route handler name
    {
      onClientUploadComplete: (res) => {
        setUploadComplete(true);
        setIsUploading(false);
        setUploadProgress(100);

        // Clean up file previews to prevent memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));

        if (onUploadComplete && res) {
          const urls = res.map((file) => file.ufsUrl);
          onUploadComplete(urls);
        }
      },
      onUploadProgress: (progress) => {
        setUploadProgress(progress);
      },
      onUploadError: (error) => {
        setError(`Upload failed: ${error.message}`);
        setIsUploading(false);
        setUploadProgress(0);
      },
    }
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);

      if (acceptedFiles.length + files.length > maxFiles) {
        setError(`You can only upload up to ${maxFiles} files.`);
        return;
      }

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ) as FileWithPreview[];

      setFiles((prev) => [...prev, ...newFiles]);
    },
    [files.length, maxFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: maxSize * 1024 * 1024, // Convert MB to bytes
    accept: routeConfig ? generateClientDropzoneAccept(routeConfig) : undefined,
  });

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setError("Please select at least one file to upload.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadComplete(false);
    setError(null);

    await startUpload(files);
  };

  const resetUploader = () => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setUploadProgress(0);
    setIsUploading(false);
    setError(null);
    setUploadComplete(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {!uploadComplete && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Upload className="h-10 w-10 text-muted-foreground" />
            <h3 className="font-medium text-lg">Drag & drop files here</h3>
            <p className="text-sm text-muted-foreground">
              or click to browse files up to {maxSize}MB
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supported formats: {fileTypes.join(", ")}
            </p>
          </div>
        </div>
      )}

      {files.length > 0 && !uploadComplete && (
        <div className="mt-6 space-y-4">
          <div className="text-sm font-medium">
            Selected files ({files.length}/{maxFiles})
          </div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  disabled={isUploading}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {uploadComplete && (
        <div className="mt-6 p-4 border rounded-md bg-primary/5 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <div>
            <h4 className="font-medium">Upload complete!</h4>
            <p className="text-sm text-muted-foreground">
              {files.length} file{files.length !== 1 ? "s" : ""} uploaded
              successfully
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 border border-destructive/50 rounded-md bg-destructive/10 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {isUploading && (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Uploading...</span>
            <span>{uploadProgress}%</span>
          </div>
          <Progress value={uploadProgress} className="h-2" />
        </div>
      )}

      <div className="mt-6 flex gap-2 justify-end">
        {uploadComplete ? (
          <Button onClick={resetUploader}>Upload more files</Button>
        ) : (
          <>
            {files.length > 0 && (
              <Button
                variant="outline"
                onClick={resetUploader}
                disabled={isUploading}
              >
                Clear all
              </Button>
            )}
            <Button
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
            >
              {isUploading ? "Uploading..." : "Upload files"}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
