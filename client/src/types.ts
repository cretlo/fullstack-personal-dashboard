export interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
}

export type NewContact = Omit<Contact, "id">;

export interface Note {
  id: number;
  title: string;
  note: string;
  editorState: string;
}

export interface AlertData {
  id: string; // uuid
  message: string;
  type: string;
}

export interface AuthState {
  token: string | null;
  user: { id: number; username: string } | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  error: string | null;
}

export interface RegisterUser {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface LoginUser {
  username: string;
  password: string;
}
