import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Card, CardBody } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import { Avatar } from "@nextui-org/avatar";
import { cn } from "@nextui-org/theme";
import { Button } from "@nextui-org/button";
import { UniqueIdentifier } from "@dnd-kit/core";

import { EditDocumentIcon } from "../icon/EditIcon";

import { DeleteIcon } from "@/components/atom/icon/DeleteIcon";
import { Item as IItem } from "@/store/useKanbanStore";

interface ItemProps extends IItem {
  className?: string;
  handleDelete?: (id: UniqueIdentifier) => void;
  handleEdit?: (id: UniqueIdentifier) => void;
}

const Item = memo(function Item({
  id,
  className,
  title,
  description,
  assigned,
  dueDate,
  labels,
  imgUrl,
  handleDelete,
  handleEdit,
}: ItemProps) {
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
      type: "item",
    },
  });

  const maxLabelsToShow = 3;
  const iconClasses = "text-default-500 pointer-events-none flex-shrink-0";

  const truncatedDescription =
    description.split(" ").slice(0, 20).join(" ") +
    (description.split(" ").length > 20 ? "..." : "");

  return (
    <Card
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      className={clsx(isDragging && "opacity-50", className)}
      shadow="sm"
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
    >
      <CardBody>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{title}</p>
          <div className="flex items-center">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => handleEdit && handleEdit(id)}
            >
              <EditDocumentIcon className={cn(iconClasses)} />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onClick={() => handleDelete && handleDelete(id)}
            >
              <DeleteIcon className={cn(iconClasses, "text-danger")} />
            </Button>
          </div>
        </div>

        <p className="text-tiny text-gray-600 mt-1">{truncatedDescription}</p>
        <div className="mt-3 flex flex-wrap items-center gap-1">
          {labels.slice(0, maxLabelsToShow).map(({ title, color }) => (
            <Chip
              key={title}
              className="truncate"
              color={color}
              size="sm"
              variant="flat"
            >
              {title}
            </Chip>
          ))}
          {labels.length > maxLabelsToShow && (
            <Chip className="truncate" color="primary" size="sm" variant="flat">
              +{labels.length - maxLabelsToShow} More
            </Chip>
          )}
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="text-tiny text-gray-500">{dueDate}</p>
          <div className="flex items-center gap-2">
            <p className="text-tiny text-gray-500">{assigned}</p>
            <Avatar size="sm" src={imgUrl} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
});

export default Item;
