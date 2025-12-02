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
import React, { ReactNode, useEffect, useState } from "react";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  DragEndEvent,
  DraggableSyntheticListeners,
  KeyboardSensor,
  PointerSensor,
  rectIntersection,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { reorderChapters, reorderLessons } from "../actions";
import { NewChapterDialog } from "./NewChapterDialog";
import { NewLessonDialog } from "./NewLessonDialog";

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

  useEffect(() => {
    setItems((previousItem) => {
      const updatedItem =
        data.chapter.map((chapter) => ({
          id: chapter.id,
          title: chapter.title,
          order: chapter.position,
          isOpen:
            previousItem.find((item) => item.id === chapter.id)?.isOpen ?? true,
          lesson: chapter.lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.title,
            order: lesson.position,
          })),
        })) || [];

      return updatedItem;
    });
  }, [data]);

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

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;
    const activeType = active.data.current?.type as "chapter" | "lesson";
    const overType = active.data.current?.type as "chapter" | "lesson";
    const courseId = data.id;

    if (activeType === "chapter") {
      let targetChapterId = null;

      if (overType === "chapter") {
        targetChapterId = overId;
      } else if (overType === "lesson") {
        targetChapterId = over.data.current?.chapterId ?? null;
      }

      if (!targetChapterId) {
        toast.error("could not determine the chapter for reordering");
        return;
      }

      const oldIndex = items.findIndex((item) => item.id === activeId);
      const newIndex = items.findIndex((item) => item.id === targetChapterId);

      if (oldIndex === -1 || newIndex === -1) {
        toast.error("could not find chapter ond/new index");
      }

      const reorderLocalChapters = arrayMove(items, oldIndex, newIndex);
      console.log("reorderLocalChapters:- ", reorderLocalChapters);

      const updatedChapterForState = reorderLocalChapters.map(
        (chapter, index) => ({
          ...chapter,
          order: index + 1,
        }),
      );

      console.log("updatedChapterForState:- ", updatedChapterForState);

      const previousItem = [...items];
      setItems(updatedChapterForState);

      if (courseId) {
        const chapterToUpdate = updatedChapterForState.map((chapter) => ({
          id: chapter.id,
          position: chapter.order,
        }));

        const reorderChapterPromise = () =>
          reorderChapters(courseId, chapterToUpdate);

        toast.promise(reorderChapterPromise, {
          loading: "Reordering Chapters...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItem);
            return "failed to reorder chapters";
          },
        });
      }
    }

    if (activeType === "lesson" && overType === "lesson") {
      const chapterId = active.data.current?.chapterId;
      const overChapterId = active.data.current?.chapterId;

      if (!chapterId || chapterId !== overChapterId) {
        toast.error("Lesson can't move in different chapter");
        return;
      }

      const chapterIndex = items.findIndex(
        (chapter) => chapter.id === chapterId,
      );

      if (chapterIndex === -1) {
        toast.error("could not find chapter for lesson");
        return;
      }

      const chapterToUpdate = items[chapterIndex];

      const oldLessonIndex = chapterToUpdate.lesson.findIndex(
        (lesson) => lesson.id === activeId,
      );

      const newLessonIndex = chapterToUpdate.lesson.findIndex(
        (lesson) => lesson.id === overId,
      );

      if (oldLessonIndex === -1 || newLessonIndex === -1) {
        toast.error("could not find lesson for reodering");
        return;
      }

      const reorderedLesson = arrayMove(
        chapterToUpdate.lesson,
        oldLessonIndex,
        newLessonIndex,
      );

      const updatedLessonForState = reorderedLesson.map((lesson, index) => ({
        ...lesson,
        order: index + 1,
      }));

      const newItem = [...items];

      newItem[chapterIndex] = {
        ...chapterToUpdate,
        lesson: updatedLessonForState,
      };

      const previousItems = [...items];

      setItems(newItem);

      if (courseId) {
        const lessonsToUpdate = updatedLessonForState.map((lesson) => ({
          id: lesson.id,
          position: lesson.order,
        }));

        const reorderedLessonPromise = () =>
          reorderLessons(chapterId, lessonsToUpdate, courseId);

        toast.promise(reorderedLessonPromise(), {
          loading: "reordering Lessons...",
          success: (result) => {
            if (result.status === "success") return result.message;
            throw new Error(result.message);
          },
          error: () => {
            setItems(previousItems);
            return "Faild to update";
          },
        });
      }

      return;
    }
  }

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
          <NewChapterDialog courseId={data.id} />
        </CardHeader>

        <CardContent className="px-2 sm:px-6">
          <SortableContext items={items} strategy={verticalListSortingStrategy}>
            {items.map((item) => (
              <SortableItem
                id={item.id}
                key={item.id}
                data={{ type: "chapter" }} // -> dragEnd -> event.active.data
              >
                {(listeners) => (
                  <Card key={item.id} className="mb-6 py-2">
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
                                    className="hover:bg-secondary flex items-center justify-between border-b px-3 py-2"
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

                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      title={`Delete ${lesson.title}`}
                                    >
                                      <Trash2 />
                                    </Button>
                                  </div>
                                )}
                              </SortableItem>
                            ))}

                            <div className="px-3 py-2">
                              <NewLessonDialog
                                courseId={data.id}
                                chapterId={item.id}
                              />
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
