import { useState } from "react";
import Contact from "./Contact";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import FormControl from "react-bootstrap/FormControl";
import { Contact as ContactType } from "../../types";
import ContactModal from "./ContactModal";

interface Props {
  initialContacts: ContactType[];
}

const FilteredContact = ({ initialContacts }: Props) => {
  const [activeFilter, setActiveFilter] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);
  const [currContact, setCurrContact] = useState<ContactType>({
    id: contacts.length,
    name: "",
    phone: "",
    email: "",
  });
  const [isNewContact, setIsNewContact] = useState(false);
  const [show, setShow] = useState(false);

  const filteredContacts = contacts.map((contact) => {
    const contactComponent = (
      <Contact
        key={contact.id}
        showModal={showModal}
        deleteContact={deleteContact}
        contact={contact}
      />
    );

    if (!filterText) {
      return contactComponent;
    }

    let { name, phone, email } = contact;
    name = name.toLowerCase();
    phone = phone.toLowerCase();
    email = email.toLowerCase();
    const filterTextLowerCase = filterText.toLowerCase();

    if (activeFilter === "name" && name.includes(filterTextLowerCase)) {
      return contactComponent;
    }

    if (activeFilter === "phone" && phone.includes(filterTextLowerCase)) {
      return contactComponent;
    }

    if (activeFilter === "email" && email.includes(filterTextLowerCase)) {
      return contactComponent;
    }
  });

  function updateContact(updatedContact: ContactType) {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact,
      ),
    );
  }

  function addContact(newContact: ContactType) {
    setContacts([...contacts, newContact]);
  }

  function deleteContact(id: number) {
    setContacts(contacts.filter((contact) => contact.id !== id));
  }

  function showModal(contact: ContactType) {
    setCurrContact(contact);
    setShow(true);
  }

  function closeModal() {
    setIsNewContact(false);
    setShow(false);
  }

  function handleAddButtonClick() {
    const newContact = {
      id: contacts.length,
      name: "",
      phone: "",
      email: "",
    };
    showModal(newContact);
    setIsNewContact(true);
  }

  return (
    <>
      <h2 className="mb-3">Contacts</h2>
      <div className="d-grid mb-3">
        <button
          type="button"
          className="btn btn-primary py-2 "
          onClick={handleAddButtonClick}
        >
          Add Contact
        </button>
      </div>
      <InputGroup className="mb-3">
        <FormControl
          type="text"
          onChange={(e) => setFilterText(e.target.value)}
          value={filterText}
          placeholder="Filter contacts using the catagory on the right..."
        />
        <DropdownButton
          variant="outline-secondary"
          title={activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
          id="input-group-dropdown-1"
        >
          <DropdownItem onClick={() => setActiveFilter("name")}>
            Name
          </DropdownItem>
          <DropdownItem onClick={() => setActiveFilter("phone")}>
            Phone
          </DropdownItem>
          <DropdownItem onClick={() => setActiveFilter("email")}>
            Email
          </DropdownItem>
        </DropdownButton>
      </InputGroup>
      <div
        className="position-relative overflow-scroll"
        style={{ maxHeight: "70vh" }}
      >
        {filteredContacts}
      </div>
      <ContactModal
        key={currContact.id}
        isNewContact={isNewContact}
        initialContact={currContact}
        show={show}
        closeModal={closeModal}
        addContact={addContact}
        updateContact={updateContact}
      />
    </>
  );
};

export default FilteredContact;
