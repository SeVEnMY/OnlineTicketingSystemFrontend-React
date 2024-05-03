import React  from 'react';
import { useState, useEffect } from 'react'; 
import { Tag, Table, Button, Modal } from 'antd'; 
import { DeleteTwoTone } from '@ant-design/icons';

import './Admin.css'; 
import axios from 'axios';

import { ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

const headers = { 'Content-Type': 'application/json', credentials: 'include'}

const { Column, ColumnGroup } = Table;

export function AllVisitors() { 
    const [visitorData, setVisitorData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/visitor/list') 
        .then((response) => response.data) 
        .then((data) => {
            setVisitorData(data.data); 
        })
    }, []);
    
    return (<ShowAllVisitors visitorData={visitorData} />)

} 

function ShowAllVisitors({visitorData}) {
    
    return (
    <Table dataSource={visitorData} style={{width: '100%'}}>
        <Column title="ID" dataIndex="v_id" key="v_id" />
        <ColumnGroup title="Name">
            <Column title="First Name" dataIndex="v_fname" key="v_fname" />
            <Column title="Middle Name" dataIndex="v_mname" key="v_mname" />
            <Column title="Last Name" dataIndex="v_lname" key="v_lname" />
        </ColumnGroup>
        <Column 
            title="Type" 
            dataIndex="v_type" 
            key="v_type"
            render = { (v_type) => {
                if (v_type == 'M') {
                    return <label>Member</label>
                } else if (v_type == 'S') {
                    return <label>Student</label>
                } else if (v_type == 'G') {
                    return <label>Group</label>
                } else {
                    return <label>Individual</label>
                }
            }
            } />
        <Column 
            title="Birth Date" 
            dataIndex="v_bdate" 
            key="v_bdate"
            render = { (v_bdate) => 
                <label>{v_bdate.substring(0, 10)}</label>
            } />
        <ColumnGroup title="Address">
            <Column title="Street" dataIndex="v_stadd" key="v_stadd" />
            <Column title="City" dataIndex="v_city" key="v_city" />
            <Column title="State" dataIndex="v_state" key="v_state" />
            <Column title="Country" dataIndex="v_country" key="v_country" />
        </ColumnGroup>
        <Column title="Email" dataIndex="v_email" key="v_email" />
        <Column title="Tel Number" dataIndex="v_telnum" key="v_telnum" />
    </Table>);
}

export function AllTickets() { 
    const [typeData, setTypeData] = useState([]);
    const [ticketData, setTicketData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/ticket/listtkttype') 
        .then((response) => response.data) 
        .then((data) => { 
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/ticket/list') 
        .then((response) => response.data) 
        .then((data) => {
            setTicketData(data.data); 
        })
    }, []); 

        
    return (<ShowAllTickets typeData={typeData} ticketData={ticketData}/>)
}

function ShowAllTickets ({typeData, ticketData}) { 
    function getType(tkttype_id) {
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].tkttype_id === tkttype_id) {
                return typeData[i].tkttype_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'tkt_id', 
            key: 'tkt_id', 
        }, {
            title: 'Type', 
            dataIndex: 'tkttype_id', 
            key: 'tkttype_id', 
            render: (_, {tkttype_id}) => {
                return <label>{getType(tkttype_id)}</label>
            }
        }, {
            title: 'Method', 
            dataIndex: 'tkt_online', 
            key: 'tkt_online', 
            render: (_, {tkt_online}) => {
                if (tkt_online === '1') {
                    return <label>online</label>
                } else {
                    return <label>onsite</label>
                }
            }
        }, {
            title: 'Visit Date', 
            dataIndex: 'tkt_visit_date', 
            key: 'tkt_visit_date', 
            render: (_, {tkt_visit_date}) => {
                return <label>{tkt_visit_date.substring(0, 10)}</label>
            }
        }, {
            title: 'Price', 
            dataIndex: 'tkt_price', 
            key: 'tkt_price', 
            render: (_, {tkt_price}) => {
                return <label>${tkt_price}</label>
            }
        }, {
            title: 'Discount', 
            dataIndex: 'tkt_discount', 
            key: 'tkt_discount', 
            render: (_, {tkt_discount}) => {
                return <label>{tkt_discount}%</label>
            }
        }, {
            title: 'Ispaid', 
            dataIndex: 'tkt_ispaid', 
            key: 'tkt_ispaid', 
            render: (_, {tkt_ispaid}) => { 
                if (tkt_ispaid === '1') {
                    return <label>Paid</label>
                } else {
                    return <label>Unpaid</label>
                }
            }
        }, 
    ];
    
    return (<Table columns={columns} dataSource={ticketData} style={{width: '100%'}}/>);
}

export function AllShows() { 
    const [typeData, setTypeData] = useState([]); 
    const [showData, setShowData] = useState([]); 

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
        
    return (<ShowAllShows typeData={typeData} showData={showData}/>)
        
}

function ShowAllShows ({ typeData, showData }) {
    function getType(shtype_id) { 
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].shtype_id === shtype_id) {
                return typeData[i].shtype_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'sh_id', 
            key: 'sh_id', 
        }, {
            title: 'Name', 
            dataIndex: 'sh_name', 
            key: 'sh_name', 
        }, {
            title: 'Type', 
            dataIndex: 'shtype_id', 
            key: 'shtype_id', 
            render: (_, {shtype_id}) => {
                return <label>{getType(shtype_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'sh_description', 
            key: 'sh_description', 
        }, {
            title: 'Start Time', 
            dataIndex: 'sh_start_time', 
            key: 'sh_start_time', 
            render: (_, {sh_start_time}) => {
                return <label>{sh_start_time.substring(11, 19)}</label>
            }
        }, {
            title: 'End Time', 
            dataIndex: 'sh_end_time', 
            key: 'sh_end_time', 
            render: (_, {sh_end_time}) => {
                return <label>{sh_end_time.substring(11, 19)}</label>
            }
        }, {
            title: 'Wheelchair Accessible', 
            dataIndex: 'sh_wheelchair_acc', 
            key: 'sh_wheelchair_acc', 
            render: (_, {sh_wheelchair_acc}) => { 
                if (sh_wheelchair_acc === '1') {
                    return <label>Allowed</label>
                } else {
                    return <label>Not Allowed</label>
                }
            }
        }, {
            title: 'Price', 
            dataIndex: 'sh_price', 
            key: 'sh_price', 
            render: (_, {sh_price}) => {
                return <label>$ {sh_price}</label>
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (_, {sh_id}) => (
                <div>
                    <Button onClick={() => handleDelete(sh_id)}>
                        <DeleteTwoTone />
                    </Button> 
                </div>
            ),
        },
    ];

    function handleDelete(sh_id) {
        confirm({
            title: '',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to delete this show?',
            onOk() {
              console.log('OK');
              axios.delete(`http://localhost:8080/show/delete?shId=${sh_id}`).then((response) => response.data) 
                .then((data) => {
                    console.log("delete complete!")
                    window.location.reload();
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }

    return (<Table columns={columns} dataSource={showData} style={{width: '100%'}}/>);
}

export function AllAttractions() { 
    const [typeData, setTypeData] = useState([]); 
    const [location, setLocation] = useState([]);
    const [attraction, setAttraction] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/attraction/listatttype') 
        .then((response) => response.data) 
        .then((data) => {
            setTypeData(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/attraction/listls') 
        .then((response) => response.data) 
        .then((data) => {
            setLocation(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/attraction/list') 
        .then((response) => response.data) 
        .then((data) => {
            setAttraction(data.data); 
        })
    }, []);
        
    return (<ShowAllAttractions typeData={typeData} location={location} attraction={attraction}/>)
        
} 

function ShowAllAttractions({typeData, location, attraction}) { 
    function getType(atttype_id) { 
        for (let i = 0; i < typeData.length; i++) {
            if (typeData[i].atttype_id === atttype_id) {
                return typeData[i].atttype_name; 
            }
        }
        return ''; 
    }

    function getLocation(ls_id) { 
        for (let i = 0; i < location.length; i++) {
            if (location[i].ls_id === ls_id) {
                return location[i].ls_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'att_id', 
            key: 'att_id', 
        }, {
            title: 'Name', 
            dataIndex: 'att_name', 
            key: 'att_name', 
        }, {
            title: 'Type', 
            dataIndex: 'atttype_id', 
            key: 'atttype_id', 
            render: (_, {atttype_id}) => {
                return <label>{getType(atttype_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'att_description', 
            key: 'att_description', 
        }, {
            title: 'Status', 
            dataIndex: 'att_status', 
            key: 'att_status', 
        }, {
            title: 'Capacity', 
            dataIndex: 'att_capacity', 
            key: 'att_capacity', 
            render: (_, {att_capacity}) => {
                return <label>{att_capacity} people</label>
            }
        }, {
            title: 'Minimum Height', 
            dataIndex: 'att_minimum_height', 
            key: 'att_minimum_height', 
            render: (_, {att_minimum_height}) => {
                return <label>{att_minimum_height} cm</label>
            }
        }, {
            title: 'Duration Time', 
            dataIndex: 'att_duration_time', 
            key: 'att_duration_time', 
            render: (_, {att_duration_time}) => {
                return <label>{att_duration_time} mins</label>
            }
        }, {
            title: 'Location Section', 
            dataIndex: 'ls_id', 
            key: 'ls_id', 
            render: (_, {ls_id}) => {
                return <label>{getLocation(ls_id)}</label>
            }
        }, {
            title: 'Action',
            key: 'action',
            render: (_, {att_id}) => (
                <div>
                    <Button onClick={() => handleDelete(att_id)}>
                        <DeleteTwoTone />
                    </Button> 
                </div>
            ),
        },
    ];

    function handleDelete(att_id) {
        confirm({
            title: '',
            icon: <ExclamationCircleFilled />,
            content: 'Do you want to delete this attraction?',
            onOk() {
              console.log('OK');
              axios.delete(`http://localhost:8080/attraction/delete?attId=${att_id}`).then((response) => response.data) 
                .then((data) => {
                    console.log("delete complete!")
                    window.location.reload();
                })
            },
            onCancel() {
              console.log('Cancel');
            },
          });
    }
    
    return (<Table columns={columns} dataSource={attraction} style={{width: '100%'}}/>);
}

export function AllStores() {
    const [category, setCategory] = useState([]); 
    const [storeData, setStoreData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/store/listctg') 
        .then((response) => response.data) 
        .then((data) => {
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

    return (<ShowAllStores category={category} storeData={storeData}/>)
}  

function ShowAllStores({category, storeData}) { 
    function getCategory(ctg_id) {
        for (let i = 0; i < category.length; i++) {
            if (category[i].ctg_id === ctg_id) {
                return category[i].ctg_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'st_id', 
            key: 'st_id', 
        }, {
            title: 'Name', 
            dataIndex: 'st_name', 
            key: 'st_name', 
        }, {
            title: 'Category', 
            dataIndex: 'ctg_id', 
            key: 'ctg_id', 
            render: (_, {ctg_id}) => {
                return <label>{getCategory(ctg_id)}</label>
            }
        }, {
            title: 'Description', 
            dataIndex: 'st_description', 
            key: 'st_description', 
        }, {
            title: 'Menu Items', 
            dataIndex: 'st_id', 
            key: 'st_id', 
            render: (_, {st_id}) => {
                return <GetMenu st_id={st_id} />
            }
        },  
    ];

    return (<Table columns={columns} dataSource={storeData} style={{width: '100%'}}/>);
} 

function GetMenu({st_id}) {
    const [menuItems, setMenuItems] = useState([]); 
    useEffect(() => {
        axios.get(`http://localhost:8080/store/getmi?stId=${st_id}`) 
        .then((response) => response.data) 
        .then((data) => { 
            setMenuItems(data.data); 
        })
    }, []); 

    return (
        <ul>
            {
                menuItems.map((item, index) => (
                    <li>{item.mi_name}: $ {item.mi_unit_price}</li>
                ))
            }
        </ul>
    );
}

export function AllParkings() {
    const [parkLot, setParkLot] = useState([]); 
    const [parking, setParking] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/parking/listpl') 
        .then((response) => response.data) 
        .then((data) => {
            setParkLot(data.data); 
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/parking/list') 
        .then((response) => response.data) 
        .then((data) => {
            setParking(data.data); 
        })
    }, []);

    return (<ShowAllParkings parkLot = {parkLot} parking = {parking} />)
    
}  

function ShowAllParkings({parkLot, parking}) {
     function getParkLot(pl_id) {
        for (let i = 0; i < parkLot.length; i++) {
            if (parkLot[i].pl_id === pl_id) {
                return parkLot[i].pl_name; 
            }
        }
        return ''; 
    }

    const columns = [
        {
            title: 'ID', 
            dataIndex: 'park_id', 
            key: 'park_id', 
        }, {
            title: 'Time in', 
            dataIndex: 'park_time_in', 
            key: 'park_time_in', 
        }, {
            title: 'Time out', 
            dataIndex: 'park_time_out', 
            key: 'park_time_out', 
        }, {
            title: 'Fee per Hour', 
            dataIndex: 'park_fee', 
            key: 'park_fee', 
            render: (_, {park_fee}) => {
                return <label>$ {park_fee}</label>
            }
        }, {
            title: 'Spot Number', 
            dataIndex: 'park_spotno', 
            key: 'park_spotno', 
        }, {
            title: 'Parking Lot', 
            dataIndex: 'pl_id', 
            key: 'pl_id', 
            render: (_, {pl_id}) => {
                return <label>{getParkLot(pl_id)}</label>
            }
        },   
    ];

    return (<Table columns={columns} dataSource={parking} style={{width: '100%'}}/>);
}


export function AllOrders() { 
    const [orderData, setOrderData] = useState([]); 

    useEffect(() => {
        axios.get('http://localhost:8080/order/list') 
        .then((response) => response.data) 
        .then((data) => {
            setOrderData(data.data); 
        })
    }, []);
    
    return (<ShowAllOrders orderData={orderData} />)
    
}

function ShowAllOrders({orderData}) {
    const columns = [
        {
            title: 'ID', 
            dataIndex: 'o_id', 
            key: 'o_id', 
        }, {
            title: 'Date', 
            dataIndex: 'o_date', 
            key: 'o_date',
            render: (_, {o_date}) => {
                return <label>{o_date.substring(0, 10)}</label>
            }
        }, {
            title: 'Quantity', 
            dataIndex: 'o_quantity', 
            key: 'o_quantity', 
        }, {
            title: 'Amount', 
            dataIndex: 'o_amount', 
            key: 'o_amount', 
        }, {
            title: 'Visitor ID', 
            dataIndex: 'v_id', 
            key: 'v_id', 
        }, {
            title: 'Payment ID', 
            dataIndex: 'pay_id', 
            key: 'pay_id', 
            render: (_, {pay_id}) => {
                if (pay_id === null) {
                    return <label>unpaid</label>
                } else {
                    return <label>{pay_id}</label>
                }
            }
        }, {
            title: 'Payment Method', 
            dataIndex: 'pay_id', 
            key: 'pay_id', 
            render: (_, {pay_id}) => {
                if (pay_id === null) {
                    return <label>none</label>
                } else {
                    return <GetPayment pay_id = {pay_id} />
                }
            }
        }, {
            title: 'Payment Time', 
            dataIndex: 'pay_id', 
            key: 'pay_id', 
            render: (_, {pay_id}) => {
                if (pay_id === null) {
                    return <label>none</label>
                } else {
                    return <GetPaymentTime pay_id = {pay_id} />
                }
            }
        }, {
            title: 'Show ID', 
            dataIndex: 'sh_id', 
            key: 'sh_id', 
            render: (_, {sh_id}) => {
                if (sh_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{sh_id}</label>
                }
            }
        }, {
            title: 'Store ID', 
            dataIndex: 'st_id', 
            key: 'st_id', 
            render: (_, {st_id}) => {
                if (st_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{st_id}</label>
                }
            }
        }, {
            title: 'Menu Item ID', 
            dataIndex: 'mi_id', 
            key: 'mi_id', 
            render: (_, {mi_id}) => {
                if (mi_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{mi_id}</label>
                }
            }
        }, {
            title: 'Parking ID', 
            dataIndex: 'park_id', 
            key: 'park_id', 
            render: (_, {park_id}) => {
                if (park_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{park_id}</label>
                }
            }
        }, {
            title: 'Ticket ID', 
            dataIndex: 'tkt_id', 
            key: 'tkt_id', 
            render: (_, {tkt_id}) => {
                if (tkt_id === null) {
                    return <label>none</label>
                } else {
                    return <label>{tkt_id}</label>
                }
            }
        },  
    ];
    
    return (<Table columns={columns} dataSource={orderData} style={{width: '100%'}}/>);
} 

function GetPayment({pay_id}) {
    const [payment, setPayment] = useState([]); 
    const [cardNumber, setCardNumber] = useState(''); 
    const [cardCredit, setCardCredit] = useState(false); 

    useEffect(() => {
        axios.get(`http://localhost:8080/payment/get?payId=${pay_id}`) 
        .then((response) => response.data) 
        .then((data) => { 
           setPayment(data.data); 
       // }, () => {
            console.log("payment method: " + data.data.pay_method); 
            if(data.data.pay_method === 'CD') {
                axios.get(`http://localhost:8080/payment/getcd?payId=${pay_id}`) 
                .then((response) => response.data) 
                .then((data) => { 
                    setCardNumber(data.data.cd_num.length >= 4 ? data.data.cd_num.slice(-4) : data.data.cd_num); 
                    setCardCredit(data.data.cd_credit === '1'); 
                    console.log("payment: " + pay_id + " credit?: " + data.data.cd_credit)
                })
            }
        })
    }, []); 

    // useEffect(() => { 
    //     if(payment.pay_method === 'CD') {
    //         axios.get(`http://localhost:8080/payment/getcd?payId=${pay_id}`) 
    //         .then((response) => response.data) 
    //         .then((data) => { 
    //             setCardNumber(data.data.cd_num.length >= 4 ? data.data.cd_num.slice(-4) : data.data.cd_num); 
    //             setCardCredit(data.data.cd_credit === '1'); 
    //             console.log("payment: " + pay_id + " credit?: " + data.data.cd_credit)
    //         })
    //     }
    // }, []); 

    return payment.pay_method === 'CA' ? <label>Cash</label> : (cardCredit? <label>Credit Card: ****{cardNumber}</label> : <label>Debit Card: ****{cardNumber}</label>)

} 

function GetPaymentTime({ pay_id }) {
    const [payTime, setPayTime] = useState(''); 

    useEffect(() => {
        axios.get(`http://localhost:8080/payment/get?payId=${pay_id}`) 
        .then((response) => response.data) 
        .then((data) => { 
            setPayTime(data.data.pay_time); 
        })
    }, []); 

    return <label>{payTime}</label>
}
