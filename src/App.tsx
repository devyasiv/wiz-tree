import React, { useState } from "react";
import styled from "styled-components";

import Tree from "./components/Tree";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { TreeNode, IColors } from "./types";
import { data, colors, icons } from "./mockup";
import "./App.css";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDiv = styled.div`
  height: 400px;
  width: 500px;
  border: 1px solid black;
  overflow: auto;
`;

const StyledListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAvatar = styled(Avatar)<{ type: keyof IColors }>`
  margin: 0 16px;
  background-color: ${({ type }) => colors[type]};
`;

function App() {
  const [expandedNodesKeys, setExpandedNodesKeys] = useState<string[]>([]);

  const handleExpand = (expandedNodeKey: string): void => {
    setExpandedNodesKeys(
      expandedNodesKeys.includes(expandedNodeKey)
        ? expandedNodesKeys.filter((curKey) => curKey !== expandedNodeKey)
        : expandedNodesKeys.concat(expandedNodeKey)
    );
  };

  const handleItemClick = (item: TreeNode): void => {
    handleExpand(item.key);
  };

  const renderTreeListItem = (item: TreeNode, path: Array<string>) => {
    return (
      <StyledListItem>
        <ListItemAvatar>
          <StyledAvatar type={item.type}>{icons[item.type]}</StyledAvatar>
        </ListItemAvatar>
        <ListItemText primary={item.label} secondary="Jan 9, 2014" />
      </StyledListItem>
    );
  };

  return (
    <StyledApp>
      <StyledDiv>
        <Tree
          data={data as TreeNode[]}
          renderTreeListItem={renderTreeListItem}
          expandedNodesKeys={expandedNodesKeys}
          onExpand={handleExpand}
          onItemClick={handleItemClick}
        />
      </StyledDiv>
    </StyledApp>
  );
}

export default App;
