import { DragMoveEvent, DragEndEvent } from "@dnd-kit/core";

type ElementType =
  | "on_drag_move_handle_items_sorting"
  | "on_drag_move_handling_item_drop_into_container"
  | "on_drag_end_handling_container_sorting"
  | "on_drag_end_handling_item_sorting"
  | "on_drag_end_handling_item_drop_into_container"
  | undefined;

export default function getDropEleType(
  event: DragMoveEvent | DragEndEvent,
): ElementType {
  const { active, over } = event;

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    return "on_drag_move_handle_items_sorting";
  }
  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    return "on_drag_move_handling_item_drop_into_container";
  }

  if (
    active.id.toString().includes("container") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    return "on_drag_end_handling_container_sorting";
  }

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("item") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    return "on_drag_end_handling_item_sorting";
  }

  if (
    active.id.toString().includes("item") &&
    over?.id.toString().includes("container") &&
    active &&
    over &&
    active.id !== over.id
  ) {
    return "on_drag_end_handling_item_drop_into_container";
  }
}
