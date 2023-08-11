import { Contact as ContactType } from "../../types";

interface Props {
  contact: ContactType;
  showModal: (contact: ContactType) => void;
  deleteContact: (id: string) => void;
}

const Contact = ({ contact, showModal, deleteContact }: Props) => {
  return (
    <div className="bg-light p-2 mb-2 border text-break">
      <p>{contact.name}</p>
      <ul>
        <li>Phone: {contact.phone}</li>
        <li>Email: {contact.email}</li>
      </ul>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => showModal(contact)}
        >
          Edit
        </button>
        <div className="vr mx-2" />
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => deleteContact(contact.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Contact;
