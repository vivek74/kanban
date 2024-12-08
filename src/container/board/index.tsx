import {
  DndContext,
  closestCorners,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  sortableKeyboardCoordinates,
  SortableContext,
} from "@dnd-kit/sortable";

import Item from "@/components/atom/item";
import Column from "@/components/molecule/column";
import useKanbanStore from "@/store/useKanbanStore";
import { Container } from "@/store/useKanbanStore";

type BoardProps = {
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragMove: (event: DragMoveEvent) => void;
  handleDragStart: (event: DragStartEvent) => void;
  containers: Container[];
  children: React.ReactNode;
  className?: string;
};
export default function Board({
  handleDragEnd,
  handleDragMove,
  handleDragStart,
  containers,
  children,
  className,
}: BoardProps) {
  const { activateContainerId, getContainerById, getItemById } = useKanbanStore(
    (state) => state,
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return (
    <div className={className}>
      <DndContext
        collisionDetection={closestCorners}
        sensors={sensors}
        onDragEnd={handleDragEnd}
        onDragMove={handleDragMove}
        onDragStart={handleDragStart}
      >
        <SortableContext items={containers.map(({ id }) => id)}>
          {children}
        </SortableContext>
        <DragOverlay adjustScale={false}>
          {activateContainerId &&
            activateContainerId.toString().includes("item") && (
              <Item {...getItemById(activateContainerId)} />
            )}
          {activateContainerId &&
            activateContainerId.toString().includes("container") && (
              <Column container={getContainerById(activateContainerId)}>
                {getContainerById(activateContainerId).items.map((item) => (
                  <Item key={item.id} {...item} />
                ))}
              </Column>
            )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
