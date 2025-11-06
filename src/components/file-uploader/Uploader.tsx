"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import {
  RenderEmptyState,
  RenderErrorState,
  RenderUploadingState,
  RenderUploadState,
} from "./RenderState";

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

interface IAppProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function Uploader({ value, onChange }: IAppProps) {
  const [fileState, setFileState] = useState<UploaderState>({
    id: null,
    file: null,
    fileType: "image",
    uploading: false,
    isDeleting: false,
    progress: 0,
    error: false,
    key: value,
  });

  function setFileStateToDefault() {
    setFileState({
      file: null,
      uploading: false,
      progress: 0,
      objectUrl: undefined,
      error: false,
      fileType: "image",
      id: null,
      isDeleting: false,
    });
  }

  const uploadFile = useCallback(
    async (file: File) => {
      setFileState((prev) => ({
        ...prev,
        uploading: true,
        progress: 0,
        error: false,
      }));

      try {
        const presignedResponse = await fetch("/api/s3/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            contentType: file.type,
            size: file.size,
            isImage: true,
          }),
        });

        if (!presignedResponse.ok) {
          toast.error("Failed to prepare upload. Please try again");
          setFileState((prev) => ({
            ...prev,
            uploading: false,
            progress: 0,
            error: true,
          }));
          return;
        }

        const { presignedUrl, key } = await presignedResponse.json();

        await new Promise<void>((resolve, reject) => {
          const xhr = new XMLHttpRequest();

          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              const percentageCompleted = (event.loaded / event.total) * 100;

              setFileState((prev) => ({
                ...prev,
                uploading: true,
                progress: Math.round(percentageCompleted),
                error: false,
              }));
            }
          };

          xhr.onload = () => {
            if (xhr.status === 200 || xhr.status === 204) {
              setFileState((prev) => ({
                ...prev,
                uploading: false,
                progress: 100,
                key: key,
              }));

              onChange?.(key);

              toast.error("uploaded successfully");
              resolve();
            } else {
              reject(new Error("Upload failed"));
            }
          };

          xhr.onerror = () => {
            reject(new Error("Upload failed"));
          };

          xhr.open("PUT", presignedUrl);
          xhr.setRequestHeader("Content-Type", file.type);
          xhr.send(file);
        });
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
        setFileState((prev) => ({
          ...prev,
          uploading: false,
          error: true,
          progress: 0,
        }));
      }
    },
    [onChange],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];

        if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
          URL.revokeObjectURL(fileState.objectUrl);
        }

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

        uploadFile(file);
      }
    },
    [fileState.objectUrl, uploadFile],
  );

  async function handleRemoveFile() {
    if (fileState.isDeleting || !fileState.objectUrl) return;

    try {
      setFileState((prev) => ({
        ...prev,
        isDeleting: true,
      }));

      const response = await fetch("/api/s3/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: fileState.key,
        }),
      });

      if (!response.ok) {
        toast.error("Faild to delete file");
        setFileState((prev) => ({
          ...prev,
          isDeleting: false,
          error: true,
        }));

        return;
      }

      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }

      onChange?.("");

      setFileState({
        file: null,
        uploading: false,
        progress: 0,
        objectUrl: undefined,
        error: false,
        fileType: "image",
        id: null,
        isDeleting: false,
      });

      toast.success("File Removed Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error removing file.");

      setFileState((prev) => ({
        ...prev,
        error: true,
        isDeleting: false,
      }));
    }
  }

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

  useEffect(() => {
    return () => {
      if (fileState.objectUrl && !fileState.objectUrl.startsWith("http")) {
        URL.revokeObjectURL(fileState.objectUrl);
      }
    };
  }, [fileState.objectUrl]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
    multiple: false,
    maxSize: 5 * 1024 * 1024,
    onDropRejected: rejectedFile,
    disabled:
      fileState.uploading || fileState.isDeleting || !!fileState.objectUrl,
  });

  function renderContent() {
    if (fileState.uploading) {
      return (
        <RenderUploadingState
          progress={fileState.progress}
          file={fileState.file as File}
        />
      );
    }

    if (fileState.error) {
      return (
        <RenderErrorState
          fileName={fileState.file?.name as string}
          setFileStateToDefault={setFileStateToDefault}
        />
      );
    }

    if (fileState.objectUrl) {
      return (
        <RenderUploadState
          previewUrl={fileState.objectUrl}
          isDeleting={fileState.isDeleting}
          handleRemoveFile={handleRemoveFile}
        />
      );
    }

    return <RenderEmptyState isDragActive={isDragActive} />;
  }

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "relative h-64 w-full border-2 border-dashed transition-colors duration-200",
        isDragActive
          ? "border-primary bg-primary/5"
          : !fileState.error &&
              "border-border hover:border-primary/50 cursor-pointer",
      )}
    >
      <input {...getInputProps()} />
      <CardContent className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
        {renderContent()}
      </CardContent>
    </Card>
  );
}
