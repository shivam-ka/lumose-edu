import { ImageUpIcon, UploadCloudIcon } from "lucide-react";

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
