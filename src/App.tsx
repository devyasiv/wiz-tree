import styled from "styled-components";
import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Tree from "./components/Tree";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CircularProgress from "@mui/material/CircularProgress";

import { TreeNode, IColors } from "./types";
import { colors, icons, getChildren } from "./mockup";

import "./App.css";

const isUndefined = (o: any) => typeof o === "undefined";

const StyledApp = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledTreeContainer = styled.div`
  min-height: 400px;
  max-height: 80vh;
  width: 500px;
  border: 1px solid black;
  overflow: auto;
`;

const StyledSpinnerBoxContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
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
  updateObj: { hasChildren?: boolean; children?: TreeNode[] }
): TreeNode[] => {
  return currentData.map((item: TreeNode) => {
    if (item.key === keyToChange) {
      return {
        ...item,
        ...updateObj,
      };
    }

    if (isUndefined(item.children)) return item;

    return {
      ...item,
      children: updateTreeData(
        item.children as TreeNode[],
        keyToChange,
        updateObj
      ),
    };
  });
};

function App() {
  const [treeData, setTreeData] = useState<TreeNode[]>([]);
  const [expandedNodesKeys, setExpandedNodesKeys] = useState<string[]>([]);
  const [loadingNodesKeys, setLoadingNodesKeys] = useState<string[]>([]);
  const [loadingInitialData, setLoadingInitialData] = useState<boolean>(true);

  useEffect(() => {
    getChildren("0").then((items) => {
      setLoadingInitialData(false);
      setTreeData(items as TreeNode[]);
    });
  }, []);

  const handleExpand = (expandedNode: TreeNode): void => {
    const { key, children, hasChildren } = expandedNode;

    if (!hasChildren && isUndefined(children)) return;

    if (hasChildren && isUndefined(children)) {
      setLoadingNodesKeys(loadingNodesKeys.concat(key));
      getChildren(key).then((children) => {
        setLoadingNodesKeys(
          loadingNodesKeys.filter((curKey) => curKey !== key)
        );
        let updateObj: { hasChildren?: boolean; children?: TreeNode[] };
        if (children && (children as TreeNode[]).length === 0) {
          updateObj = { hasChildren: false };
        } else {
          updateObj = { children: children as TreeNode[] };
        }
        setTreeData((currentData) => {
          return updateTreeData(currentData, key, updateObj);
        });
        /**
         * -- TODO ---
         * The tree data needs to be set prior to adding the item key to the expandedNodesKeys state,
         * So that the animation of the Collapse component will happen, that's why as a workaround
         * I write the setExpandedNodesKeys in setTimeout, so that this callback will enter the queue.
         */
        setTimeout(() => {
          setExpandedNodesKeys(expandedNodesKeys.concat(key));
        }, 0);
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
        <ListItemText primary={item.label} secondary={item.type} />
      </StyledListItem>
    );
  };

  return (
    <StyledApp>
      <StyledTreeContainer>
        {loadingInitialData ? (
          <StyledSpinnerBoxContainer>
            <Box sx={{ p: 0.2 }}>
              <CircularProgress size="2rem" color="inherit" />
            </Box>
          </StyledSpinnerBoxContainer>
        ) : (
          <Tree
            data={treeData}
            loadingNodesKeys={loadingNodesKeys}
            expandedNodesKeys={expandedNodesKeys}
            onExpand={handleExpand}
            onItemClick={handleItemClick}
            renderTreeListItem={renderTreeListItem}
          />
        )}
      </StyledTreeContainer>
    </StyledApp>
  );
}

export default App;
