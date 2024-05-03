import React, { useState, useEffect }  from 'react';
import { Link } from 'react-router-dom'; 
import { DatePicker } from 'antd';
import { Button, Steps, Result, Radio, Form } from 'antd';
import { Input } from 'antd'; 
import { Alert } from 'antd';
import { Home } from '../Navbar/Home'; 
import './BookTickets.css'; 
import axios from 'axios';

const steps = ['Book a ticket', 'Make a payment', 'Done!'] 
const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
}));

const holidays = ['12-24', '12-25']

const ticketTypes = ['', 'child', 'adult', 'senior'] 

const headers = { 'Content-Type': 'application/json', credentials: 'include'} 

export class BookDisplay extends React.Component { 
    constructor () {
        super(); 
        this.state = {
            step: 0, 
            visitDate: null, 
            visitDateStr: '', 
            alertMessage: '', 
            showAlert: false, 
            online: 1, 
            isPaid: 0, 
            price: 100, 
            amount: 100, //price is the original price of ticket, amount is the price after discount
            discount: 5, 
            ticketType: 2, 
            birthDate: null, 
            birthDateStr: '', 
            ticketId: 0,
            orderId: 0, 
            cardName: '', 
            cardNumber: '', 
            expireDate: null, 
            expireDateStr: '', 
            cvv: '', 
            credit: '', 
            addCard: false, 
            paymentId: 0, 
            visitorId: 0, 
            age: 0, 
            visitorType: 'I', 
            numPurchased: 0,
            memberEndDate: '', 

        }

        this.handleVisitDate = this.handleVisitDate.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePay = this.handlePay.bind(this); 
        this.handleCardName = this.handleCardName.bind(this);
        this.handleCardNumber = this.handleCardNumber.bind(this); 
        this.handleExDate = this.handleExDate.bind(this);
        this.handleCvv = this.handleCvv.bind(this);
        this.handleCredit = this.handleCredit.bind(this); 
    } 

    getVisitorId() {
        axios.get(`http://localhost:8080/account/getid`)
        .then(response => response.data)
        .then(data => {
            this.setState({ visitorId: data.data }, () => {
                // console.log("visitor id: " + this.state.visitorId); 
                this.calculateDiscount(); 
            })
        });

    }

    calculateDiscount() {
        if(this.state.visitDate !== null) { 
            axios.get('http://localhost:8080/account/profile')
                .then(response => response.data)
                .then(data => {
                    this.setState({ 
                        visitorType: data.data.vtype, 
                        numPurchased: data.data.mnumPurchased, 
                        memberEndDate: data.data.mendDate, 
                    }, () => {
                        // console.log("visitor type: " + this.state.visitorType); 
                        // console.log("number purchased: " + this.state.numPurchased); 
                        // console.log("member end date: " + this.state.memberEndDate); 
                        axios.get(`http://localhost:8080/account/getage`)
                        .then(response => response.data)
                        .then(data => {
                            this.setState({ age: data.data}, () => {
                                // console.log("visitor age: " + this.state.age); 
                                //default discount: 5%
                                this.getTicketType();
                                //weekends
                                const date = new Date(this.state.visitDate)
                                if (date.getDay() % 6 === 0) {
                                    this.setState({
                                        discount: 0
                                    }, () => {
                                        // console.log("weekends discount: " + this.state.discount); 
                                        this.addTicket(); 
                                    }) 
                                    return; 
                                }
                                //holidays
                                const str = (date.getMonth()+1) + "-" + date.getDate()
                                if (holidays.includes(str)) {
                                    this.setState({
                                        discount: 0
                                    }, () => {
                                        // console.log("holidays discount: " + this.state.discount); 
                                        this.addTicket(); 
                                    }) 
                                    return; 
                                }
                                this.typeDiscount();
                            })
                        }); 
                    })
                }); 
        } 
    }

    getTicketType() {
        if (this.state.age < 7) {
            this.setState({
                ticketType: 1
            }, () => {
                // console.log("ticket type: " + this.state.ticketType)
            }) 
        } else if (this.state.age > 60) {
            this.setState({
                ticketType: 3
            }, () => {
                // console.log("ticket type: " + this.state.ticketType)
            }) 
        } 
    } 

    typeDiscount() { 
        if (this.state.age < 7 || this.state.age > 60) {
            this.setState({
                discount: this.state.discount + 15
            }, () => {
                // console.log("children or senior discount: " + this.state.discount); 
                this.memberDiscount(); 
            }) 
        } else {
            this.memberDiscount();
        }
    }

    memberDiscount() { 
        //member discoutn: 10%
        if (this.state.visitorType === 'M' && Date.parse(this.state.memberEndDate.substring(0, 10)) > Date.parse(this.state.visitDateStr) && this.state.numPurchased < 5) {
            this.setState({
                discount: this.state.discount + 10
            }, () => {
                // console.log("member discount: " + this.state.discount); 
                this.addTicket(); 
                //update the number purchased in member 
                axios.put(`http://localhost:8080/visitor/updatenumberp?vId=${this.state.visitorId}&mNumPurchased=${this.state.numPurchased + 1}`, headers)
                    .then(response => response.data); 
            }) 
        } else {
            // console.log("member end date: " + this.state.memberEndDate.substring(0, 10));
            // console.log("visit date: " + this.state.visitDateStr); 
            // console.log("validate: " + this.state.visitorType);
            // console.log("no member discount: " + this.state.discount); 
            this.addTicket(); 
        }
    } 

    addTicket() {
        this.setState({
            amount: this.state.price * (1 - this.state.discount * 0.01)
        }, () => {
            axios.post(`http://localhost:8080/ticket/add?tktOnline=1&tktVisitDate=${this.state.visitDateStr}&tktPrice=${this.state.price}&tktDiscount=${this.state.discount}&tktIspaid=0&tktTypeId=${this.state.ticketType}`, headers)
            .then(response => response.data)
            .then(data => {
                this.setState({ ticketId: data }, () => { 
                    console.log("ticket id: " + this.state.ticketId); 
                    const date = new Date(); 
                    const str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
                    axios.post(`http://localhost:8080/order/createorder?oDate=${str}&oQuantity=1&oAmount=${this.state.amount}&vId=${this.state.visitorId}&tktId=${this.state.ticketId}`, headers)
                    .then(response => response.data)
                    .then(data => {
                        this.setState({ orderId: data.data }, () => {
                            console.log("order id: " + this.state.orderId) 
                        })
                    });
                });  
            });
        })

    }

    addPayment() {
        if (this.state.addCard) {
            // console.log("try to add card"); 
            const date = new Date(); 
            const str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
            axios.post(`http://localhost:8080/payment/addcd?payTime=${str}&payAmount=${this.state.amount}&payMethod=${'CD'}&cdName=${this.state.cardName}&cdNum=${this.state.cardNumber}&cdExDate=${this.state.expireDateStr}&cdCvv=${this.state.cvv}&cdCredit=${this.state.credit}`, headers)
                .then(response => response.data)
                .then(data => {
                    console.log("add payment successfully"); 
                    this.setState({ paymentId: data }, () => {
                        console.log("payment id: " + this.state.paymentId); 
                        axios.put(`http://localhost:8080/order/updatepayment?oId=${this.state.orderId}&payId=${this.state.paymentId}`, headers)
                        .then(response => response.data)
                        .then(data => {
                            console.log("update order"); 
                            axios.put(`http://localhost:8080/ticket/payticket?tktId=${this.state.ticketId}`, headers)
                            .then(response => response.data)
                            .then(data => {
                                console.log("update ticket");   
                            });
                        });
                    }) 

                });
        }
    }

    //step 1
    handleVisitDate(date, dateString) { 
        this.setState ({
            visitDate: date,
            visitDateStr: dateString
        }, () => {
            // console.log(this.state.visitDate); 
            // console.log(this.state.visitDateStr);
        })
    }

    handleSubmit() {
        /* post data to backend ==> add ticket by account ==> unpaid*/ 
        const now = new Date();
        if (this.state.visitDate == null || this.state.visitDate < now) { 
            this.setState ({
                alertMessage: "You should select a visit date from now on.", 
                showAlert: true, 
            })
        } else {
            this.setState ({
                showAlert: false, 
                step: 1,  
            })
            this.getVisitorId(); 
        } 
    }  

    //step 2
    handleCardName(e) {
        this.setState ({
            cardName: e.target.value.trim()
        })
    } 

    handleCardNumber(e) {
        this.setState ({
            cardNumber: e.target.value.trim()
        })
    }

    handleExDate = (date, dateString) => {
        this.setState ({
            exDate: date,
            exDateStr: dateString
        }) 
    } 

    handleCvv(e) {
        this.setState ({
            cvv: e.target.value.trim()
        })
    }

    handleCredit(e) {
        this.setState ({
            credit: e.target.value
        })
    }

    handlePay() { 
        const now = new Date(); 
        if (this.state.cardName === '' || this.state.cardNumber === '' || this.state.cvv === '') {
            this.setState ({
                alertMessage: "The card information cannot be null. Please check.", 
                showAlert: true
            })
        } else if (this.state.exDate === null || this.state.exDate <= now) {
            this.setState ({
                alertMessage: "The card is expired. Please check the card information.", 
                showAlert: true
            })
        } else {
            this.setState ({
                step: 2, 
                addCard: true
            }, () => {
                console.log("addCard: " + this.state.addCard); 
                this.addPayment(); 
            })
        }
    }  

render() {
    return (
        <div className='subbody'> 
            <Steps current={this.state.step} items={items} 
                style = {{marginTop: 20}}/>
            {this.state.step === 0 && (
            <div className='bookBox'>
                <h2 style = {{color: '#0367D9', fontSize: 24, fontStyle: 'bold', marginTop: 20}}>
                    Welcome to Wonderful Land!
                </h2>
                <label style = {{fontSize: 20}}> 
                    Which day would you like to visit? 
                </label>
                <DatePicker 
                    format='YYYY-MM-DD' 
                    onChange={this.handleVisitDate}
                    style = {{marginTop: 20}}/> 
                {
                    (this.state.showAlert) ? (
                        <Alert
                            message="Error"
                            description={this.state.alertMessage}
                            type="error"
                            showIcon 
                            style = {{marginTop: 30}}
                        />
                    ) : null
                }
                <Button onClick = {this.handleSubmit} style={{marginTop: 30}}>Submit</Button>     
            </div>)}

            {this.state.step === 1 && (
                <div className='bookBox'> 
                    
                    <label style = {{marginTop: 20, fontSize: 20, fontStyle: 'bold'}}>Book Summary</label> 
                    <div className='paySummary'>
                        <label style = {{marginLeft: 30, marginTop: 10}}>Ticket Price: ${this.state.price}</label>
                        <label style = {{marginLeft: 30, marginTop: 10}}>Ticket Type: {ticketTypes[this.state.ticketType]}</label>
                        <label style = {{marginLeft: 30, marginTop: 10}}>Ticket Discount: {this.state.discount}%</label>
                        <label style = {{marginLeft: 30, marginTop: 10}}>Total Amount: ${this.state.amount}</label> 
                    </div>
                    <Form labelCol={{
                            span: 9,
                            }}
                            wrapperCol={{
                            span: 24,
                            }}
                            layout="horizontal" 
                            style = {{marginTop: 30}}>
                        <Form.Item label="Card Name">
                            <Input placeholder="card name" onChange = {this.handleCardName}/>
                        </Form.Item>
                        <Form.Item label="Card Number">
                            <Input placeholder="card number" onChange = {this.handleCardNumber}/>
                        </Form.Item>
                        <Form.Item label="Expire Date">
                            <DatePicker 
                                format='YYYY-MM-DD' 
                                onChange={this.handleExDate}/>
                        </Form.Item> 
                        <Form.Item label="CVV">
                            <Input placeholder="security code" onChange = {this.handleCvv}/>
                        </Form.Item>
                        <Form.Item label="Credit">
                            <Radio.Group onChange={this.handleCredit} defaultValue={"1"}>
                                <Radio value="1"> Credit </Radio>
                                <Radio value="0"> Debit </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form> 
                    {
                        (this.state.showAlert) ? (
                            <Alert
                                message="Error"
                                description={this.state.alertMessage}
                                type="error"
                                showIcon 
                                style = {{marginTop: 30}}
                            />
                        ) : null
                    }
                    <Button onClick = {this.handlePay} style={{marginTop: 30}}>Pay</Button>   
                </div>)}
            
            {this.state.step === 2 && (
                <div className='bookBox'>
                    <Result
                        status="success"
                        title="Successfully Purchased Ticket(s)!"
                        extra={[
                            <Link to = '/'>
                                <Button>
                                    Go to Home
                                </Button>
                            </Link>
                        ]}
                    />
                </div>)}
        </div>
    )}
} 