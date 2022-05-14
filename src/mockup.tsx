import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import FeedIcon from "@mui/icons-material/Feed";

export const colors = {
  folder: "#fdbe45",
  png: "#2ba58b",
  doc: "#3f4da2",
};

export const icons = {
  folder: <FolderIcon />,
  png: <ImageIcon />,
  doc: <FeedIcon />,
};

export const data = [
  {
    label: "Avocado",
    key: "0",
    type: "folder",
    children: null,
  },
  {
    label: "Banana",
    key: "1",
    type: "folder",
    children: [
      {
        label: "Yellow Banana",
        key: "1-0",
        type: "folder",
        children: [
          {
            label: "Green Banana",
            key: "1-0-0",
            type: "folder",
            children: [
              {
                label: "Green Banana",
                key: "1-0-0-0",
                type: "doc",
              },
            ],
          },
          {
            label: "Green Banana",
            key: "1-0-1",
            type: "doc",
          },
        ],
      },
      {
        label: "Green Banana",
        key: "1-1",
        type: "doc",
      },
    ],
  },
  {
    label: "Watermelon",
    key: "2",
    type: "folder",
  },
  {
    label: "Pear",
    key: "3",
    type: "folder",
  },
];
