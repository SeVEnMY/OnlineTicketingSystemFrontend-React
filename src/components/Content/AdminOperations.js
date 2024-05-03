import React  from 'react';
import { useState, useEffect } from 'react'; 
import { Tag, Table, Button, Form, Input, Radio, TimePicker, Alert, Modal } from 'antd'; 

import './Admin.css';  

import axios from 'axios'; 
const headers = { 'Content-Type': 'application/json', credentials: 'include'}

export class AddShow extends React.Component { 
    constructor() {
        super();
        this.state = {
            showTypes: [], 
            name: '', 
            description: '', 
            startTime: null, 
            startTimeStr: '', 
            endTime: null, 
            endTimeStr: '', 
            wheelchairAcc: '1', 
            price: NaN, 
            type: 'drama', 
            typeId: 1,
            alertMessage: '', 
            showAlert: false, 
            success: false, 
        }
        this.handleShowName = this.handleShowName.bind(this); 
        this.handleShowDescription = this.handleShowDescription.bind(this); 
        this.handleStartTime = this.handleStartTime.bind(this); 
        this.handleEndTime = this.handleEndTime.bind(this); 
        this.handleWheelchairAcc = this.handleWheelchairAcc.bind(this); 
        this.handleShowPrice = this.handleShowPrice.bind(this); 
        this.handleShowType = this.handleShowType.bind(this); 
        this.getShowTypeId = this.getShowTypeId.bind(this); 
        this.handleAddShow = this.handleAddShow.bind(this); 
    }
    
    
    componentDidMount() {
        axios.get('http://localhost:8080/show/listshtype') 
        .then((response) => response.data) 
        .then((data) => {
            this.setState({
                showTypes: data.data,
            })
        })
    }

    handleShowName(e) {
        this.setState({
            name: e.target.value.trim(),
        }, () => {})
    }

    handleShowDescription(e) {
        this.setState({
            description: e.target.value.trim(), 
        }, () => {})
    }

    handleStartTime(time, timeStr) {
        this.setState({
            startTime: time, 
            startTimeStr: timeStr, 
        }, () => {})
    }

    handleEndTime(time, timeStr) {
        this.setState({
            endTime: time, 
            endTimeStr: timeStr, 
        }, () => {})
    }

    handleWheelchairAcc(e) {
        this.setState({
            wheelchairAcc: e.target.value, 
        }, () => {})
    }

    handleShowPrice(e) { 
        this.setState({
            price: parseInt(e.target.value.trim()), 
        }, () => {}) 
    }

    handleShowType(e) {
        this.setState({
            type: e.target.value, 
        }, () => {
            this.getShowTypeId();
        })
    }

    getShowTypeId() {
        for (let i = 0; i < this.state.showTypes.length; i++) {
            if (this.state.showTypes[i].shtype_name === this.state.type) {
                this.setState({
                    typeId: this.state.showTypes[i].shtype_id, 
                }, () => {})
            }
        }
    }

    handleAddShow() {
        console.log("type id: " + this.state.typeId) 
        if (this.state.name === '' || this.state.description === '') {
            this.setState({
                alertMessage: "Show name and description cannot be null.", 
                showAlert: true, 
            }, () => {})
        } else if (this.state.startTime === null || this.state.endTime === null || this.state.startTime >= this.state.endTime) {
            this.setState({
                alertMessage: "Show time cannot be null and start time must be before end time.", 
                showAlert: true, 
            }, () => {})
        } else if (isNaN(this.state.price)) {
            this.setState({
                alertMessage: "Show price should be set to integer.", 
                showAlert: true, 
            }, () => {})
        } else {
            this.setState({
                showAlert: false, 
            }, () => {
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                }; 
                const date = new Date(); 
                const str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() 
                const start = str + " " + this.state.startTimeStr
                const end = str + " " + this.state.endTimeStr
                axios.post(`http://localhost:8080/show/add?shName=${this.state.name}&shDescription=${this.state.description}&shStartTime=${start}&shEndTime=${end}&shWheelchairAcc=${this.state.wheelchairAcc}&shPrice=${this.state.price}&shTypeId=${this.state.typeId}`, headers)
                    .then(response => response.data)
                    .then(data => {
                        console.log("add show!") 
                        this.setState({
                            success: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 3000);
                        })
                    });
            })
        }
    } 

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 10,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Show Name">
                    <Input placeholder="name" onChange = {this.handleShowName}/>
                </Form.Item>
                <Form.Item label="Show Description">
                    <Input placeholder="description" onChange = {this.handleShowDescription}/>
                </Form.Item>
                <Form.Item label="Start Time">
                    <TimePicker onChange = {this.handleStartTime}/>
                </Form.Item> 
                <Form.Item label="End Time">
                    <TimePicker onChange = {this.handleEndTime}/>
                </Form.Item> 
                <Form.Item label="Wheelchair Accessible">
                    <Radio.Group onChange={this.handleWheelchairAcc} defaultValue={"1"}>
                        <Radio value="1"> Yes </Radio>
                        <Radio value="0"> No </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Show Price">
                    <Input placeholder="price" onChange = {this.handleShowPrice}/>
                </Form.Item>
                <Form.Item label="Show Type">
                    <Radio.Group onChange={this.handleShowType} defaultValue={"drama"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="drama"> Drama </Radio>
                            <br />
                            <Radio value="musical"> Musical </Radio>
                            <br />
                            <Radio value="comedy"> Comedy </Radio>
                            <br />
                            <Radio value="horror"> Horror </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddShow} style ={{marginTop: 20}}>Add Show</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }  
} 

export class AddAttraction extends React.Component { 
    constructor() {
        super();
        this.state = {
            attractionTypes: [], 
            locationSections: [], 
            name: '', 
            description: '', 
            status: 'open', 
            capacity: NaN, 
            minimumHeight: NaN, 
            duration: NaN, 
            location: 'Lot A', 
            locationId: 1, 
            type: 'roller coaster', 
            typeId: 1,
            alertMessage: '', 
            showAlert: false, 
            success: false, 
        }
        this.handleName = this.handleName.bind(this); 
        this.handleDescription = this.handleDescription.bind(this); 
        this.handleStatus = this.handleStatus.bind(this); 
        this.handleCapacity = this.handleCapacity.bind(this); 
        this.handleMinimumHeight = this.handleMinimumHeight.bind(this); 
        this.handleDuration = this.handleDuration.bind(this); 
        this.handleLocation = this.handleLocation.bind(this); 
        this.handleType = this.handleType.bind(this); 
        this.handleAddAttraction = this.handleAddAttraction.bind(this); 
    }
    
    
    componentDidMount() {
        axios.get('http://localhost:8080/attraction/listatttype') 
        .then((response) => response.data) 
        .then((data) => {
            this.setState({
                attractionTypes: data.data,
            }, () => {
                axios.get('http://localhost:8080/attraction/listls') 
                .then((response) => response.data) 
                .then((data) => {
                    this.setState({
                        locationSections: data.data,
                    })
                })
            })
        })
    }

    handleName(e) {
        this.setState({
            name: e.target.value.trim(),
        }, () => {})
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value.trim(),
        }, () => {})
    }

    handleStatus(e) {
        this.setState({
            status: e.target.value,
        }, () => {})
    }

    handleCapacity(e) {
        this.setState({
            capacity: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("capacity: " + this.state.capacity)
        }) 
    }

    handleMinimumHeight(e) {
        this.setState({
            minimumHeight: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("minimum height: " + this.state.minimumHeight)
        }) 
    }

    handleDuration(e) {
        this.setState({
            duration: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("duration time: " + this.state.duration)
        }) 
    }

    handleLocation(e) {
        this.setState({
            location: e.target.value,
        }, () => {
            this.getLocationId();
        })
    }

    handleType(e) {
        this.setState({
            type: e.target.value,
        }, () => {
            this.getTypeId();
        })
    }
   

    getTypeId() {
        for (let i = 0; i < this.state.attractionTypes.length; i++) {
            if (this.state.attractionTypes[i].atttype_name === this.state.type) {
                this.setState({
                    typeId: this.state.attractionTypes[i].atttype_id, 
                }, () => {})
            }
        }
    } 

    getLocationId() {
        for (let i = 0; i < this.state.locationSections.length; i++) {
            if (this.state.locationSections[i].ls_name === this.state.location) {
                this.setState({
                    locationId: this.state.locationSections[i].ls_id, 
                }, () => {})
            }
        }
    }

    handleAddAttraction() {
        if (this.state.name === '' || this.state.description === '') {
            this.setState({
                alertMessage: "Attraction name and description cannot be null.", 
                showAlert: true, 
            }, () => {})
        } else if (isNaN(this.state.capacity) || isNaN(this.state.minimumHeight) || isNaN(this.state.duration)) {
            this.setState({
                alertMessage: "Attraction capacity, minimum hieght or duration time should be integer.", 
                showAlert: true, 
            }, () => {})
        } else {
            this.setState({
                showAlert: false, 
            }, () => {
                axios.post(`http://localhost:8080/attraction/add?attName=${this.state.name}&attDescription=${this.state.description}&attStatus=${this.state.status}&attCapacity=${this.state.capacity}&attMinimumHeight=${this.state.minimumHeight}&attDurationTime=${this.state.duration}&lsId=${this.state.locationId}&attTypeId=${this.state.typeId}`, headers)
                    .then(response => response.data)
                    .then(data => {
                        this.setState({
                            success: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 3000);
                        })
                    });
            })
        }
    }

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Attraction Name">
                    <Input placeholder="name" onChange = {this.handleName}/>
                </Form.Item>
                <Form.Item label="Attraction Description">
                    <Input placeholder="description" onChange = {this.handleDescription}/>
                </Form.Item>
                <Form.Item label="Attraction Status">
                    <Radio.Group onChange={this.handleStatus} defaultValue={"open"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="open"> Open </Radio>
                            <br />
                            <Radio value="under maintenance"> Under Maintenance </Radio>
                            <br />
                            <Radio value="closed"> Closed </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Attraction Capacity">
                    <Input placeholder="capacity" onChange = {this.handleCapacity}/>
                </Form.Item>
                <Form.Item label="Attraction Minium Height">
                    <Input placeholder="minimum height" onChange = {this.handleMinimumHeight}/>
                </Form.Item>
                <Form.Item label="Attraction Duration Time">
                    <Input placeholder="duration time" onChange = {this.handleDuration}/>
                </Form.Item>
                <Form.Item label="Attraction Type">
                    <Radio.Group onChange={this.handleType} defaultValue={"roller coaster"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="roller coaster"> Roller Coaster </Radio>
                            <br />
                            <Radio value="water ride"> Water Ride </Radio>
                            <br />
                            <Radio value="dark ride"> Dark Ride </Radio>
                            <br />
                            <Radio value="kid ride"> Kid Ride </Radio>
                            <br />
                            <Radio value="vr ride"> VR Ride </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Location Section">
                    <Radio.Group onChange={this.handleLocation} defaultValue={"Lot A"}>
                        <div style = {{display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
                            <Radio value="Lot A"> Lot A </Radio>
                            <br />
                            <Radio value="Lot B"> Lot B </Radio>
                            <br />
                            <Radio value="Lot C"> Lot C </Radio>
                            <br />
                            <Radio value="Lot D"> Lot D </Radio>
                            <br />
                        </div>
                    </Radio.Group>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddAttraction} style ={{marginTop: 20, border: null}}>Add Attraction</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }
    
}

export class AddMenuItem extends React.Component { 
    constructor() {
        super();
        this.state = {
            itemName: '', 
            unitPrice: NaN,
            alertMessage: '', 
            showAlert: false, 
            success: false, 
        }
        this.handleItemName = this.handleItemName.bind(this); 
        this.handleUnitPrice = this.handleUnitPrice.bind(this); 
        this.handleAddMenuItem = this.handleAddMenuItem.bind(this); 
    }

    handleItemName(e) {
        this.setState({
            itemName: e.target.value.trim(),
        }, () => {})
    }

    handleUnitPrice(e) {
        this.setState({
            unitPrice: parseInt(e.target.value.trim()), 
        }, () => {
            console.log("unit price: " + this.state.unitPrice)
        }) 
    }

    handleAddMenuItem() {
        if (this.state.itemName === '') {
            this.setState({
                alertMessage: "The name of menu item cannot be null.", 
                showAlert: true, 
            }, () => {})
        } else if (isNaN(this.state.unitPrice)) {
            this.setState({
                alertMessage: "The unit price of menu item should be integer.", 
                showAlert: true, 
            }, () => {})
        } else {
            this.setState({
                showAlert: false, 
            }, () => {
                axios.post(`http://localhost:8080/store/addmi?miName=${this.state.itemName}&miUnitPrice=${this.state.unitPrice}`, headers)
                    .then(response => response.data)
                    .then(data => {
                        this.setState({
                            success: true
                        }, () => {
                            setTimeout(() => {
                                this.setState({
                                    success: false
                                })
                            }, 3000);
                        })
                    });
            })
        }
    }

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Menu Item Name">
                    <Input placeholder="item name" onChange = {this.handleItemName}/>
                </Form.Item>
                <Form.Item label="Item Unit Price">
                    <Input placeholder="unit price" onChange = {this.handleUnitPrice}/>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddMenuItem} style ={{marginTop: 20, border: null}}>Add Menu Item</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }
    
}

export class AddStoreItem extends React.Component { 
    constructor() {
        super();
        this.state = {
            storeId: 1,
            itemId: 1, 
            stores: [], 
            items: [], 
            success: false, 
        }
        this.handleStore = this.handleStore.bind(this); 
        this.handleItem = this.handleItem.bind(this); 
        this.handleAddMenuItem = this.handleAddMenuItem.bind(this); 
    }

    componentDidMount() {
        axios.get('http://localhost:8080/store/list')
            .then(response => response.data)
            .then(data => this.setState({ stores: data.data }, () => {
                axios.get('http://localhost:8080/store/listmi')
                .then(response => response.data)
                .then(data => this.setState({ items: data.data }));
            })); 

        console.log("stores: " + this.state.stores)
    }    

    handleStore(e) {
        this.setState({
            storeId: e.target.value, 
        })
    }

    handleItem(e) {
        this.setState({
            itemId: e.target.value, 
        })
    }


    handleAddMenuItem() { 
        axios.post(`http://localhost:8080/store/addmist?stId=${this.state.storeId}&miId=${this.state.itemId}`, headers)
            .then(response => response.data)
            .then(data => {
                this.setState({
                    success: true
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            success: false
                        })
                    }, 3000);
                })
            });
    }

    render() {
        return (
            <div className='operationBox'>
                <div>
            <Form labelCol={{
                    span: 12,
                  }}
                  wrapperCol={{
                    span: 14, 
                  }}
                  layout="horizontal" 
                  style = {{marginTop: 30}}>
                <Form.Item label="Select a store">
                    <select name = 'storeId' defaultValue = '1' onChange = {this.handleStore} style = {{fontSize: 15}}> {
                        this.state.stores.map( store => (
                            <option key = {store.st_id} value = {store.st_id}> {store.st_name} </option>))
                    }
                    </select>
                </Form.Item>
                <Form.Item label="Select a menu item">
                    <select name = 'itemId' defaultValue = '1' onChange = {this.handleItem} style = {{fontSize: 15}}> {
                        this.state.items.map( item => (
                            <option key = {item.mi_id} value = {item.mi_id}> {item.mi_name} </option>))
                    }
                    </select>
                </Form.Item>
            </Form> 
            </div>
            {
                (this.state.showAlert) ? (
                    <Alert
                        message="Error"
                        description={this.state.alertMessage}
                        type="error"
                        showIcon 
                        style = {{marginTop: 30, width: 400}}
                    />
                ) : null
            }
            <Button onClick = {this.handleAddMenuItem} style ={{marginTop: 20, border: null}}>Add Store Item</Button> 
            {
                (this.state.success) ? (
                    <Alert style = {{marginTop:30}} message="Successfully Added!" type="success" showIcon />
                ) : null
            }
        </div>)
    }
    
}

