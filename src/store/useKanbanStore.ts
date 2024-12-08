import { DragEndEvent, UniqueIdentifier, DragMoveEvent } from "@dnd-kit/core";
import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";

import { Color, getColor } from "@/utils/getColor";
import { getAvatar } from "@/utils/getAvatar";

const data: Container[] = [
  {
    id: `container-${uuidv4()}`,
    title: "To Do",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 1",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "React" },
          { color: getColor(), title: "Node" },
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
      {
        id: `item-${uuidv4()}`,
        title: "Task 2",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
      {
        id: `item-${uuidv4()}`,
        title: "Task 3",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
      {
        id: `item-${uuidv4()}`,
        title: "Task 4",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
      {
        id: `item-${uuidv4()}`,
        title: "Task 5",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "In Progress",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 3",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Done",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 4",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Review",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 5",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Testing",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 6",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
  {
    id: `container-${uuidv4()}`,
    title: "Deploy",
    items: [
      {
        id: `item-${uuidv4()}`,
        title: "Task 7",
        description:
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
        dueDate: "2021-12-31",
        labels: [
          { color: getColor(), title: "Java" },
          { color: getColor(), title: "Python" },
          { color: getColor(), title: "Ruby" },
          { color: getColor(), title: "Go" },
        ],
        assigned: "John Doe",
        imgUrl: getAvatar(),
      },
    ],
  },
];

export interface Labels {
  color: Color;
  title: string;
}
export interface Item {
  id: UniqueIdentifier;
  title: string;
  description: string;
  dueDate: string;
  labels: Labels[];
  assigned: string;
  imgUrl: string;
}

export interface Container {
  id: UniqueIdentifier;
  title: string;
  items: Item[];
}

interface KanbanStore {
  containers: Container[];
  activateContainerId: UniqueIdentifier | null;
  setActiveContainerId: (id: UniqueIdentifier | null) => void;
  setContainer: (colName: string) => void;
  deleteContainer: (id: UniqueIdentifier) => void;
  dragContainer: (event: DragEndEvent) => void;
  // generic function
  getItemById: (id: UniqueIdentifier) => Item;
  getContainerById: (id: UniqueIdentifier) => Container;
  findValueOfItems: (
    id: UniqueIdentifier,
    type: "column" | "item",
  ) => Container | undefined;
  // Item operation
  onMoveItemSort: (event: DragMoveEvent) => void;
  onMoveItemDrop: (event: DragMoveEvent) => void;
  onEndItemSort: (event: DragEndEvent) => void;
  onEndItemDrop: (event: DragEndEvent) => void;
}

const useKanbanStore = create<KanbanStore>((set, get) => ({
  containers: [...data],
  activateContainerId: null,
  setContainer: (containers) => {
    if (!containers) return;
    const id = `container-${uuidv4()}`;

    set((state) => {
      return {
        ...state,
        containers: [
          ...state.containers,
          {
            id,
            title: containers,
            items: [],
          },
        ],
      };
    });
  },
  deleteContainer: (id) => {
    set((state) => {
      return {
        ...state,
        containers: state.containers.filter((container) => container.id !== id),
      };
    });
  },
  setActiveContainerId(id) {
    set({ activateContainerId: id });
  },
  dragContainer: (event) => {
    const { active, over } = event;

    set((state) => {
      const activeContainerIndex = state.containers.findIndex(
        (container) => container.id === active.id,
      );

      const overContainerIndex = state.containers.findIndex(
        (container) => container.id === over?.id,
      );
      let newItems = [...state.containers];

      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);

      return {
        ...state,
        containers: newItems,
      };
    });
  },
  getItemById: (id) => {
    const container = get().containers.find((container) =>
      container.items.find((item) => item.id === id),
    );

    const item = container?.items.find((item) => item.id === id);

    if (!item) {
      throw new Error(`Item with id ${id} not found`);
    }

    return item;
  },
  getContainerById: (id) => {
    const container = get().containers.find((container) => container.id === id);

    if (!container) {
      throw new Error(`Container with id ${id} not found`);
    }

    return container;
  },
  findValueOfItems: (id, type) => {
    if (type === "column") {
      return get().containers.find((item) => item.id === id);
    }
    if (type === "item") {
      return get().containers.find((container) =>
        container.items.find((item) => item.id === id),
      );
    }
  },

  onMoveItemSort: (event) => {
    const { active, over } = event;

    if (!active.id || !over?.id) return;
    const activeContainer = get().findValueOfItems(active.id, "item");
    const overContainer = get().findValueOfItems(over.id, "item");

    if (!activeContainer || !overContainer) return;
    const activeContainerIndex = get().containers.findIndex(
      (container) => container.id === activeContainer.id,
    );
    const overContainerIndex = get().containers.findIndex(
      (container) => container.id === overContainer.id,
    );

    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id,
    );
    const overItemIndex = overContainer.items.findIndex(
      (item) => item.id === over.id,
    );

    if (activeContainerIndex === overContainerIndex) {
      let newItems = [...get().containers];

      newItems[activeContainerIndex].items = arrayMove(
        newItems[activeContainerIndex].items,
        activeItemIndex,
        overItemIndex,
      );
      set({ containers: newItems });
    } else {
      let newItems = [...get().containers];
      const [removedItem] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1,
      );

      newItems[overContainerIndex].items.splice(overItemIndex, 0, removedItem);
      set({ containers: newItems });
    }
  },
  onMoveItemDrop: (event) => {
    const { active, over } = event;

    if (!active.id || !over?.id) return;
    const activeContainer = get().findValueOfItems(active.id, "item");
    const overContainer = get().findValueOfItems(over.id, "column");

    if (!activeContainer || !overContainer) return;

    const activeContainerIndex = get().containers.findIndex(
      (container) => container.id === activeContainer.id,
    );
    const overContainerIndex = get().containers.findIndex(
      (container) => container.id === overContainer.id,
    );

    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id,
    );

    let newItems = [...get().containers];
    const [removedItem] = newItems[activeContainerIndex].items.splice(
      activeItemIndex,
      1,
    );

    newItems[overContainerIndex].items.push(removedItem);
    set({ containers: newItems });
  },
  onEndItemSort: (event) => {
    const { active, over } = event;

    if (!active.id || !over?.id) return;
    const activeContainer = get().findValueOfItems(active.id, "item");
    const overContainer = get().findValueOfItems(over.id, "item");

    if (!activeContainer || !overContainer) return;
    const activeContainerIndex = get().containers.findIndex(
      (container) => container.id === activeContainer.id,
    );
    const overContainerIndex = get().containers.findIndex(
      (container) => container.id === overContainer.id,
    );
    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id,
    );
    const overItemIndex = overContainer.items.findIndex(
      (item) => item.id === over.id,
    );

    if (activeContainerIndex === overContainerIndex) {
      let newItems = [...get().containers];

      newItems[activeContainerIndex].items = arrayMove(
        newItems[activeContainerIndex].items,
        activeItemIndex,
        overItemIndex,
      );
      set({ containers: newItems });
    } else {
      let newItems = [...get().containers];
      const [removedItem] = newItems[activeContainerIndex].items.splice(
        activeItemIndex,
        1,
      );

      newItems[overContainerIndex].items.splice(overItemIndex, 0, removedItem);
      set({ containers: newItems });
    }
  },
  onEndItemDrop: (event) => {
    const { active, over } = event;

    if (!active.id || !over?.id) return;
    const activeContainer = get().findValueOfItems(active.id, "item");
    const overContainer = get().findValueOfItems(over.id, "column");

    if (!activeContainer || !overContainer) return;

    const activeContainerIndex = get().containers.findIndex(
      (container) => container.id === activeContainer.id,
    );
    const overContainerIndex = get().containers.findIndex(
      (container) => container.id === overContainer.id,
    );

    const activeItemIndex = activeContainer.items.findIndex(
      (item) => item.id === active.id,
    );

    let newItems = [...get().containers];
    const [removedItem] = newItems[activeContainerIndex].items.splice(
      activeItemIndex,
      1,
    );

    newItems[overContainerIndex].items.push(removedItem);
    set({ containers: newItems });
  },
}));

export default useKanbanStore;
