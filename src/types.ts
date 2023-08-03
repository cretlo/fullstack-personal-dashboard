export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export interface Note {
  id: number;
  title: string;
  note: string;
  editorState: string;
  activeInlineStyles: string[];
}
