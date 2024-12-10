import {
  DragMoveEvent,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";

import Layout from "@/layout";
import Column from "@/components/molecule/column";
import NewColumnContainer from "@/components/molecule/newColumnContainer";
import useKanbanStore, { Item as IItem } from "@/store/useKanbanStore";
import Board from "@/container/board";
import getDropEleType from "@/utils/getDropEleType";
import Item from "@/components/atom/item";

export default function App() {
  const {
    containers,
    setContainer,
    deleteContainer,
    setActiveContainerId,
    dragContainer,
    onMoveItemSort,
    onMoveItemDrop,
    deleteItem,
    addNewItem,
  } = useKanbanStore((state) => state);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const { id } = active;

    setActiveContainerId(id);
  };

  const handleDragMove = (event: DragMoveEvent) => {
    const type = getDropEleType(event);

    if (type === "on_drag_move_handle_items_sorting") {
      onMoveItemSort(event);
    }

    if (type === "on_drag_move_handling_item_drop_into_container") {
      onMoveItemDrop(event);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const type = getDropEleType(event);

    if (type === "on_drag_end_handling_container_sorting") {
      dragContainer(event);
    }

    if (type === "on_drag_end_handling_item_sorting") {
    }

    if (type === "on_drag_end_handling_item_drop_into_container") {
    }
    setActiveContainerId(null);
  };

  const handleDeleteItem = (
    ItemId: UniqueIdentifier,
    containerId: UniqueIdentifier,
  ) => {
    deleteItem(ItemId, containerId);
  };

  const handleEditItem = () => {};

  const handleAddItem = async (
    e: React.FormEvent<HTMLFormElement>,
    containerId: UniqueIdentifier,
  ) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget)) as Omit<
      IItem,
      "id" | "imgUrl" | "labels"
    >;

    console.log(data);

    addNewItem(containerId, data);
  };

  return (
    <Layout>
      {({ settingNewColumn, setSettingNewColumn }) => (
        <Board
          className="flex flex-row h-full gap-3"
          containers={containers}
          handleDragEnd={handleDragEnd}
          handleDragMove={handleDragMove}
          handleDragStart={handleDragStart}
        >
          {containers.map((container) => (
            <Column
              key={container.id}
              container={container}
              handleAddItem={(event) => handleAddItem(event, container.id)}
              handleDelete={(id) => deleteContainer(id)}
            >
              {container.items.map((item) => (
                <Item
                  key={item.id}
                  className="mb-2"
                  handleDelete={(itemId) =>
                    handleDeleteItem(itemId, container.id)
                  }
                  handleEdit={handleEditItem}
                  {...item}
                />
              ))}
            </Column>
          ))}
          {settingNewColumn && (
            <NewColumnContainer
              handleAddColumn={(value) => setContainer(value)}
              setSettingNewColumn={setSettingNewColumn}
            />
          )}
        </Board>
      )}
    </Layout>
  );
}
