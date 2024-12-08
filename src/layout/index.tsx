import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { useRef } from "react";
import { Button } from "@nextui-org/button";
import { FiUserPlus } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { Avatar, AvatarGroup } from "@nextui-org/avatar";

import { SearchIcon } from "@/components/atom/icon/SearchIcon";
import { LayoutIcon } from "@/components/atom/icon/LayoutIcon";

type ChildProps = {
  settingNewColumn: boolean;
  setSettingNewColumn: (value: boolean) => void;
};

type LayoutProps = {
  children: ({
    settingNewColumn,
    setSettingNewColumn,
  }: ChildProps) => React.ReactNode;
};
export default function Layout({ children }: LayoutProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [settingNewColumn, setSettingNewColumn] = useState<boolean>(false);

  const handleScrollAndColumn = () => {
    setSettingNewColumn(true);

    setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          left: scrollContainerRef.current.scrollWidth,
          behavior: "smooth",
        });
      }
    }, 0);
  };

  return (
    <div className="flex flex-col gap-2 h-full bg-gray-50">
      <Card className="flex flex-row" radius="md" shadow="none">
        <Card
          className="bg-gray-50 flex flex-row gap-2 items-center"
          shadow="none"
          style={{ width: "20%" }}
        >
          <CardBody className="flex flex-row gap-2 items-center py-0 pr-0">
            <p className="text-xl">Trello</p>
            <Input
              labelPlacement="outside"
              placeholder="Search"
              startContent={
                <SearchIcon className="text-sm text-default-400 pointer-events-none flex-shrink-0" />
              }
              type="text"
            />
            <Divider orientation="vertical" />
          </CardBody>
        </Card>

        {/* <Card className="flex-1 bg-gray-50" shadow="none">
          <CardBody className="py-0">
            <p className="text-2xl">side</p>
          </CardBody>
        </Card> */}
      </Card>
      <Card className="flex-1 bg-gray-100" radius="md" shadow="none">
        <CardBody className="flex flex-row">
          <Card className="bg-gray-100" shadow="none" style={{ width: "20%" }}>
            <CardBody>
              <div className="flex items-center justify-between">
                <FiUserPlus className="w-5 h-5" />
                <BsThreeDots className="w-5 h-5" />
              </div>
              <div
                className="flex flex-col gap-4"
                style={{ marginTop: "20px" }}
              >
                <p className="text-lg text-gray-600">Project User</p>
                <AvatarGroup isBordered size="sm">
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                  <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                </AvatarGroup>
              </div>
            </CardBody>
          </Card>
          <Card className="flex-1" shadow="none">
            <CardBody>
              <div
                className="flex flex-row justify-between items-center"
                style={{ padding: "10px" }}
              >
                <div className="flex items-center gap-2">
                  <LayoutIcon className="w-5 h-5" />
                  <p className="text-xl">Project</p>
                </div>

                <Button size="sm" onPress={handleScrollAndColumn}>
                  Create column
                </Button>
              </div>

              <ScrollShadow
                ref={scrollContainerRef}
                hideScrollBar
                orientation="horizontal"
              >
                {children({ settingNewColumn, setSettingNewColumn })}
              </ScrollShadow>
            </CardBody>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
}
