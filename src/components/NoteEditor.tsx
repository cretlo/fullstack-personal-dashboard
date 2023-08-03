import { useRef, useState, useEffect } from "react";
import {
  Editor,
  EditorState,
  DraftComponent,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { inlineStyles, blockTypes } from "../../lib/editorData";
import { Note as NoteType } from "../types";
import "draft-js/dist/Draft.css";

interface Props {
  note: NoteType;
  handleEditorChange: (note: NoteType) => void;
}

const NoteEditor = ({ note, handleEditorChange }: Props) => {
  const initialState = !note.editorState
    ? EditorState.createEmpty()
    : EditorState.createWithContent(
        convertFromRaw(JSON.parse(note.editorState)),
      );
  const [editorState, setEditorState] = useState(initialState);
  const editorRef = useRef<DraftComponent.Base.DraftEditor | null>(null);
  const activeStyleSet = new Set(editorState.getCurrentInlineStyle().toArray());
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
    editorRef.current?.focus();
  }

  function handleActiveBlockType(value: string) {
    if (activeBlockType === value) {
      setActiveBlockType("");
    } else {
      setActiveBlockType(value);
    }
    return;
  }

  function toggleInlineStyle(e: React.MouseEvent) {
    e.preventDefault();
    const style = e.currentTarget.getAttribute("data-style");

    if (!style) return;

    setEditorState(
      RichUtils.toggleInlineStyle(editorState, style.toUpperCase()),
    );
  }

  function toggleBlockType(e: React.MouseEvent) {
    e.preventDefault();
    const blockType = e.currentTarget.getAttribute("data-block-type");

    if (!blockType) return;

    handleActiveBlockType(blockType);
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  }

  function handleChange(editorState: EditorState) {
    const rawContentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent()),
    );
    handleEditorChange({
      ...note,
      note: editorState.getCurrentContent().getPlainText(),
      editorState: rawContentState,
      activeInlineStyles: editorState.getCurrentInlineStyle().toArray(),
    });
    setEditorState(editorState);
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
        ref={editorRef}
        placeholder="Add note here..."
        editorState={editorState}
        onChange={handleChange}
      />
    </div>
  );
};

export default NoteEditor;
