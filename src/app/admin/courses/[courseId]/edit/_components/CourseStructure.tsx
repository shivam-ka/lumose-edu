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
  Trash2,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

interface IAppProps {
  data: AdminSingleCourseType;
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

  return (
    <Card>
      <CardHeader className="border-border flex flex-row items-center justify-between border-b">
        <CardTitle>Chapters</CardTitle>
      </CardHeader>

      <CardContent>
        {items.map((item) => (
          <Card key={item.id} className="mb-3 py-2">
            <Collapsible
              open={item.isOpen}
              onOpenChange={() => toggleChapter(item.id)}
            >
              <div className="border-border flex items-center justify-between border-b p-2">
                <div className="flex items-center">
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
                <div >
                  {item.lesson.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between p-2"
                    >
                      <div className="flex items-center gap-2">
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
                  ))}

                  <div className="px-3 py-2">
                    <Button variant="outline" className="w-full">
                      Create New Lesson
                    </Button>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
