import React, { useState } from "react";
import styled from "styled-components";

import Tree from "./components/Tree";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import { TreeNode, IColors } from "./types";
import { data, colors, icons } from "./mockup";
import "./App.css";

const isNull = (o: any) => o === null;
const isUndefined = (o: any) => typeof o === "undefined";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDiv = styled.div`
  min-height: 400px;
  max-height: 80vh;
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

const updateTreeData = (
  currentData: TreeNode[],
  keyToChange: string,
  newChildren: TreeNode[]
): TreeNode[] => {
  return currentData.map((item: TreeNode) => {
    if (item.key === keyToChange) {
      return {
        ...item,
        children: newChildren,
      };
    }

    if (isUndefined(item.children)) return item;

    return {
      ...item,
      children: updateTreeData(
        item.children as TreeNode[],
        keyToChange,
        newChildren
      ),
    };
  });
};

function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>(data as TreeNode[]);
  const [expandedNodesKeys, setExpandedNodesKeys] = useState<string[]>([]);
  const [loadingNodesKeys, setLoadingNodesKeys] = useState<string[]>([]);

  const handleExpand = (expandedNode: TreeNode): void => {
    const { key, children } = expandedNode;
    if (isUndefined(children)) return;

    if (isNull(children)) {
      setLoadingNodesKeys(loadingNodesKeys.concat(key));
      new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([
            {
              label: "Lemon",
              key: "1-0-0-0",
              type: "doc",
            },
            {
              label: "Peach",
              key: "1-2-3",
              type: "doc",
            },
          ]);
        }, 1000);
      }).then((children) => {
        setTreeData((currentData) => {
          return updateTreeData(currentData, key, children as TreeNode[]);
        });
        setLoadingNodesKeys(
          loadingNodesKeys.filter((curKey) => curKey !== key)
        );
        setExpandedNodesKeys(expandedNodesKeys.concat(key));
      });
    } else {
      setExpandedNodesKeys(
        expandedNodesKeys.includes(key)
          ? expandedNodesKeys.filter((curKey) => curKey !== key)
          : expandedNodesKeys.concat(key)
      );
    }
  };

  const handleItemClick = (item: TreeNode): void => {
    handleExpand(item);
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
          data={treeData}
          renderTreeListItem={renderTreeListItem}
          expandedNodesKeys={expandedNodesKeys}
          loadingNodesKeys={loadingNodesKeys}
          onExpand={handleExpand}
          onItemClick={handleItemClick}
        />
      </StyledDiv>
    </StyledApp>
  );
}

export default App;
