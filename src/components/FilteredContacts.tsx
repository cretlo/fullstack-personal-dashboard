import { useState } from "react";
import Contact from "./Contact";
import InputGroup from "react-bootstrap/InputGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import FormControl from "react-bootstrap/FormControl";
import { Contact as ContactType } from "../types";
import AddContactModal from "./AddContactModal";

interface Props {
  initialContacts: ContactType[];
}

const FilteredContact = ({ initialContacts }: Props) => {
  const [activeFilter, setActiveFilter] = useState("name");
  const [filterText, setFilterText] = useState("");
  const [contacts, setContacts] = useState<ContactType[]>(initialContacts);

  const filteredContacts = contacts.map((contact) => {
    const contactComponent = (
      <Contact
        key={contact.id}
        handleEditContact={handleEditContact}
        handleAddContact={handleAddContact}
        handleDeleteContact={handleDeleteContact}
        contact={contact}
      />
    );

    if (!filterText) {
      return contactComponent;
    }

    const name = contact.name.toLowerCase();
    const phone = contact.phone.toLowerCase();
    const email = contact.email.toLowerCase();
    const lowerCaseFilterText = filterText.toLowerCase();

    if (activeFilter === "name" && name.includes(lowerCaseFilterText)) {
      return contactComponent;
    }

    if (activeFilter === "phone" && phone.includes(lowerCaseFilterText)) {
      return contactComponent;
    }

    if (activeFilter === "email" && email.includes(lowerCaseFilterText)) {
      return contactComponent;
    }
  });

  function handleEditContact(updatedContact: ContactType) {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact,
      ),
    );
  }

  function handleAddContact(newContact: ContactType) {
    setContacts([...contacts, newContact]);
  }

  function handleDeleteContact(id: number) {
    setContacts(contacts.filter((contact) => contact.id !== id));
  }

  return (
    <>
      <h2 className="mb-3">Contacts</h2>
      <div className="d-grid mb-3">
        <AddContactModal handleAddContact={handleAddContact} />
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
      {filteredContacts}
    </>
  );
};

export default FilteredContact;
