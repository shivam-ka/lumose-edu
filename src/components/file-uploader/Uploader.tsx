"use client";

import React, { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ImageUpIcon, UploadCloudIcon } from "lucide-react";
import { toast } from "sonner";

export function Uploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  function rejectedFile(fileRejection: FileRejection[]) {
    if (fileRejection.length) {
      const tooManyFiles = fileRejection.find(
        (rejection) => rejection.errors[0].code === "too-many-files",
      );

      const fileSizeTooBig = fileRejection.find(
        (rejection) => rejection.errors[0].code === "file-too-large",
      );

      if (fileSizeTooBig) {
        toast.error("File size should be less than 5 MB.");
      }

      if (tooManyFiles) {
        toast.error("You can only upload one file at a time.");
      }
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFile,
  });

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full cursor-pointer border-2 border-dashed transition-colors duration-200",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/50",
      )}
    >
      <input {...getInputProps()} />
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        {isDragActive ? (
          <>
            <UploadCloudIcon className="text-primary h-12 w-12 animate-pulse" />
            <div className="space-y-2">
              <p className="text-primary text-lg font-medium">
                Drop the files here...
              </p>
              <p className="text-muted-foreground text-sm">
                Release to upload your files
              </p>
            </div>
          </>
        ) : (
          <>
            <ImageUpIcon className="text-muted-foreground h-12 w-12" />
            <div className="space-y-2">
              <p className="text-lg font-medium">Drag & drop files here</p>
              <p className="text-muted-foreground text-sm">
                or click to select files
              </p>
            </div>
            <p className="text-muted-foreground mt-2 text-xs">
              Supports: PDF, JPG, PNG, DOC (Max: 10MB)
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
