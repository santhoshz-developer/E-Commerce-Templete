import styled from "styled-components";

export const DraggableItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  font-size: 20px;
`;

export const HeaderDropBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const BodyDropBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const FooterDropBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 16px;
  border: 1px solid #ccc;
  margin-right: 16px;
  max-width: calc(100% - 300px);
`;

export const DroppableContainer = styled.div`
  min-height: 88vh;
  padding: 8px;
  border: 1px dashed #ccc;
  background-color: #f4f4f4;
`;

export const DeployButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const DeployButton = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Sidebar = styled.div`
  width: 340px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
`;

export const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 8px;
  border-bottom: 1px solid #ccc;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  &:hover {
    background-color: ${(props) => (props.active ? "#0056b3" : "#f4f4f4")};
  }
`;

export const DroppableItemsContainer = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

export const DragHandle = styled.div`
  display: flex;
  align-items: center;
  margin-right: 8px;
  cursor: grab;
  font-size: 20px;
`;

export const EmptyBoxMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 40px;
`;
