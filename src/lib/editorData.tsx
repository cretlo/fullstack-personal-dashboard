import {
  TbBold,
  TbItalic,
  TbUnderline,
  TbStrikethrough,
  TbCode,
  TbH1,
  TbH2,
  TbH3,
  TbBlockquote,
  TbList,
  TbListNumbers,
  TbSourceCode,
} from "react-icons/tb";

export const styles = [
  {
    style: "BOLD",
    iconComponent: <TbBold />,
  },
  {
    style: "ITALIC",
    iconComponent: <TbItalic />,
  },
  {
    style: "UNDERLINE",
    iconComponent: <TbUnderline />,
  },
  {
    style: "STRIKETHROUGH",
    iconComponent: <TbStrikethrough />,
  },
  {
    style: "CODE",
    iconComponent: <TbCode />,
  },
];

export const blockTypes = [
  {
    type: "header-one",
    iconComponent: <TbH1 />,
  },
  {
    type: "header-two",
    iconComponent: <TbH2 />,
  },
  {
    type: "header-three",
    iconComponent: <TbH3 />,
  },
  {
    type: "blockquote",
    iconComponent: <TbBlockquote />,
  },
  {
    type: "unordered-list-item",
    iconComponent: <TbList />,
  },
  {
    type: "ordered-list-item",
    iconComponent: <TbListNumbers />,
  },
  {
    type: "code-block",
    iconComponent: <TbSourceCode />,
  },
];
