"use client";
import { type Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  UndoIcon,
  RedoIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";

interface MenuBarProps {
  editor: Editor | null;
}

export function MenuBar({ editor }: MenuBarProps) {
  const [isActive, setIsActive] = useState({
    bold: false,
    italic: false,
    strike: false,
    heading1: false,
    heading2: false,
    heading3: false,
    bulletList: false,
    orderedList: false,
    textAlignLeft: false,
    textAlignCenter: false,
    textAlignRight: false,
    textAlignJustify: false,
  });

  if (!editor) return null;

  const handleTextAlignment = (
    alignment: "left" | "center" | "right" | "justify",
  ) => {
    editor.chain().focus().setTextAlign(alignment).run();

    setIsActive((prev) => ({
      ...prev,
      textAlignLeft: alignment === "left",
      textAlignCenter: alignment === "center",
      textAlignRight: alignment === "right",
      textAlignJustify: alignment === "justify",
    }));
  };

  return (
    <div className="border-input bg-card flex flex-col items-start gap-2 rounded-t-sm border p-2 sm:flex-row sm:items-center">
      <TooltipProvider>
        <div className="flex w-full flex-wrap items-center gap-2">
          {/* Text Formatting Group */}
          <div className="flex items-center gap-1">
            {/* Bold */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bold")}
                  onPressedChange={() => {
                    editor.chain().focus().toggleBold().run();
                    setIsActive((prev) => ({
                      ...prev,
                      bold: editor.isActive("bold"),
                    }));
                  }}
                  className={cn(isActive.bold && "bg-muted border")}
                >
                  <BoldIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>

            {/* Italic */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("italic")}
                  onPressedChange={() => {
                    editor.chain().focus().toggleItalic().run();
                    setIsActive((prev) => ({
                      ...prev,
                      italic: editor.isActive("italic"),
                    }));
                  }}
                  className={cn(isActive.italic && "bg-muted border")}
                >
                  <ItalicIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>

            {/* Strike */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("strike")}
                  onPressedChange={() => {
                    editor.chain().focus().toggleStrike().run();
                    setIsActive((prev) => ({
                      ...prev,
                      strike: editor.isActive("strike"),
                    }));
                  }}
                  className={cn(isActive.strike && "bg-muted border")}
                >
                  <StrikethroughIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Strike</TooltipContent>
            </Tooltip>
          </div>

          {/* Divider 1 */}
          <div className="bg-border h-6 w-px sm:block" />

          {/* Headings Group */}
          <div className="flex items-center gap-1">
            {/* Heading 1 */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 1 })}
                  onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 1 }).run();
                    setIsActive((prev) => ({
                      ...prev,
                      heading1: editor.isActive("heading", { level: 1 }),
                    }));
                  }}
                  className={cn(isActive.heading1 && "bg-muted border")}
                >
                  <Heading1Icon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>

            {/* Heading 2 */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 2 })}
                  onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 2 }).run();
                    setIsActive((prev) => ({
                      ...prev,
                      heading2: editor.isActive("heading", { level: 2 }),
                    }));
                  }}
                  className={cn(isActive.heading2 && "bg-muted border")}
                >
                  <Heading2Icon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>

            {/* Heading 3 */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("heading", { level: 3 })}
                  onPressedChange={() => {
                    editor.chain().focus().toggleHeading({ level: 3 }).run();
                    setIsActive((prev) => ({
                      ...prev,
                      heading3: editor.isActive("heading", { level: 3 }),
                    }));
                  }}
                  className={cn(isActive.heading3 && "bg-muted border")}
                >
                  <Heading3Icon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
          </div>

          {/* Divider 2 */}
          <div className="bg-border h-6 w-px sm:block" />

          {/* Lists Group */}
          <div className="flex items-center gap-1">
            {/* Bullet List */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("bulletList")}
                  onPressedChange={() => {
                    editor.chain().focus().toggleBulletList().run();
                    setIsActive((prev) => ({
                      ...prev,
                      bulletList: editor.isActive("bulletList"),
                    }));
                  }}
                  className={cn(isActive.bulletList && "bg-muted border")}
                >
                  <ListIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>

            {/* Ordered List */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive("orderedList")}
                  onPressedChange={() => {
                    editor.chain().focus().toggleOrderedList().run();
                    setIsActive((prev) => ({
                      ...prev,
                      orderedList: editor.isActive("orderedList"),
                    }));
                  }}
                  className={cn(isActive.orderedList && "bg-muted border")}
                >
                  <ListOrderedIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Ordered List</TooltipContent>
            </Tooltip>
          </div>

          {/* Divider 3 - After ordered list */}
          <div className="bg-border h-6 w-px sm:block" />

          {/* Text Alignment Group */}
          <div className="flex items-center gap-1">
            {/* Text Alignment - Left */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "left" })}
                  onPressedChange={() => handleTextAlignment("left")}
                  className={cn(isActive.textAlignLeft && "bg-muted border")}
                >
                  <AlignLeftIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>

            {/* Text Alignment - Center */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "center" })}
                  onPressedChange={() => handleTextAlignment("center")}
                  className={cn(isActive.textAlignCenter && "bg-muted border")}
                >
                  <AlignCenterIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>

            {/* Text Alignment - Right */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "right" })}
                  onPressedChange={() => handleTextAlignment("right")}
                  className={cn(isActive.textAlignRight && "bg-muted border")}
                >
                  <AlignRightIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>

            {/* Text Alignment - Justify */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={editor.isActive({ textAlign: "justify" })}
                  onPressedChange={() => handleTextAlignment("justify")}
                  className={cn(isActive.textAlignJustify && "bg-muted border")}
                >
                  <AlignJustifyIcon className="h-4 w-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>Justify</TooltipContent>
            </Tooltip>
          </div>
          <div className="bg-border h-6 w-px sm:block" />

          <div className="flex items-center gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                >
                  <UndoIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Undo</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  type="button"
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                >
                  <RedoIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Redo</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
