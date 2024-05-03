import React from 'react'; 
import { Link } from 'react-router-dom'; 
import { useState, useEffect } from 'react'; 
import { Button } from 'antd';
import './MyOrders.css';
import axios from 'axios'; 

export function OrderDisplay() { 
    const [orderData, setOrderData] = useState([]); 
    
    useEffect(() => {
        axios.get('http://localhost:8080/order/visitlist') 
        .then((response) => response.data) 
        .then((data) => {
            setOrderData(data.data); 
        })
    }, [])
    
    return <Order orderData={orderData} />
} 

const allOptions = [{id: 0, type: 'All'}, {id: 1, type: 'Ticket'}, {id: 2, type: 'Store'}, 
    {id: 3, type: 'Show'}, {id: 4, type: 'Parking'}]; 

const ticketTypes = ['', 'child', 'adult', 'senior']; 

function Order({orderData}) {
    const [selectedOption, setSelectedOption] = useState(0); 
    
    function handleChange(e) {
        setSelectedOption(e.target.value); 
    }

    return (
        <div>
            <div style = {{marginTop: 30, marginBottom: 20}}>
                <label style = {{fontSize: 20, color: '#263956', fontWeight: 'bold'}}>Choose order type: </label> 
                <select name = 'selectedOption' defaultValue = 'All' onChange = {handleChange} style = {{fontSize: 20}}> {
                    allOptions.map( option => (
                        <option key = {option.id} value = {option.id}> {option.type} </option>))
                }
                </select>
            </div>
            <div>
            {
                orderData.map( order => {
                    let typeid = 0;
                    if (order.tkt_id !== null) {
                        typeid = 1; 
                    } else if (order.st_id !== null) {
                        typeid = 2;
                    } else if (order.sh_id !== null) {
                        typeid = 3;
                    } else if (order.park_id !== null) {
                        typeid = 4;
                    }
                
                    if (selectedOption == 0 || selectedOption == typeid) {
                        return (
                            <div className='orderContainer'>
                                <div className='orderContainer1'> 
                                    <div>
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order placed on</label> 
                                        <label style ={{color: '#7A7D7D', fontSize: 16, marginLeft: 20}}>{order.o_date.substring(0, 10)}</label>
                                    </div> 
                                    <div style={{position: 'absolute', right: 20}}> 
                                        <label style ={{color: '#868989', fontSize: 14, marginLeft: 20}}>Order #{order.o_id}</label> 
                                    </div>
                                </div>
                                <div className='orderContainer2'> 
                                    <div>
                                        <img className='orderImage' src = {require(`./images/order/${typeid}.jpg`)}></img>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', width: 600, marginLeft: 40, alignItems: 'center'}}>
                                        <label style={{marginTop: 5, fontSize: 22, color: '#1C468E', fontWeight: 'bold'}}>{allOptions[typeid].type} Order</label>
                                        {
                                            typeid === 1 && <GetTicketDescription tkt_id={order.tkt_id} />
                                        }
                                        {
                                            typeid === 2 && <GetStoreDescription st_id={order.st_id} mi_id={order.mi_id} />
                                        }
                                        {
                                            typeid === 3 && <GetShowDescription sh_id={order.sh_id} />
                                        }
                                        {
                                            typeid === 4 && <GetParkDescription park_id={order.park_id} />
                                        }
                                        <ViewDetail index = {typeid}/>
                                    </div>
                                    <div style=
                                        {{display: 'flex', flexDirection: 'column', paddingLeft: 10, alignItems: 'left', position: 'absolute', right: 10, borderLeft: 'dashed'}}>
                                        <label style={{fontSize: 16}}>Order Summary: </label>
                                        <label style={{fontSize: 14}}>Quantity: {order.o_quantity}</label>
                                        <label style={{fontSize: 14}}>Total: $ {order.o_amount}</label>
                                        <GetPayment o_id = {order.o_id} />
                                    </div>
                                </div>
                                <div className='orderContainer3'>

                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            }
            </div>
        </div>
    )
}

function GetTicketDescription({tkt_id}){ 
    const [ticketType, setTicketType] = useState(2); 
    const [discount, setDiscount] = useState(0); 
    
    useEffect(() => {
        axios.get(`http://localhost:8080/ticket/get?tktId=${tkt_id}`) 
        .then((response) => response.data) 
        .then((data) => {
            setTicketType(data.data.tkttype_id); 
            setDiscount(data.data.tkt_discount);
        })
    } ,[]); 

    return <label style={{marginTop: 10, marginBottom: 10, fontSize: 18}}>{ticketTypes[ticketType]} ticket with {discount}% discount</label>
}

function GetStoreDescription({st_id, mi_id}) { 
    const [menuItems, setMenuItems] = useState([]); 
    const [item, setItem] = useState('');
    const [store, setStore] = useState(''); 

    useEffect(() => {
        getMenu(); 
        getStore(); 
    } ,[]); 

    useEffect(() => {
        //console.log(menuItems);
    }, [menuItems]);

    useEffect(() => {
        //console.log(store); 
    }, [store]);

    useEffect(() => {
        //console.log(item); 
    }, [item]);

    function getMenu() {
        axios.get(`http://localhost:8080/store/listmi`) 
        .then((response) => response.data) 
        .then((data) => {
            setMenuItems(data.data); 
            setItem(data.data[mi_id - 1].mi_name); 
        })
    }

    function getStore() {
        axios.get(`http://localhost:8080/store/get?stId=${st_id}`) 
        .then((response) => response.data) 
        .then((data) => {
            setStore(data.data.st_name); 
        })
    }
    return <labeL style={{marginTop: 10, marginBottom: 10, fontSize: 18}}>{item} in {store}</labeL>
}

function GetShowDescription({sh_id}) {
    const [showName, setShowName] = useState(''); 
    const [description, setDescription] = useState(''); 
    useEffect(() => {
        getShow();
    } ,[]);
    
    useEffect(() => {
        //console.log(showName); 
    } ,[showName]); 

    useEffect(() => {
        //console.log(description); 
    } ,[description]); 

    function getShow() {
        axios.get(`http://localhost:8080/show/get?shId=${sh_id}`) 
        .then((response) => response.data) 
        .then((data) => {
            setShowName(data.data.sh_name); 
            setDescription(data.data.sh_description); 
        })
    }

    return <label style={{marginTop: 10, marginBottom: 10, fontSize: 18}}>{showName}: {description}</label>
} 

function GetParkDescription({park_id}) {
    const [parkLots, setParkLots] = useState([]); 
    //const [lotId, setLotId] = useState(0); 
    const [lotName, setLotName] = useState('');
    const [timeIn, setTimeIn] = useState(''); 
    const [timeOut, setTimeOut] = useState(''); 
    
    useEffect(() => {
        getParking(); 
    } ,[]); 

    useEffect(() => {
        //console.log("parkLots: " + parkLots); 
    }, [parkLots]);

    useEffect(() => {
        //console.log(timeIn); 
    }, [timeIn]);

    useEffect(() => {
        //console.log(timeOut); 
    }, [timeOut]); 

    useEffect(() => {
        //console.log(lotName); 
    }, [lotName]); 


    function getParking() {
        axios.get(`http://localhost:8080/parking/get?parkId=${park_id}`) 
            .then((response) => response.data) 
            .then((data1) => {
                //setLotId(data1.data.pl_id);
                setTimeIn(data1.data.park_time_in); 
                setTimeOut(data1.data.park_time_out); 
                axios.get(`http://localhost:8080/parking/listpl`) 
                .then((response) => response.data) 
                .then((data2) => {
                    setParkLots(data2.data); 
                    setLotName(data2.data[data1.data.pl_id - 1].pl_name)
                }) 
            }) 
    }

    return <label style={{marginTop: 10, marginBottom: 10, fontSize: 18}}>{lotName}: {timeIn} - {timeOut}</label>
}

function GetPayment({o_id}) {
    const [payment, setPayment] = useState([]); 
    const [cardNumber, setCardNumber] = useState(''); 
    const [cardCredit, setCardCredit] = useState(false); 
    useEffect(() => {
        console.log("order id: " + o_id);
        axios.get(`http://localhost:8080/payment/getbyorder?oId=${o_id}`) 
        .then((response) => response.data) 
        .then((data) => {
            setPayment(data.data); 
            //console.log("payment: " + data.data[0].pay_id)
            if(data.data.length > 0 && data.data[0].pay_method === 'CD') {
                axios.get(`http://localhost:8080/payment/getcd?payId=${data.data[0].pay_id}`) 
                .then((response) => response.data) 
                .then((data) => { 
                    setCardNumber(data.data.cd_num.length >= 4 ? data.data.cd_num.slice(-4) : data.data.cd_num); 
                    setCardCredit(data.data.cd_credit === '1'); 
                    console.log("card: " + cardNumber + " credit?: " + data.data.cd_credit)
                })
            }
        })
    } ,[]); 
    if (payment.length === 0) {
        return <label style={{fontSize: 14}}>Payment: Unpaid</label>
    } else if (payment[0].pay_method === 'CA') {
        return <label style={{fontSize: 14}}>Payment: Cash</label>
    } else if (cardCredit){
        return <label style={{fontSize: 14}}>Credit Card: ****{cardNumber}</label>
    } else {
        return <label style={{fontSize: 14}}>Dedit Card: ****{cardNumber}</label>
    }
}

function ViewDetail({index}) { 
    if (index === 1) {
        return (<Link to = '/book'>
            <Button>Buy Again</Button>
        </Link>)
    } else if (index === 2) {
        return (<Link to = '/stores'>
            <Button>View More Details</Button>
        </Link>)
    } else if (index === 3) {
        return (<Link to = '/shows'>
            <Button>View More Details</Button>
        </Link>)
    } else {
        return (<div></div>)
    }
}
