import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Singet.css"


function Singer() {
    const [singer, setsinger] = useState([]);
  
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
        <h1>All Entities</h1>
        <ul>
          {singer.map(singer => (
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
          </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Singer;