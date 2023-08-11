export type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
};

export type NewContact = Omit<Contact, "id">;

export interface Note {
  id: string;
  title: string;
  note: string;
  editorState: string;
}
