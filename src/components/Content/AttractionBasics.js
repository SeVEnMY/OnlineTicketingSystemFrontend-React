import React from 'react';
import { useState, useEffect } from 'react'; 

import './Attractions.css'; 
import axios from 'axios'; 

//axios.defaults.withCredentials = true; 

const headers = { 'Content-Type': 'application/json', credentials: 'include'}

export function AttractionDisplay() { 
    const [typeData, setTypeData] = useState([]); 
    const [attraction, setAttraction] = useState([]); 
    const [location, setLocation] = useState([]); 
  
    useEffect(() => {
      axios.get('http://localhost:8080/attraction/listatttype')
      .then((response) => response.data) 
      .then((data) => {
          console.log("raw type data: " + data.data)
          setTypeData(data.data); 
      })
    }, []);

    useEffect(() => {
      axios.get('http://localhost:8080/attraction/list')
      .then((response) => response.data) 
      .then((data) => {
          setAttraction(data.data); 
      })
    }, [])

    useEffect(() => {
      axios.get('http://localhost:8080/attraction/listls') 
      .then((response) => response.data) 
      .then((data) => {
          setLocation(data.data); 
      })
    }, [])
    
    console.log("typeData: " + typeData)
    return (
      <div>
        {
          console.log("attractions refresh")
        }
          <TabGroup typeData={typeData} attraction={attraction} location={location}/>
      </div>
    )
}

function TabGroup({typeData, attraction, location}) {
    const [activeType, setActiveType] = useState(1); 
  
    function getSection(ls_id) {
      for (let i = 0; i < location.length; i++) {
        if (location[i].ls_id === ls_id) {
          return location[i].ls_name; 
        }
      }
      return '';
    }

    return (
      <div className='tabGroupBox'>
        <div style={{displya: 'flex'}}>
          {typeData.map((type, index) => (
            <button 
              className='tab'
              key={index}
              onClick={() => setActiveType(type.atttype_id)} 
              style = {{fontSize: 22, fontStyle: 'bold', color: '#253A56'}}
            >
              {type.atttype_name}
            </button>
          ))}
        </div>
        <div className='tabContentBox'>
          <ul>
            {
              attraction.map((att, index) => { 
                if (att.atttype_id === activeType) {
                  return (
                  <div style = {{display: 'flex', alignItems: 'center', fontSize: 18}}> 
                    <img className='attractionImage' src = {require(`./images/attraction/${att.att_name}.jpg`)} alt = {att.att_name}></img> 
                    <div className='attractionDisplay'>
                      <div className='attractionDistance'>
                        <h4 style = {{marginBottom: 2, color: '#1C468E', fontSize: 22}}>{att.att_name}</h4> 
                      </div>
                      <label className='attractionDistance'>{att.att_description}</label>
                      <label className='attractionDistance'>Location Section: {getSection(att.ls_id)}</label>
                      <label className='attractionDistance'>Status: {att.att_status}</label>
                      <label className='attractionDistance'>About {att.att_duration_time} mins</label>
                      <div className='attractionDistance'>
                        <label>Capacity: {att.att_capacity} people</label>
                        <label style = {{marginLeft: 20}}>Height Limitation: {att.att_minimum_height} cm</label>
                      </div>
                    </div>
                  </div>)
                } else {
                  return null; 
                }
                
              })
            }
          </ul>
        </div>
      </div>
    );
}
  