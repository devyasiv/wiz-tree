import * as React from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItemButton from "@mui/material/ListItemButton";

import { TreeNode } from "../types";

export interface IListItemContainerProps {
  item: TreeNode;
  path: Array<string>;
  hierarchyIndex: number;
  isExpanded: boolean;
  onExpand: (expandedNodesKey: string) => void;
  onItemClick: (item: TreeNode) => void;
  renderTreeListItem: (item: TreeNode, path: Array<string>) => any;
}

export function ListItemContainer({
  item,
  path,
  hierarchyIndex,
  isExpanded,
  onExpand,
  onItemClick,
  renderTreeListItem,
}: IListItemContainerProps) {
  return (
    <ListItemButton
      sx={{
        pl: hierarchyIndex * 4,
        display: "flex",
        justifyContent: "space-between",
      }}
      onClick={() => onItemClick(item)}
    >
      {renderTreeListItem(item, path)}
      {item.children ? isExpanded ? <ExpandLess /> : <ExpandMore /> : null}
    </ListItemButton>
  );
}
