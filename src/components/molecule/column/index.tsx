import { SortableContext, useSortable } from "@dnd-kit/sortable";
import {
  Card,
  CardBody,
  CardHeader,
  cn,
  Button,
  ScrollShadow,
} from "@nextui-org/react";
import { IoMdMenu } from "react-icons/io";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useRef } from "react";

import AddItemModal from "../addItemModal";

import { DeleteIcon } from "@/components/atom/icon/DeleteIcon";
import { Container } from "@/store/useKanbanStore";

export type ColumnProps = {
  container: Container;
  children: React.ReactNode;
  className?: string;
  handleDelete?: (id: UniqueIdentifier) => void;
  handleAddItem?: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function Column({
  children,
  className,
  container: { id, title, items },
  handleDelete,
  handleAddItem,
}: ColumnProps) {
  const iconClasses =
    "text-default-500 pointer-events-none flex-shrink-0 h-4 w-4";
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

  const handleScrollAndSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (handleAddItem) handleAddItem(e);
    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <Card
      {...attributes}
      ref={setNodeRef}
      className={clsx(
        isDragging && "opacity-50",
        "min-w-72 h-full bg-gray-100 max-w-72",
      )}
      shadow="none"
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          <div {...listeners} className="drag-handle cursor-grab">
            <IoMdMenu className={cn(iconClasses)} />
          </div>

          <p className="flex-1">
            {title}{" "}
            <span className="text-gray-600 ml-5 text-sm">{items.length}</span>
          </p>
        </div>

        <div className="flex items-center">
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => handleDelete && handleDelete(id)}
          >
            <DeleteIcon className={cn(iconClasses, "text-danger")} />
          </Button>
          <AddItemModal handleAddItem={handleScrollAndSubmit} />
        </div>
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
