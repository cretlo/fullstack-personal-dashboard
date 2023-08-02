import { useRef, useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  DraftComponent,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { inlineStyles, blockTypes } from "../lib/editorData";
import { Note as NoteType } from "../types";

interface Props {
  note: NoteType;
  setNote: (note: NoteType) => void;
}

const NoteEditor = ({ note, setNote }: Props) => {
  const initialState = !note.editorState
    ? EditorState.createEmpty()
    : EditorState.createWithContent(
        convertFromRaw(JSON.parse(note.editorState)),
      );
  const [editorState, setEditorState] = useState(initialState);
  const editor = useRef<DraftComponent.Base.DraftEditor | null>(null);
  const [activeStyleSet, setActiveSet] = useState<Set<string>>(new Set());
  const [activeBlockType, setActiveBlockType] = useState("");

  useEffect(() => {
    focusEditor();
  }, []);

  const inlineStyleButtons = inlineStyles.map(({ style, iconComponent }) => {
    const active = activeStyleSet.has(style) ? "active" : "";
    return (
      <button
        key={style}
        data-style={style}
        onMouseDown={toggleInlineStyle}
        className={`btn btn-outline-dark ${active}`}
      >
        {iconComponent}
      </button>
    );
  });

  const blockTypeButtons = blockTypes.map(({ type, iconComponent }) => {
    const active = activeBlockType === type ? "active" : "";
    return (
      <button
        key={type}
        data-block-type={type}
        onMouseDown={toggleBlockType}
        className={`btn btn-outline-dark ${active}`}
      >
        {iconComponent}
      </button>
    );
  });

  function focusEditor() {
    editor.current?.focus();
  }

  function handleActiveBtns(value: string, type: "block" | "style") {
    if (type === "block") {
      if (activeBlockType === value) {
        setActiveBlockType("");
      } else {
        setActiveBlockType(value);
      }
      return;
    }

    const newActiveStyleSet = new Set([...activeStyleSet]);
    newActiveStyleSet.has(value)
      ? newActiveStyleSet.delete(value)
      : newActiveStyleSet.add(value);
    setActiveSet(newActiveStyleSet);
  }

  function toggleInlineStyle(e: React.MouseEvent) {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");

    if (!style) {
      return;
    }

    handleActiveBtns(style, "style");
    setEditorState(
      RichUtils.toggleInlineStyle(editorState, style.toUpperCase()),
    );
  }

  function toggleBlockType(e: React.MouseEvent) {
    e.preventDefault();
    const blockType = e.currentTarget.getAttribute("data-block-type");

    if (!blockType) {
      return;
    }

    handleActiveBtns(blockType, "block");
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  return (
    <div style={{ minHeight: "50vh" }} onClick={focusEditor}>
      <div className="d-flex justify-content-center mb-2">
        {inlineStyleButtons}
      </div>
      <div className="d-flex justify-content-center mb-2">
        {blockTypeButtons}
      </div>
      <Editor
        ref={editor}
        placeholder="Add note here..."
        editorState={editorState}
        onChange={(editorState) => {
          const rawContentState = JSON.stringify(
            convertToRaw(editorState.getCurrentContent()),
          );
          setNote({
            ...note,
            note: editorState.getCurrentContent().getPlainText(),
            editorState: rawContentState,
          });
          setEditorState(editorState);
        }}
      />
    </div>
  );
};

export default NoteEditor;
