import React from 'react'; 
import { useState, useEffect } from 'react'; 
import Slider from "react-slick"; 
import './Shows.css';
import axios from 'axios';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

//not changed by database
export function ShowDisplay() { 
    const [typeData, setTypeData] = useState([]); 
    const [showData, setShowData] = useState([]); 
    const [currentImg, setCurrentImg] = useState(0);      
    const settings = {
        dots: true, //show the dots
        infinite: true, 
        autoplay: true, //3000 ms
        autoplaySpeed: 1500,
        speed: 500, 
        slidesToShow: 3, //show 3 images
        slidesToScroll: 1,
        afterChange: (index) => setCurrentImg(index),
      }; 

    useEffect(() => {
        axios.get('http://localhost:8080/show/listshtype') 
        .then((response) => response.data) 
        .then((data) => { 
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/show/list') 
        .then((response) => response.data) 
        .then((data) => {
            setShowData(data.data); 
        })
    }, []);

    return (
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <div>
                <Slider {...settings}>
                    {
                        typeData.map(( type, index ) => { 
                            if (((type.shtype_id + 4)%5) === (currentImg + 1)%5) {
                                return (<div style = {{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                    <h2 style = {{color: '#253A56'}}>{type.shtype_name}</h2>
                                    <a onClick={() => scrollToAnchor(`jumpTo${type.shtype_name}`) } >
                                    <img src={require(`./images/show/${type.shtype_name}.jpg`)} alt={type.shtype_name} className = 'middleImage'/>
                                    </a>
                                </div>);
                            } else {
                                return (<div>
                                    <img id = 'normal' src={require(`./images/show/${type.shtype_name}.jpg`)} alt={type.shtype_name} className = 'sideImage' 
                                    onClick = {() => {document.getElementById('normal').className = 'sideImage'}}/> 
                                </div>);
                            }
                        })
                    }
                </Slider>
            </div>
            <div style = {{marginLeft: 50, marginRight: 50, marginTop: 50}}>
                <ShowBlock typeData={typeData} showData={showData}/>
            </div>
        </div>
    );
}

function ShowBlock({typeData, showData}) {
    return (
        <div> 
            <ul>
            {
                typeData.map(( type, index ) => (
                    <div>
                        <ShowBar key = {index} showType = {type.shtype_name} showData = {showData} />
                        <br />
                    </div>
                ))
            }
            </ul>
        </div>
    )
}

function ShowBar({showType, showData}) {
    return (
        <div>
            <a id = {`jumpTo${showType}`}></a>
            <h2 style = {{marginBottom: 5, color: '#1C468E'}}>{showType}</h2>
                {
                    showData.map(( show ) => (
                        <div style = {{fontSize: 18}}>
                            <h4 style = {{marginBottom: 2,color: '#1C468E'}}>{show.sh_name}: {show.sh_description}</h4>
                            <br />
                            <label>Show Time: {show.sh_start_time.substring(11, 19)} - {show.sh_end_time.substring(11, 19)}</label>
                            <br />
                            <label>Price: ${show.sh_price}</label>
                            <br />
                            <lable>Wheelchair Accessible: {show.sh_wheelchair_acc == 1 ? 'Yes' : 'No'}</lable>
                        </div>
                    ))
                }
        </div>
    );
}

function scrollToAnchor (anchorName) {
    if (anchorName) {
        let anchorElement = document.getElementById(anchorName);
        if(anchorElement) { anchorElement.scrollIntoView(); }
    }
}