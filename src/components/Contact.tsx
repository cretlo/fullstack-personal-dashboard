import EditContactModal from "./EditContactModal";
import { Contact as ContactType } from "../types";

interface Props {
  contact: ContactType;
  handleEditContact: (contact: ContactType) => void;
  handleAddContact: (contact: ContactType) => void;
  handleDeleteContact: (id: number) => void;
}

const Contact = ({
  contact,
  handleEditContact,
  handleDeleteContact,
}: Props) => {
  return (
    <div className="bg-light p-2 mb-2 border text-break">
      <p>{contact.name}</p>
      <ul>
        <li>Phone: {contact.phone}</li>
        <li>Email: {contact.email}</li>
      </ul>
      <div className="d-flex justify-content-end">
        <EditContactModal
          contact={contact}
          handleEditContact={handleEditContact}
        />
        <div className="vr mx-2" />
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDeleteContact(contact.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
