export interface IColors {
  folder: string;
  png: string;
  doc: string;
}
export interface TreeNode {
  label: string;
  key: string;
  type: keyof IColors;
  children: TreeNode[];
}
