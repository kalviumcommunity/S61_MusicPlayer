import React, { forwardRef, useState } from "react";
import "./UserInput.css";

function userInput() {
  const [formData, setFormData] = useState({
    Singer: '',
    "Full Name": '',
    Birthdate: '',
    Birthplace: '',
    Genre: '',
    "Famous Songs": [],
    Year: '',
    Awards: {
      "Grammy Awards": "",
      "MTV Video Music Awards": "",
      "BET Awards": "",
    },
    Nationality: '',
    Education: '',
    Description: '',
    Country: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type == "number") {
      setFormData((prevValues) => ({
        ...prevValues,
        Awards: {
          ...prevValues.Awards,
          [name]: value,
        },
      }));
    } else if (type === "checkbox") {
      const updatedFormData = {
        ...formData,
        [name]: [...formData[name], value],
      };
      setFormData(updatedFormData);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          "Famous Songs": formData["Famous Songs"].split(","),
          Awards: {
            "Grammy Awards" : parseInt(formData.Awards["Grammy Awards"]),
            "MTV Video Music Awards": parseInt(formData.Awards["MTV Video Music Awards"]),
            "BET Awards": parseInt(formData.Awards["BET Awards"]),
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add singer');
      }

      const data = await response.json();
      console.log('Singer added successfully:', data);

      // Reset the form after successful submission
      setFormData({
        Singer: '',
        "Full Name": '',
        Birthdate: '',
        Birthplace: '',
        Genre: '',
        "Famous Songs": [],
        Year: '',
        Awards: {
          "Grammy Awards": 0,
          "MTV Video Music Awards": 0,
          "BET Awards": 0,
        },
        Nationality: '',
        Education: '',
        Description: '',
        Country: '',
      });

      // Redirect or update the UI as needed
    } catch (error) {
      console.error('Error adding singer:', error.message);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Add Singer</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Singer:</label>
          <input
            type="text"
            className="form-control"
            name="Singer"
            value={formData.Singer}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            name="Full Name"
            value={formData["Full Name"]}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birthdate:</label>
          <input
            type="date"
            className="form-control"
            name="Birthdate"
            value={formData.Birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Birthplace:</label>
          <input
            type="text"
            className="form-control"
            name="Birthplace"
            value={formData.Birthplace}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre:</label>
          <input
            type="text"
            className="form-control"
            name="Genre"
            value={formData.Genre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Famous Songs:</label>
          <input
            type="text"
            className="form-control"
            name="Famous Songs"
            value={formData["Famous Songs"]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input
            type="text"
            className="form-control"
            name="Year"
            value={formData.Year}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Grammy Awards:</label>
          <input
            type="number"
            className="form-control"
            name="Grammy Awards"
            value={formData.Awards["Grammy Awards"]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">MTV Video Music Awards:</label>
          <input
            type="number"
            className="form-control"
            name="MTV Video Music Awards"
            value={formData.Awards["MTV Video Music Awards"]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">BET Awards:</label>
          <input
            type="number"
            className="form-control"
            name="BET Awards"
            value={formData.Awards["BET Awards"]}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nationality:</label>
          <input
            type="text"
            className="form-control"
            name="Nationality"
            value={formData.Nationality}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Education:</label>
          <input
            type="text"
            className="form-control"
            name="Education"
            value={formData.Education}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description:</label>
          <input
            type="text"
            className="form-control"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Country:</label>
          <input
            type="text"
            className="form-control"
            name="Country"
            value={formData.Country}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default userInput;
