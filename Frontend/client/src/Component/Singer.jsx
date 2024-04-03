import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Singet.css"
import { Link } from 'react-router-dom';
import Update from './Update';


function Singer() {
    const [singer, setsinger] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3001/admin/users')
        .then(response => {
          setUsers(response.data);
        })
        .catch(error => {
          console.log('Error fetching users:', error);
        })
    },[])
  
    useEffect(() => {
      axios.get('http://localhost:3001/api/read')
        .then(response => {
          console.log(response.data)
          setsinger(response.data.data); 
        })
        .catch(error => {
          console.log('Error fetching entities:', error);
        });
    }, []); 
  
    return (
      <div>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value='AllUsers'>All Users</option>
          {users.map(user => (
            <option key={user._id} value={user.username}>{user.username}</option>
          ))}
        </select>
        <h1>All Entities</h1>
        <ul>
  {selectedUser === 'AllUsers' ?
    singer.map(singer => (
      <li key={singer._id} className="singer-item">
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
        <div className="button-container">
          <button className="update-button" onClick={() => handleUpdateSinger(singer._id)}>
            <Link to='/update'>Update</Link>
          </button>
          <button className="delete-button" onClick={() => onDelete(singer._id)}>Delete</button>
        </div>
      </li>
    )) :
    singer
      .filter(singer => singer.createdBy === selectedUser)
      .map(singer => (
        <li key={singer._id} className="singer-item">
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
          <div className="button-container">
            <button className="update-button" onClick={() => handleUpdateSinger(singer._id)}>
              <Link to='/update'>Update</Link>
            </button>
            <button className="delete-button" onClick={() => onDelete(singer._id)}>Delete</button>
          </div>
        </li>
      ))
  }
</ul>
      </div>
    );
  }
  
  export default Singer;

