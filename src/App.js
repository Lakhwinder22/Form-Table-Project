import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    firstName: "",
    lastName: "",
    UserName: "",
    phoneNumber: "",
    email: "",
    skill: "",
    experience: "",
    description: "",

  });

  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    UserName: "",
    phoneNumber: "",
    email: "",
    skill: "",
    experience: "",
    description: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      firstName: addFormData.firstName,
      lastName: addFormData.lastName,
      UserName: addFormData.UserName,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email,
      skill: addFormData.skill,
      experience: addFormData.experience,
      description: addFormData.description,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      firstName: editFormData.firstName,
      lastName: editFormData.lastName,
      UserName: editFormData.UserName,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
      skill: editFormData.skill,
      experience: editFormData.experience,
      description: editFormData.description,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      firstName: contact.firstName,
      lastName: contact.lastName,
      UserName: contact.UserName,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
      skill: contact.skill,
      experience: contact.experience,
      description: contact.description,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  };

  return (
    <div className="MainClass">
      <div className="app-container"> 
      <h2> Fill The Form</h2>
      <form onSubmit={handleAddFormSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          notrequired="Not required"
          placeholder="Enter First Name..."
          onChange={handleAddFormChange}
        /><br></br><br></br>
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          notrequired="Not required"
          placeholder="Enter Last Name..."
          onChange={handleAddFormChange}
        /><br></br><br></br>
         <label>User Name</label>
         <input
          type="text"
          name="UserName"
          required="required"
          placeholder="Enter User Name..."
          onChange={handleAddFormChange}
        /><br></br><br></br>
         <label>Phone Number</label>
        <input
          type="phone"
          name="phoneNumber"
          required="required"
          placeholder="9898******"
          onChange={handleAddFormChange}
        /><br></br><br></br>
         <label>Email ID</label>
        <input
          type="email"
          name="email"
          required="required"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <br></br><br></br>
        <label>Skill</label>
         <input 
          type="text" 
          name="skill"
          required="required"
          placeholder="Enter your Skills..."
          onChange={handleAddFormChange}
        />
        <br></br><br></br>
         <label>Total Experience</label>
         <input
          type="number"
          name="experience"
          required="required"
          placeholder="Enter Total Experience..."
          onChange={handleAddFormChange}
        /><br></br><br></br>
         <label>Description</label>
         <textarea
          type="text"
          name="description"
          required="required"
          placeholder=" Write YourSelf..."
          onChange={handleAddFormChange}
        /><br></br><br></br>
        <button type="submit">Submit</button>
        <button type="Onchange">New Record</button>
      </form>
      </div>
      <br></br>
      <form onSubmit={handleEditFormSubmit}>
        <table className="TableCard">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Phone Number</th>
              <th>Email</th>
              <th>Skill</th>
              <th>Experience</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default App;
