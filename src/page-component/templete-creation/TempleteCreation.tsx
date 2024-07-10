import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import { MdDragIndicator } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Item, ItemsMap } from "./types";
import { initialItems } from "@/config/DragDrop";
import { HeaderCollections } from "@/config/strapi.config/header.config";
import { BodyCollections } from "@/config/strapi.config/body.config";
import { FooterCollections } from "@/config/strapi.config/footer.config";
import { createStrapiCollection } from "@/service/Service";
import {
  DraggableItem,
  CloseButton,
  DeployButtonContainer,
  DeployButton,
  HeaderDropBox,
  BodyDropBox,
  FooterDropBox,
  DragHandle,
  MainContent,
  DroppableContainer,
  EmptyBoxMessage,
  Sidebar,
  TabsContainer,
  TabButton,
  DroppableItemsContainer,
} from "./TempleteCreation.style";

const TABS = ["header", "body", "footer"] as const;

type Tab = (typeof TABS)[number];

const getFormData = (items: Item[], collections: any) =>
  items.map((item) => {
    const key = item.content.toLowerCase().replace(" ", "");
    return collections[key as keyof typeof collections];
  });

const DragAndDropExample: React.FC = () => {
  const [items, setItems] = useState<ItemsMap>(initialItems);
  const [destinationBoxItems, setDestinationBoxItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("header");

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (destination.droppableId === "destination-box") {
      handleDestinationBoxDrop(source, destination);
    }
  };

  const handleDestinationBoxDrop = (source: any, destination: any) => {
    let newItems = Array.from(destinationBoxItems);
    if (source.droppableId === "destination-box") {
      const [reorderedItem] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, reorderedItem);
    } else if (source.droppableId === "source-box") {
      const draggedItem = createDraggedItem(source);
      newItems.splice(destination.index, 0, draggedItem);
    }
    setDestinationBoxItems(reorderItems(newItems));
  };

  const createDraggedItem = (source: any): Item => {
    const item = items[activeTab][source.index];
    return {
      ...item,
      id: `${item.id}-${Date.now()}`,
    };
  };

  const reorderItems = (items: Item[]): Item[] => {
    const headers = items.filter(
      (item) => item.id.startsWith("1") || item.id.startsWith("2")
    );
    const bodies = items.filter((item) =>
      ["3", "4", "5", "6"].some((prefix) => item.id.startsWith(prefix))
    );
    const footers = items.filter((item) => item.id.startsWith("7"));
    return [...headers, ...bodies, ...footers];
  };

  const handleTabClick = (tab: Tab) => setActiveTab(tab);

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
          style={provided.draggableProps.style}
        >
          {renderDropBox(item, provided, source)}
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

  const renderDeployButton = () => (
    <DeployButtonContainer>
      <DeployButton onClick={handleDeploy}>Deploy</DeployButton>
    </DeployButtonContainer>
  );

  const handleDeploy = async () => {
    try {
      const headers = getFormData(
        destinationBoxItems.filter(
          (item) => item.id.startsWith("1") || item.id.startsWith("2")
        ),
        HeaderCollections
      );
      const bodies = getFormData(
        destinationBoxItems.filter((item) =>
          ["3", "4", "5", "6"].some((prefix) => item.id.startsWith(prefix))
        ),
        BodyCollections
      );
      const footers = getFormData(
        destinationBoxItems.filter((item) => item.id.startsWith("7")),
        FooterCollections
      );
      const formData = {
        header: headers.length > 0 ? headers[0] : null,
        body: bodies,
        footer: footers.length > 0 ? footers[0] : null,
      };
      await createStrapiCollection(formData);
    } catch (error) {
      console.error("Error creating eCommerce data:", error);
    }
  };
  
  const renderDropBox = (
    item: Item,
    provided: any,
    source: "source" | "destination"
  ) => {
    const DropBoxComponent = {
      header: HeaderDropBox,
      body: BodyDropBox,
      footer: FooterDropBox,
    }[activeTab];
    return (
      <DropBoxComponent>
        <DragHandle {...provided.dragHandleProps}>
          {source === "destination" && (
            <div style={{ zIndex: "999" }}>
              <MdDragIndicator />
            </div>
          )}
          <img src={item.imageUrl} width={"100%"} alt={item.content} />
        </DragHandle>
      </DropBoxComponent>
    );
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
            {TABS.map((tab) => (
              <TabButton
                key={tab}
                onClick={() => handleTabClick(tab)}
                active={activeTab === tab}
              >
                {`${tab.charAt(0).toUpperCase()}${tab.slice(1)}`} (
                {items[tab].length})
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
