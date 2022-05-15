import FolderIcon from "@mui/icons-material/Folder";
import ImageIcon from "@mui/icons-material/Image";
import FeedIcon from "@mui/icons-material/Feed";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import VideocamIcon from "@mui/icons-material/Videocam";
import LandscapeIcon from "@mui/icons-material/Landscape";

export const colors = {
  folder: "#fdbe45",
  png: "#71d796",
  doc: "#3f4da2",
  wav: "#e1dd71",
  mp4: "#d87b7b",
  svg: "#b386d3",
};

export const icons = {
  folder: <FolderIcon />,
  png: <ImageIcon />,
  doc: <FeedIcon />,
  wav: <MusicNoteIcon />,
  mp4: <VideocamIcon />,
  svg: <LandscapeIcon />,
};

export const getChildren = (key: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(generateChildren(key, Math.floor(Math.random() * 6)));
    }, 1000);
  });

const generateChildren = (parentKey: string, count: number) => {
  return Array.from(Array(count).keys()).map((key) => {
    const hasChildren = Math.random() < 0.5;
    return {
      label: hasChildren ? `Folder-${key}` : `File-${key}`,
      key: `${parentKey}-${key}`,
      type: hasChildren
        ? "folder"
        : Object.keys(colors)[Math.ceil(Math.random() * 5)],
      hasChildren,
    };
  });
};
