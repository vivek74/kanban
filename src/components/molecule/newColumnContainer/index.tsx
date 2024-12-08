import { useRef, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

type textBoxColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | undefined;

type NewColumnContainerProps = {
  setSettingNewColumn: (value: boolean) => void;
  handleAddColumn: (columnName: string) => void;
};
export default function NewColumnContainer({
  setSettingNewColumn,
  handleAddColumn,
}: NewColumnContainerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<textBoxColor>("default");

  const handleConfirmAddColumn = () => {
    if (!inputRef.current) return;
    inputRef.current.focus();
    const columnName = inputRef.current.value || "";

    if (columnName.trim()) {
      handleAddColumn(columnName);
      setError("default");
      setSettingNewColumn(false);
    } else {
      setError("danger");
    }
  };

  return (
    <Card className="min-w-72 bg-slate-50" shadow="none">
      <CardBody className="h-full flex flex-row justify-center gap-1">
        <Input
          ref={inputRef}
          color={error}
          placeholder="Name"
          size="sm"
          type="type"
        />
        <Button isIconOnly size="sm" onPress={handleConfirmAddColumn}>
          <IoMdCheckmark />
        </Button>
        <Button
          isIconOnly
          color="danger"
          size="sm"
          onPress={() => setSettingNewColumn(false)}
        >
          <IoMdClose />
        </Button>
      </CardBody>
    </Card>
  );
}
