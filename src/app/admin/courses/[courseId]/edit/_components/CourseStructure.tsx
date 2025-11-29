"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminSingleCourseType } from "@/app/data/admin/admin-get-course";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FileTextIcon,
  GripVerticalIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";

interface IAppProps {
  data: AdminSingleCourseType;
}

interface SortableItemProps {
  id: string;
  children: (listeners: DraggableSyntheticListeners) => ReactNode;
  className?: string;
  data?: {
    type: "chapter" | "lesson";
    chapterId?: string; // only relevant for lesson
  };
}

export function CourseStructure({ data }: IAppProps) {
  const initialItems =
    data.chapter.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      order: chapter.position,
      isOpen: true,
      lesson: chapter.lessons.map((lesson) => ({
        id: lesson.id,
        title: lesson.title,
        order: lesson.position,
      })),
    })) || [];

  const [items, setItems] = useState(initialItems);

  function toggleChapter(chapterId: string) {
    setItems(
      items.map((chapter) =>
        chapter.id === chapterId
          ? { ...chapter, isOpen: !chapter.isOpen }
          : chapter,
      ),
    );
  }

  function SortableItem({ id, children, className, data }: SortableItemProps) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id, data });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className={cn("touch-none", isDragging && "z-10 opacity-70", className)}
      >
        {children(listeners)}
      </div>
    );
  }

  function handleDragEnd(event) {}

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <DndContext
      collisionDetection={rectIntersection}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <Card>
        <CardHeader className="border-border flex flex-row items-center justify-between border-b">
          <CardTitle>Chapters</CardTitle>
        </CardHeader>

        <CardContent>
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem
                id={item.id}
                key={item.id}
                data={{ type: "chapter" }}
              >
                {(listeners) => (
                  <Card key={item.id} className="mb-3 py-2">
                    <Collapsible
                      open={item.isOpen}
                      onOpenChange={() => toggleChapter(item.id)}
                    >
                      <div className="border-border flex items-center justify-between border-b p-2">
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="cursor-grab active:cursor-grabbing"
                            {...listeners}
                          >
                            <GripVerticalIcon className="size-4" />
                          </Button>
                          <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="icon">
                              {item.isOpen ? (
                                <ChevronDownIcon className="size-4" />
                              ) : (
                                <ChevronRightIcon className="size-4" />
                              )}
                            </Button>
                          </CollapsibleTrigger>

                          <p className="p-2">{item.title}</p>
                        </div>

                        <Button variant="destructive" size="icon">
                          <Trash2 />
                        </Button>
                      </div>

                      <CollapsibleContent>
                        <SortableContext
                          items={item.lesson.map((lesson) => lesson.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div>
                            {item.lesson.map((lesson) => (
                              <SortableItem
                                id={lesson.id}
                                key={lesson.id}
                                data={{ type: "lesson", chapterId: item.id }}
                              >
                                {(lessonListeners) => (
                                  <div
                                    key={lesson.id}
                                    className="flex items-center justify-between p-2"
                                  >
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="cursor-grab active:cursor-grabbing"
                                        {...lessonListeners}
                                      >
                                        <GripVerticalIcon className="size-4" />
                                      </Button>
                                      <FileTextIcon className="ml-3 size-4" />
                                      <Link
                                        href={`/admin/courses/${data.id}/${item.id}/${lesson.id}`}
                                      >
                                        {lesson.title}
                                      </Link>
                                    </div>

                                    <Button variant="destructive" size="icon">
                                      <Trash2 />
                                    </Button>
                                  </div>
                                )}
                              </SortableItem>
                            ))}

                            <div className="px-3 py-2">
                              <Button variant="outline" className="w-full">
                                Create New Lesson
                              </Button>
                            </div>
                          </div>
                        </SortableContext>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                )}
              </SortableItem>
            ))}
          </SortableContext>
        </CardContent>
      </Card>
    </DndContext>
  );
}
