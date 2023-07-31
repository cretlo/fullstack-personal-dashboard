import { useState } from "react";
import { Contact as ContactType } from "../types";
import Modal from "react-bootstrap/Modal";

interface Props {
  handleAddContact: (contact: ContactType) => void;
}

const AddContactModal = ({ handleAddContact }: Props) => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleSave = () => {
    const nextContact = {
      id: Math.floor(Math.random() * 100) + 4,
      name: name,
      phone: phone,
      email: email,
    };

    handleAddContact(nextContact);
    setName("");
    setPhone("");
    setEmail("");
    handleClose();
  };

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={handleShow}>
        Add
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>Add Contact</Modal.Header>
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
            Add
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

export default AddContactModal;
