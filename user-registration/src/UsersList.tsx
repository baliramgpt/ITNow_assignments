import React, { useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  dob: string;
  city: string;
  pincode: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Explicitly specify the User type
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    // Retrieve user data from local storage
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list-container"> {/* Apply the container class */}
      <h2>User List</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>{user.city}</td>
              <td>{user.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
