import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Contact as ContactType } from "../types";

type Props = {
  contact: ContactType;
  type: "add" | "edit";
  handleEditContact: (contact: ContactType) => void;
  handleAddContact: (contact: ContactType) => void;
};

const ContactModal = ({
  contact,
  type,
  handleEditContact,
  handleAddContact,
}: Props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(contact.name);
  const [phone, setPhone] = useState(contact.phone);
  const [email, setEmail] = useState(contact.email);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    const nextContact = {
      id: contact.id,
      name: name,
      phone: phone,
      email: email,
    };

    type === "add" ? handleAddContact(nextContact) : null;
    type === "edit" ? handleEditContact(nextContact) : null;

    handleClose();
  };

  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={handleShow}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>{type === "add" ? "Add" : "Edit"} Contact</Modal.Header>
        <Modal.Body>
          <div>
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              value={phone}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSave}
          >
            {type === "add" ? "Add" : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ContactModal;
