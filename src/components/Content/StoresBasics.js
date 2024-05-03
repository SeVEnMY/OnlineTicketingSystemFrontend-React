import React from 'react'; 
import { useState, useEffect } from 'react'; 
import Slider from "react-slick"; 

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Stores.css';  
import axios from 'axios';

export function StoreDisplay() { 
    const [category, setCategory] = useState([]); 
    const [storeData, setStoreData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/store/listctg') 
        .then((response) => response.data) 
        .then((data) => {
            console.log("get category")
            setCategory(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/store/list') 
        .then((response) => response.data) 
        .then((data) => {
            setStoreData(data.data); 
        })
    }, []); 

    // for (let i = 0; i < storeData.length; i++) {
    //     let store = storeData[i]; 
    //     useEffect(() => {
    //         fetch(`http://localhost:8080/store/getmi?stId=${store.st_id}`) 
    //         .then((response) => response.json()) 
    //         .then((data) => {
    //             setMenuItems([].concat(menuItems, data.data)); 
    //             //console.log("menu items in data: " + data.data);
    //         })
    //     });
    // }

    return (
        <div style = {{display: 'flex', flexDirection: 'column'}}>
            <ul>
            {
                category.map((ctg, index) => (
                    <div key = {index}>
                        <h2 style={{marginTop: 50, color: '#253A56'}}>{ctg.ctg_name}</h2>
                        <StoreBar ctg_id = {ctg.ctg_id} storeData={storeData}/>
                    </div>
                ))
            }
            </ul>
        </div>
    );
} 

function StoreBar({ctg_id, storeData}) {   
    //console.log("category: " + ctg_id);  
    return (
    <div> 
        {
            storeData.map((store, index) => { 
                if (store.ctg_id === ctg_id) { 
                    //get menu items in this store 
                    return (
                        <div>
                            <h3 style={{marginTop: 20, color: '#1C468E'}}>{store.st_name}</h3> 
                            {
                                <GetMenu st_id = {store.st_id}/>
                            }
                    </div>)
                } else {
                    return <div></div>
                }
            })
        }
    </div>);
} 

function GetMenu({st_id}) { 
    const [menuItems, setMenuItems] = useState([]); 
    const [count, setCount] = useState(0); 
    const settings = {
        dots: true, //show the dots
        infinite: true, 
        autoplay: true, //3000 ms
        autoplaySpeed: 1500,
        speed: 500, 
        slidesToShow: 3, //show 3 images
        slidesToScroll: 1
    }; 

    useEffect(() => {
        axios.get(`http://localhost:8080/store/getmi?stId=${st_id}`) 
        .then((response) => response.data) 
        .then((data) => {
            setMenuItems(data.data); 
            setCount(menuItems.length); 
        }, [])
    });  

    if (count >= 3) {
        return (
            <Slider {...settings}>
            {
                menuItems.map((item, index) => {
                    return(
                        <div key = {index} style = {{border: 0}}>
                            <img src={require(`./images/menuitem/${item.mi_name}.jpg`)} alt={item.mi_name} className = 'itemImage1'/>
                            <label>{item.mi_name} ${item.mi_unit_price}</label>
                        </div>)
                })
            }
            </Slider>
        ); 
    } else if (count == 2) {
        return (
            <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {
                    menuItems.map((item, index) => 
                    <div key = {index} className='menu'>
                        <img src={require(`./images/menuitem/${item.mi_name}.jpg`)} alt={item.mi_name} className = 'itemImage2'/>
                        <label>{item.mi_name} ${item.mi_unit_price}</label>
                    </div>)
                }
            </div>);
    }
    return (
    <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {
            menuItems.map((item, index) => 
            <div key = {index} className='menu'>
                <img src={require(`./images/menuitem/${item.mi_name}.jpg`)} alt={item.mi_name} className = 'itemImage3'/>
                <label>{item.mi_name} ${item.mi_unit_price}</label>
            </div>)
        }
    </div>);
}
