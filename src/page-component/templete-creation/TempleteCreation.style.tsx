import styled from "styled-components";

export const Sidebar = styled.div`
  width: 30%;
  padding: 20px;
  border-left: 1px solid #ccc;
  height: 100vh;
  overflow-y: auto;
`;

export const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
`;

export const TabsContainer = styled.div`
  margin-bottom: 20px;
`;

export const TabButton = styled.button<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "lightblue" : "inherit")};
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 10px;
  cursor: pointer;
`;
export const DeployButtonContainer = styled.div`
  text-align: right;
  margin-top: 10px;
`;

export const DeployButton = styled.button`
  padding: 10px;
  cursor: pointer;
  width: 200px;
  border: none;
  border-radius: 10px;
  background-color: #329ba8;
  color: white;
`;
