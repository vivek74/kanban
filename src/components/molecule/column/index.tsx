import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { cn } from "@nextui-org/theme";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "@nextui-org/button";
import { useRef } from "react";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { DeleteIcon } from "@/components/atom/icon/DeleteIcon";
import { Container } from "@/store/useKanbanStore";

export type ColumnProps = {
  container: Container;
  children: React.ReactNode;
  className?: string;
  handleDelete?: (id: UniqueIdentifier) => void;
};
export default function Column({
  children,
  className,
  container: { id, title, items },
  handleDelete,
}: ColumnProps) {
  const iconClasses = "text-default-500 pointer-events-none flex-shrink-0";
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      type: "container",
    },
  });

  return (
    <Card
      {...attributes}
      ref={setNodeRef}
      className={clsx(
        isDragging && "opacity-50",
        "min-w-72 h-full bg-gray-100",
      )}
      shadow="none"
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <CardHeader {...listeners} className="flex items-center justify-center">
        <p className="flex-1">
          {title}{" "}
          <span className="text-gray-600 ml-5 text-sm">{items.length}</span>
        </p>

        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={() => handleDelete && handleDelete(id)}
        >
          <DeleteIcon className={cn(iconClasses, "text-danger")} />
        </Button>
      </CardHeader>
      <CardBody className={className}>
        <SortableContext items={items.map(({ id }) => id)}>
          <ScrollShadow
            ref={scrollContainerRef}
            hideScrollBar
            className="p-1"
            orientation="vertical"
          >
            {children}
          </ScrollShadow>
        </SortableContext>
      </CardBody>
    </Card>
  );
}
