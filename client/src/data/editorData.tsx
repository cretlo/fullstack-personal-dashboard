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

export const inlineStyles = [
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

export const initalNotes = [
  {
    id: 0,
    title: "First note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
  {
    id: 1,
    title: "Second note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
  {
    id: 2,
    title: "Third note",
    note: "This is a bunch of random text",
    editorState: "",
    activeStyleSet: [],
  },
];

export const initialContacts = [
  {
    id: 0,
    name: "Dale Diddler",
    phone: "307-555-5555",
    email: "thedale@gmail.com",
  },
  {
    id: 1,
    name: "Tina Tickler",
    phone: "307-555-5555",
    email: "tinapower@gmail.com",
  },
  {
    id: 2,
    name: "Timothy Tamalie",
    phone: "307-555-5555",
    email: "timtim420@gmail.com",
  },
];
