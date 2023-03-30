import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.firstName}</td>
      <td>{contact.lastName}</td>
      <td>{contact.UserName}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>{contact.skill}</td>
      <td>{contact.experience}</td>
      <td>{contact.description}</td>

      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
