import React, { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
} from "react-beautiful-dnd-next";
import { initialItems } from "@/config/DragDrop";
import {
  DeployButton,
  DeployButtonContainer,
  MainContent,
  Sidebar,
  TabButton,
  TabsContainer,
} from "./TempleteCreation.style";

interface Item {
  id: string;
  content: string;
  imageUrl: string;
}

const DragAndDropExample: React.FC = () => {
  const [items, setItems] = useState<{ [key: string]: Item[] }>(initialItems);
  const [destinationBoxItems, setDestinationBoxItems] = useState<Item[]>([]);
  const [activeTab, setActiveTab] = useState<string>("header");

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    if (!destination) {
      return;
    }
  
    if (destination.droppableId === "destination-box") {
      if (source.droppableId === "destination-box") {
        // Reorder within the destination box
        const newItems = [...destinationBoxItems];
        const [reorderedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, reorderedItem);
        setDestinationBoxItems(newItems);
      } else if (source.droppableId === "source-box") {
        // Move from source box to destination box
        const draggedItem = items[activeTab][source.index];
        setDestinationBoxItems(prevItems => [...prevItems, draggedItem]);
      }
    } else if (destination.droppableId === "source-box") {
      if (source.droppableId === "destination-box") {
        // Move from destination box back to source box
        const draggedItem = destinationBoxItems[source.index];
        setDestinationBoxItems(prevItems =>
          prevItems.filter((_, index) => index !== source.index)
        );
      }
    }
  };  

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDeploy = () => {
    // Convert destinationBoxItems to JSON format
    const jsonData = JSON.stringify(destinationBoxItems);
    console.log(jsonData); // Output JSON data to console or send it wherever needed
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex" }}>
        {/* MainContent - Left side */}
        <MainContent>
          <Droppable droppableId="destination-box">
            {(provided: any, snapshot: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  minHeight: "100%",
                  border: "1px solid #ddd",
                  padding: "10px",
                  backgroundColor: snapshot.isDraggingOver
                    ? "lightblue"
                    : "inherit",
                }}
              >
                {destinationBoxItems.length === 0 && (
                  <div
                    style={{
                      fontSize: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    Drag Your Website
                  </div>
                )}
                {destinationBoxItems.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "8px",
                          margin: "0 0 8px 0",
                          minHeight: "50px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          width={"100%"}
                          alt={item.content}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <DeployButtonContainer>
            <DeployButton onClick={handleDeploy}>Deploy</DeployButton>
          </DeployButtonContainer>
        </MainContent>

        {/* Sidebar - right side */}
        <Sidebar>
          <TabsContainer>
            <TabButton
              onClick={() => handleTabClick("header")}
              active={activeTab === "header"}
            >
              Header ({items.header.length})
            </TabButton>
            <TabButton
              onClick={() => handleTabClick("body")}
              active={activeTab === "body"}
            >
              Body ({items.body.length})
            </TabButton>
            <TabButton
              onClick={() => handleTabClick("footer")}
              active={activeTab === "footer"}
            >
              Footer ({items.footer.length})
            </TabButton>
          </TabsContainer>

          <Droppable droppableId="source-box">
            {(provided: any, snapshot: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  display:
                    activeTab === "header"
                      ? "block"
                      : activeTab === "body"
                      ? "block"
                      : activeTab === "footer"
                      ? "block"
                      : "none",
                  height: "100%",
                  border: "1px solid #ccc",
                  padding: "10px",
                  backgroundColor: snapshot.isDraggingOver
                    ? "lightblue"
                    : "inherit",
                }}
              >
                {items[activeTab].map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: "8px",
                          margin: "0 0 8px 0",
                          minHeight: "50px",
                          backgroundColor: "#fff",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          ...provided.draggableProps.style,
                        }}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.content}
                          style={{ maxWidth: "100%" }}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </Sidebar>
      </div>
    </DragDropContext>
  );
};

export default DragAndDropExample;
