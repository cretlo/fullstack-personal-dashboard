export type Contact = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

export type NewContact = Omit<Contact, "id">;

export interface Note {
  id: number;
  title: string;
  note: string;
  editorState: string;
}
