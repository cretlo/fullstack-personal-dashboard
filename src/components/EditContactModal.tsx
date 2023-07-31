import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Contact as ContactType } from "../types";

type Props = {
  contact: ContactType;
  handleEditContact: (contact: ContactType) => void;
};

const EditContactModal = ({ contact, handleEditContact }: Props) => {
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

    handleEditContact(nextContact);

    handleClose();
  };

  return (
    <>
      <button type="button" className="btn btn-secondary" onClick={handleShow}>
        Edit
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>Edit Contact</Modal.Header>
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
            Save
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

export default EditContactModal;
