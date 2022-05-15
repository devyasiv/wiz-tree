import * as React from "react";
import Box from "@mui/material/Box";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";
import CircularProgress from "@mui/material/CircularProgress";

import { TreeNode } from "../types";

const isUndefined = (o: any) => typeof o === "undefined";
export interface IListItemContainerProps {
  item: TreeNode;
  path: Array<string>;
  hierarchyIndex: number;
  isExpanded: boolean;
  isLoading: boolean;
  onItemClick: (item: TreeNode) => void;
  renderTreeListItem: (item: TreeNode, path: Array<string>) => any;
}

export function ListItemContainer({
  item,
  path,
  hierarchyIndex,
  isExpanded,
  isLoading,
  onItemClick,
  renderTreeListItem,
}: IListItemContainerProps) {
  const renderIcon = () => {
    if (isLoading)
      return (
        <Box sx={{ p: 0.2 }}>
          <CircularProgress size="1.2rem" color="inherit" />
        </Box>
      );
    return item.hasChildren ? (
      isExpanded ? (
        <ExpandLess />
      ) : (
        <ExpandMore />
      )
    ) : null;
  };

  return (
    <ListItemButton
      sx={{
        // Change to styled components
        pl: hierarchyIndex * 4,
        display: "flex",
        justifyContent: "space-between",
      }}
      onClick={() => onItemClick(item)}
    >
      {renderTreeListItem(item, path)}
      {renderIcon()}
    </ListItemButton>
  );
}
