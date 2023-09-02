import React, { useState } from 'react';

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    city: '',
    pincode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    dob: '',
    city: '',
    pincode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Perform validation here
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else {
      newErrors.name = '';
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    } else {
      newErrors.email = '';
    }

    // Date of Birth validation
    if (!formData.dob) {
      newErrors.dob = 'Date of Birth is required';
    } else {
      newErrors.dob = '';
    }

    // City validation
    if (!formData.city) {
      newErrors.city = 'City is required';
    } else {
      newErrors.city = '';
    }

    // Pincode validation
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    } else {
      newErrors.pincode = '';
    }

    setErrors(newErrors);

    // If there are no errors, you can submit the form or save the data.
    if (Object.values(newErrors).every((error) => !error)) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(formData);
    localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
    }
  };

  return (
    <div className='registration-container'>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit} className='registration-form'> 
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="">Select City</option>
            <option value="New York">Delhi</option>
            <option value="Los Angeles">Mumbai</option>
            <option value="Chicago">Bangalore</option>
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div>
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          {errors.pincode && <span className="error">{errors.pincode}</span>}
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
