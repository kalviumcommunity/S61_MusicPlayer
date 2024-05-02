import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Singet.css";

function Update() {
    const [singers, setSingers] = useState([]);
    const [editingSinger, setEditingSinger] = useState(null); // To track which singer is being edited
    const [editedData, setEditedData] = useState({}); // Edited data state

    useEffect(() => {
        axios.get('http://localhost:3001/api/read')
            .then(response => {
                setSingers(response.data.data);
            })
            .catch(error => {
                console.log('Error fetching singers:', error);
            });
    }, []);

    const handleEdit = (singer) => {
        // Set the editingSinger state to the singer being edited
        setEditingSinger(singer);
        // Populate the editedData state with the current singer data
        setEditedData(singer);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.put(`http://localhost:3001/api/update/${editingSinger._id}`, editedData);
            // Reset editing state after successful update
            setEditingSinger(null);
            // Refresh singers list after update
            const updatedSingers = await axios.get('http://localhost:3001/api/read');
            setSingers(updatedSingers.data.data);
        } catch (error) {
            console.log('Error updating singer:', error);
        }
    };

    // Define the schema for singer properties
    const singerProperties = [
        { name: "Singer", type: "string" },
        { name: "Full Name", type: "string" },
        { name: "Birthdate", type: "date" },
        { name: "Birthplace", type: "string" },
        { name: "Genre", type: "string" },
        { name: "Famous Songs", type: "array" },
        { name: "Year", type: "string" },
        { name: "Awards", type: "object" },
        { name: "Nationality", type: "string" },
        { name: "Education", type: "string" },
        { name: "Description", type: "string" },
        { name: "Country", type: "string" }
    ];

    return (
        <div>
            <ul>
                {singers.map(singer => (
                    <div key={singer._id}>
                        <div className="singer-info">
                            <h2>{singer.Singer}</h2>
                            <p>Full Name: {singer["Full Name"]}</p>
                            <p>Birthdate: {new Date(singer.Birthdate).toLocaleDateString()}</p>
                            <p>Birthplace: {singer.Birthplace}</p>
                            <p>Genre: {singer.Genre}</p>
                            <p>Famous Songs: {singer["Famous Songs"].join(', ')}</p>
                            <p>Year: {singer.Year ? singer.Year : 'NA'}</p>
                            <p>Nationality: {singer.Nationality}</p>
                            <p>Education: {singer.Education}</p>
                            <p>Description: {singer.Description}</p>
                            <p>Country: {singer.Country}</p>
                            {/* Conditionally render edit form */}
                            {editingSinger && editingSinger._id === singer._id && (
                                <div>
                                    {/* Render input fields for all singer properties */}
                                    {singerProperties.map(property => (
                                        <input
                                            key={property.name}
                                            type="text"
                                            name={property.name}
                                            placeholder={`Enter ${property.name}`}
                                            value={editedData[property.name] || ''}
                                            onChange={handleChange}
                                        />
                                    ))}
                                    <button onClick={handleSubmit}>Update</button>
                                </div>
                            )}
                            {!editingSinger && (
                                <>
                                    <button onClick={() => handleEdit(singer)}>Edit</button>
                                    <button onClick={() => handleDelete(singer._id)}>Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export default Update;
