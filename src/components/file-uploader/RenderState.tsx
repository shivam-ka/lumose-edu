import { ImageUpIcon, Trash2, UploadCloudIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";

export function RenderEmptyState({ isDragActive }: { isDragActive: boolean }) {
  if (isDragActive) {
    return (
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
    );
  }
  return (
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
  );
}

export function RenderUploadState({ previewUrl }: { previewUrl: string }) {
  return (
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
      >
        <Trash2 />
      </Button>
    </div>
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
    <div>
      <p>{progress}</p>
      <p>{file.name}</p>
    </div>
  );
}
