import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  position: absolute;
  bottom: 20px;
  right: 20px;
`;

export const DeployButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;

export const DeployButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 1px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const PreviousButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 1px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  margin-right: 200px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const NextButton = styled.button`
  background-color: #007bff;
  border: none;
  border-radius: 1px;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: #0056b3;
  }
`;

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

export const ProductDropBox = styled.div`
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

export const DescriptionDropBox = styled.div`
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
  border: 5px solid #ccc;
  margin-right: 16px;
  margin-left:10px;
  margin-bottom:5px;
  max-width: calc(100% - 340px);
  display: flex;
  flex-direction: column;
  
`;

export const DroppableContainer = styled.div`
  min-height: 88vh;
  padding: 8px;
  border: 1px dashed #ccc;
  background-color: #f4f4f4;
  flex: 1;
`;


export const Sidebar = styled.div`
  width: 400px;
  border: 5px solid #ccc;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-right:10px;
  margin-bottom:5px;
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

export const SourceBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 340px;
  padding: 16px;
  background: #f4f4f4;
  border-left: 1px solid #ccc;
`;
