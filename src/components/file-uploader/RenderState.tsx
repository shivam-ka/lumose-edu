"use client";

import {
  CircleMinusIcon,
  ImageUpIcon,
  ShieldAlertIcon,
  UploadCloudIcon,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import LoadingScreen from "../loading-screen";
import { motion } from "motion/react";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  if (isDragActive) {
    return (
      <>
        <UploadCloudIcon className="text-primary size-12 animate-pulse" />
        <div className="space-y-2">
          <p className="text-primary text-lg font-medium">
            Drop the files here...
          </p>
          <p className="text-muted-foreground text-sm">
            Release to upload your files
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <ImageUpIcon className="text-muted-foreground size-12" />
      <div className="space-y-1">
        <p className="text-lg font-medium">Drag & drop files here</p>
        <p className="text-muted-foreground text-sm">
          or click to select files
        </p>
      </div>
      <p className="text-muted-foreground text-xs">Max Size: 5MB</p>
    </>
  );
}

export function RenderUploadState({
  previewUrl,
  isDeleting,
  handleRemoveFile,
}: {
  previewUrl: string;
  isDeleting: boolean;
  handleRemoveFile: () => void;
}) {
  return (
    <>
      <div>
        <Image
          alt="uploaded file"
          fill
          src={previewUrl}
          className="object-contain p-2"
        />

        <Button
          variant="destructive"
          size="icon-sm"
          className="absolute top-4 right-4 z-10 dark:bg-red-500"
          disabled={isDeleting}
          onClick={handleRemoveFile}
        >
          <CircleMinusIcon />
        </Button>
      </div>
      <LoadingScreen loading={isDeleting} text="Deleting File..." />
    </>
  );
}

export function RenderUploadingState({
  progress,
  file,
}: {
  progress: number;
  file: File;
}) {
  return (
    <div className="w-full max-w-md min-w-0 space-y-3">
      <div className="flex min-w-0 items-center justify-between gap-2 text-sm">
        <span className="text-foreground truncate font-medium">
          Uploading...
        </span>
        <span className="text-muted-foreground shrink-0">{progress}%</span>
      </div>

      <div className="bg-secondary h-2 w-full overflow-hidden rounded-sm">
        <motion.div
          className="bg-primary h-full rounded-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 100,
          }}
        />
      </div>

      <div className="flex min-w-0 flex-col overflow-hidden">
        <p
          className="text-foreground line-clamp-1 text-sm font-medium break-words"
          title={file.name}
        >
          {file.name}
        </p>
        <div className="text-muted-foreground truncate text-xs">
          {Math.round(file.size / 1024)} KB • {file.type || "Unknown type"}
        </div>
      </div>
    </div>
  );
}

export function RenderErrorState({
  fileName,
  setFileStateToDefault,
}: {
  fileName: string;
  setFileStateToDefault: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4 text-center">
      <div className="bg-destructive/10 flex items-center justify-center rounded-full p-3">
        <ShieldAlertIcon className="text-destructive size-7" />
      </div>

      <div className="w-full max-w-sm space-y-1.5">
        <p className="text-foreground text-lg font-semibold">Upload Failed</p>
        <p className="text-muted-foreground text-sm">
          Something went wrong while uploading:
        </p>
        <p className="text-destructive mx-auto max-w-[240px] truncate text-sm font-medium">
          {fileName}
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={setFileStateToDefault}
      >
        <CircleMinusIcon className="size-3" />
        Remove File
      </Button>
    </div>
  );
}
