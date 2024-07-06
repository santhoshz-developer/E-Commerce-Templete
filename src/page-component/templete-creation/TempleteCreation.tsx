import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import { initialItems } from "@/config/DragDrop";
import {
  DraggableItem,
  CloseButton,
  HeaderDropBox,
  BodyDropBox,
  FooterDropBox,
  MainContent,
  DroppableContainer,
  DeployButtonContainer,
  DeployButton,
  Sidebar,
  TabsContainer,
  TabButton,
  DroppableItemsContainer,
  DragHandle,
  EmptyBoxMessage,
} from "./TempleteCreation.style";
import { MdDragIndicator } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Item, ItemsMap } from "./types";

const DragAndDropExample = () => {
  const [items, setItems] = useState<ItemsMap>(initialItems);
  const [destinationBoxItems, setDestinationBoxItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<"header" | "body" | "footer">(
    "header"
  );

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === "destination-box") {
      handleDestinationBoxDrop(source, destination);
    }
  };

  const handleDestinationBoxDrop = (source: any, destination: any) => {
    if (source.droppableId === "destination-box") {
      // Reorder within the destination box
      const newItems = [...destinationBoxItems];
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
      setDestinationBoxItems(newItems);
    } else if (source.droppableId === "source-box") {
      // Move from source box to destination box
      const draggedItem = createDraggedItem(source);
      const newDestinationItems = [...destinationBoxItems];
      if (activeTab === "header") {
        newDestinationItems.unshift(draggedItem); // Insert at the top
      } else if (activeTab === "body") {
        const middleIndex = Math.ceil(newDestinationItems.length / 2);
        newDestinationItems.splice(middleIndex, 0, draggedItem); // Insert in the middle
      } else if (activeTab === "footer") {
        newDestinationItems.push(draggedItem); // Insert at the bottom
      }
      setDestinationBoxItems(newDestinationItems);
    }
  };

  const createDraggedItem = (source: any) => {
    const draggedItem = {
      ...items[activeTab as keyof ItemsMap][source.index],
      showDeleteButton: false,
      id: `${
        items[activeTab as keyof ItemsMap][source.index].id
      }-${Date.now()}`,
    };
    return draggedItem as Item;
  };

  const handleTabClick = (tab: "header" | "body" | "footer") => {
    setActiveTab(tab);
  };

  const handleDeploy = () => {
    const jsonData = JSON.stringify(destinationBoxItems);
    console.log(jsonData);
  };

  const handleRemoveItem = (
    itemId: string,
    source: "source" | "destination"
  ) => {
    if (source === "source") {
      setItems((prevItems) => ({
        ...prevItems,
        [activeTab]: prevItems[activeTab].filter((item) => item.id !== itemId),
      }));
    } else if (source === "destination") {
      setDestinationBoxItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    }
  };

  const renderDraggableItem = (
    item: Item,
    index: number,
    source: "source" | "destination"
  ) => (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided: any) => (
        <DraggableItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{ ...provided.draggableProps.style }}
        >
          {renderDropBox(item, provided)}
          {source === "destination" && (
            <CloseButton
              onClick={() => handleRemoveItem(item.id, "destination")}
            >
              <IoClose />
            </CloseButton>
          )}
        </DraggableItem>
      )}
    </Draggable>
  );

  const renderDeployButton = () => {
    return (
      <DeployButtonContainer>
        <DeployButton onClick={handleDeploy}>Deploy</DeployButton>
      </DeployButtonContainer>
    );
  };

  const renderDropBox = (item: Item, provided: any) => {
    switch (activeTab) {
      case "header":
        return (
          <HeaderDropBox>
            <DragHandle {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandle>
            <img src={item.imageUrl} width={"100%"} alt={item.content} />
          </HeaderDropBox>
        );
      case "body":
        return (
          <BodyDropBox>
            <DragHandle {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandle>
            <img src={item.imageUrl} width={"100%"} alt={item.content} />
          </BodyDropBox>
        );
      case "footer":
        return (
          <FooterDropBox>
            <DragHandle {...provided.dragHandleProps}>
              <MdDragIndicator />
            </DragHandle>
            <img src={item.imageUrl} width={"100%"} alt={item.content} />
          </FooterDropBox>
        );
      default:
        return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        <MainContent>
          <Droppable droppableId="destination-box">
            {(provided: any) => (
              <DroppableContainer
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {destinationBoxItems.length === 0 ? (
                  <EmptyBoxMessage>
                    Drag a Your Website Template
                  </EmptyBoxMessage>
                ) : (
                  destinationBoxItems.map((item, index) =>
                    renderDraggableItem(item, index, "destination")
                  )
                )}
                {provided.placeholder}
              </DroppableContainer>
            )}
          </Droppable>
          {renderDeployButton()}
        </MainContent>
        <Sidebar>
          <TabsContainer>
            {["header", "body", "footer"].map((tab) => (
              <TabButton
                key={tab}
                onClick={() =>
                  handleTabClick(tab as "header" | "body" | "footer")
                }
                active={activeTab === tab}
              >
                {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`} (
                {items[tab as keyof ItemsMap].length})
              </TabButton>
            ))}
          </TabsContainer>
          <Droppable droppableId="source-box">
            {(provided: any) => (
              <DroppableItemsContainer
                activeTab={activeTab}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {items[activeTab].map((item, index) =>
                  renderDraggableItem(item, index, "source")
                )}
                {provided.placeholder}
              </DroppableItemsContainer>
            )}
          </Droppable>
        </Sidebar>
      </div>
    </DragDropContext>
  );
};

export default DragAndDropExample;
