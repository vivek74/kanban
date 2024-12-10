import {
  useDisclosure,
  Button,
  Input,
  Textarea,
  DatePicker,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Form,
} from "@nextui-org/react";
import { MdAdd } from "react-icons/md";

type AddItemModalProps = {
  handleAddItem?: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function AddItemModal({ handleAddItem }: AddItemModalProps) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  const iconClasses =
    "text-default-500 pointer-events-none flex-shrink-0 h-5 w-5";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    handleAddItem && handleAddItem(e);
    onOpenChange();
  };

  return (
    <>
      <Button isIconOnly size="sm" variant="light" onPress={onOpen}>
        <MdAdd className={iconClasses} />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add new item
              </ModalHeader>
              <ModalBody>
                <Form validationBehavior="native" onSubmit={onSubmit}>
                  <div className="flex items-center w-full justify-between gap-3">
                    <Input
                      isRequired
                      errorMessage="This field is required"
                      name="title"
                      placeholder="Title"
                      type="text"
                    />
                    <Input
                      isRequired
                      errorMessage="This field is required"
                      name="assigned"
                      placeholder="Assigned"
                      type="text"
                    />
                  </div>
                  <Textarea
                    isRequired
                    errorMessage="This field is required"
                    name="description"
                    placeholder="Enter description"
                  />
                  <DatePicker
                    isRequired
                    errorMessage="This field is required"
                    label="Due date"
                    name="dueDate"
                  />
                  <div>
                    <Button
                      color="danger"
                      size="sm"
                      variant="light"
                      onPress={onClose}
                    >
                      Close
                    </Button>
                    <Button size="sm" type="submit">
                      Submit
                    </Button>
                  </div>
                </Form>
              </ModalBody>
              {/* <ModalFooter>
                <Button
                  color="danger"
                  size="sm"
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button size="sm" type="submit">
                  Submit
                </Button>
              </ModalFooter> */}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
