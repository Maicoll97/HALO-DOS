// src/components/RegisteredUsers.js
import React, { useState } from 'react';
import '../styles/registered-users.css';

function RegisteredUsers() {
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
  const [editingUserIndex, setEditingUserIndex] = useState(null);
  const [editedUserDetails, setEditedUserDetails] = useState({});

  const handleEdit = (index) => {
    setEditingUserIndex(index);
    setEditedUserDetails(users[index]);
  };

  const handleSave = () => {
    const updatedUsers = [...users];
    updatedUsers[editingUserIndex] = { ...editedUserDetails };
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUserIndex(null);
  };

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handlePrint = (user) => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>User Details</title></head><body>');
    printWindow.document.write(`<h1>User Details</h1>`);
    printWindow.document.write(`<p><strong>Email:</strong> ${user.email}</p>`);
    printWindow.document.write(`<p><strong>City:</strong> ${user.city}</p>`);
    printWindow.document.write(`<p><strong>Country:</strong> ${user.country}</p>`);
    printWindow.document.write(`<p><strong>Phone:</strong> ${user.phone}</p>`);
    printWindow.document.write(`<p><strong>Postal Code:</strong> ${user.postalCode}</p>`);
    printWindow.document.write(`<p><strong>ID Number:</strong> ${user.documentNumber}</p>`);
    printWindow.document.write(`<p><strong>Gender:</strong> ${user.gender}</p>`);
    printWindow.document.write(`<p><strong>Birth Date:</strong> ${user.birthDate}</p>`);
    printWindow.document.write(`<p><strong>Registration Time:</strong> ${user.registrationTime}</p>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="registered-users-container">
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users registered.</p>
      ) : (
        <div className="users-list">
          {users.map((user, index) => (
            <div key={index} className="user-card">
              <h3>User {index + 1}</h3>
              {editingUserIndex === index ? (
                <div className="edit-form">
                  <label>
                    Email:
                    <input
                      type="email"
                      value={editedUserDetails.email}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, email: e.target.value })}
                    />
                  </label>
                  <label>
                    City:
                    <input
                      type="text"
                      value={editedUserDetails.city}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, city: e.target.value })}
                    />
                  </label>
                  <label>
                    Country:
                    <input
                      type="text"
                      value={editedUserDetails.country}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, country: e.target.value })}
                    />
                  </label>
                  <label>
                    Phone:
                    <input
                      type="text"
                      value={editedUserDetails.phone}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, phone: e.target.value })}
                    />
                  </label>
                  <label>
                    Postal Code:
                    <input
                      type="text"
                      value={editedUserDetails.postalCode}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, postalCode: e.target.value })}
                    />
                  </label>
                  <label>
                    ID Number:
                    <input
                      type="text"
                      value={editedUserDetails.documentNumber}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, documentNumber: e.target.value })}
                    />
                  </label>
                  <label>
                    Gender:
                    <input
                      type="text"
                      value={editedUserDetails.gender}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, gender: e.target.value })}
                    />
                  </label>
                  <label>
                    Birth Date:
                    <input
                      type="date"
                      value={editedUserDetails.birthDate}
                      onChange={(e) => setEditedUserDetails({ ...editedUserDetails, birthDate: e.target.value })}
                    />
                  </label>
                  <button onClick={handleSave} className="save-button">Save</button>
                  <button onClick={() => setEditingUserIndex(null)} className="cancel-button">Cancel</button>
                </div>
              ) : (
                <>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>City:</strong> {user.city}</p>
                  <p><strong>Country:</strong> {user.country}</p>
                  <p><strong>Phone:</strong> {user.phone}</p>
                  <p><strong>Postal Code:</strong> {user.postalCode}</p>
                  <p><strong>ID Number:</strong> {user.documentNumber}</p>
                  <p><strong>Gender:</strong> {user.gender}</p>
                  <p><strong>Birth Date:</strong> {user.birthDate}</p>
                  <p><strong>Registration Time:</strong> {user.registrationTime}</p>
                  <button onClick={() => handleEdit(index)} className="edit-button">Edit</button>
                  <button onClick={() => handleDelete(index)} className="delete-button">Delete</button>
                  <button onClick={() => handlePrint(user)} className="print-button">Print</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RegisteredUsers;
