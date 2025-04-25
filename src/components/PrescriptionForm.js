import React, { useState } from 'react';

const PrescriptionForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    prescriptionNumber: '',
    deliveryOption: 'pickup',
    notes: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/refill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Refill submitted successfully!');
        setFormData({
          fullName: '',
          dateOfBirth: '',
          prescriptionNumber: '',
          deliveryOption: 'pickup',
          notes: ''
        });
      } else {
        setMessage(`❌ Error: ${data.error || 'Something went wrong'}`);
      }
    } catch (err) {
      setMessage('❌ Server Error');
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>ALBOPHAR Prescription Refill</h2>
      <p style={{ textAlign: 'center', color: '#777' }}>Near Muhima Hospital – Kigali City</p>
      {message && <p style={{ color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label><br />
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required /><br />

        <label>Date of Birth:</label><br />
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required /><br />

        <label>Prescription Number:</label><br />
        <input type="text" name="prescriptionNumber" value={formData.prescriptionNumber} onChange={handleChange} required /><br />

        <label>Delivery Option:</label><br />
        <select name="deliveryOption" value={formData.deliveryOption} onChange={handleChange}>
          <option value="pickup">Pickup</option>
          <option value="delivery">Delivery</option>
        </select><br />

        <label>Additional Notes:</label><br />
        <textarea name="notes" value={formData.notes} onChange={handleChange} /><br />

        <button type="submit" style={{ marginTop: '10px' }}>Submit Refill</button>
      </form>
    </div>
  );
};

export default PrescriptionForm;
