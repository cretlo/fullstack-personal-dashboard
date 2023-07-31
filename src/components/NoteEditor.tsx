import { useRef, useState, useEffect } from "react";
import { Editor, EditorState, DraftComponent, RichUtils } from "draft-js";

const NoteEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editor = useRef<DraftComponent.Base.DraftEditor | null>(null);

  useEffect(() => {
    focusEditor();
  }, []);

  const styleButtons = (
    <div className="btn-group mb-3">
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Bold
      </button>
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Italic
      </button>
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Underline
      </button>
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Highlight
      </button>
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Strikethrough
      </button>
      <button className="btn active" onMouseDown={toggleInlineStyle}>
        Code
      </button>
    </div>
  );

  function focusEditor() {
    editor.current?.focus();
  }

  function toggleInlineStyle(e: React.MouseEvent) {
    e.preventDefault();
    const style = e.currentTarget.textContent?.toUpperCase();
    if (style) {
      setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    }
  }

  return (
    <div style={{ minHeight: "50vh" }} onClick={focusEditor}>
      {styleButtons}
      <Editor
        ref={editor}
        placeholder="Add note here..."
        editorState={editorState}
        onChange={(editorState) => setEditorState(editorState)}
      />
    </div>
  );
};

export default NoteEditor;
