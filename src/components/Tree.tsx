import * as React from "react";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";

import { ListItemContainer } from "./ListItemContainer";

import { TreeNode } from "../types";

export interface ITreeProps {
  data: TreeNode[];
  hierarchyIndex?: number;
  path?: string[];
  //   listProps: ;
  //   listItemContainerProps: ;
  //   collapsibleProps: ;
  expandedNodesKeys: string[];
  loadingNodesKeys: string[];
  onExpand: (expandedNode: TreeNode) => void;
  onItemClick: (item: TreeNode) => void;
  renderTreeListItem: (item: TreeNode, path: string[]) => any;
}

const Tree = ({
  data,
  hierarchyIndex = 0,
  path = [],
  expandedNodesKeys,
  loadingNodesKeys,
  onExpand,
  onItemClick,
  renderTreeListItem,
}: ITreeProps) => {
  return (
    <List>
      {data.map((item: TreeNode, index: number) => {
        const isExpanded = expandedNodesKeys.includes(item.key);
        const isLoading = loadingNodesKeys.includes(item.key);

        return (
          <React.Fragment key={item.key}>
            <ListItemContainer
              item={item}
              path={path.concat(`${index}`)}
              hierarchyIndex={hierarchyIndex}
              isExpanded={isExpanded}
              isLoading={isLoading}
              onItemClick={onItemClick}
              renderTreeListItem={renderTreeListItem}
            />
            {item.children && item.children.length > 0 && (
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Tree
                  data={item.children}
                  hierarchyIndex={hierarchyIndex + 1}
                  path={path.concat(`${index}`)}
                  renderTreeListItem={renderTreeListItem}
                  expandedNodesKeys={expandedNodesKeys}
                  loadingNodesKeys={loadingNodesKeys}
                  onExpand={onExpand}
                  onItemClick={onItemClick}
                />
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Tree;
