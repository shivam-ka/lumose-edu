"use client";

import React, { useCallback, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { RenderEmptyState } from "./RenderState";

interface UploaderState {
  id: string | null;
  file: File | null;
  fileType: "image" | "video";
  objectUrl?: string;
  uploading: boolean;
  isDeleting: boolean;
  progress: number;
  key?: string;
  error: boolean;
}

export function Uploader() {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    fileType: "image",
    uploading: false,
    isDeleting: false,
    progress: 0,
    error: false,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      setFileState({
        id: uuidv4(),
        file: file,
        fileType: "image",
        uploading: false,
        isDeleting: false,
        progress: 0,
        objectUrl: URL.createObjectURL(file),
        error: false,
      });
    }
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

  function renderContent() {
    if (fileState.uploading) {
      return <h1>uploading...</h1>;
    }

    if (fileState.error) {
      return <h1>error</h1>;
    }

    if (fileState.objectUrl) {
      return <h1>object url</h1>;
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

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
        {renderContent()}
      </CardContent>
    </Card>
  );
}
