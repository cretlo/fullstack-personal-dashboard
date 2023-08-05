import { ChangeEvent, FormEvent, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Contact as ContactType } from "../../types";

interface Props {
  initialContact: ContactType;
  isNewContact: boolean;
  show: boolean;
  closeModal: () => void;
  addContact: (contact: ContactType) => void;
  updateContact: (contact: ContactType) => void;
}

const ContactModal = ({
  initialContact,
  isNewContact,
  show,
  closeModal,
  addContact,
  updateContact,
}: Props) => {
  const [contact, setContact] = useState(initialContact);

  const { name, phone, email } = contact;

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setContact({ ...contact, [e.currentTarget.name]: e.currentTarget.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isNewContact) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    closeModal();
  }

  return (
    <Modal show={show} onHide={closeModal} backdrop="static">
      <Modal.Header>
        {isNewContact ? "Add Contact" : "Edit Contact"}
      </Modal.Header>
      <form onSubmit={handleSubmit}>
        <Modal.Body>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={name}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              className="form-control"
              value={phone}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              value={email}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={closeModal}
          >
            Close
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ContactModal;
