import React  from 'react';
import { useState, useEffect } from 'react'; 
import './Admin.css';  
import axios from 'axios'; 
import { Analysis } from './AdminAnalysis'; 
import { AllVisitors, AllOrders, AllTickets, AllShows, AllAttractions, AllStores, AllParkings } from './AdminTables'; 
import { AddShow, AddAttraction, AddMenuItem, AddStoreItem } from './AdminOperations'; 
import { Layout, Menu } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, children, type) {
  return {
    key,
    children,
    label,
    type,
  };
}
const items = [ 
    {
        label: 'Visualization',
        key: 'v',
    }, 
    {
        label: 'Data Tables',
        key: 't',
        children: [{
            label: 'All Visitors',
            key: 'd1',
        }, {
            label: 'All Orders',
            key: 'd2',
        }, {
            label: 'All Tickets',
            key: 'd3',
        }, {
            label: 'All Shows',
            key: 'd4',
        }, {
            label: 'All Attractions',
            key: 'd5',
        }, {
            label: 'All Stores',
            key: 'd6',
        }, {
            label: 'All Parkings',
            key: 'd7',
        }]
    },
    {
        label: 'Admin Operations',
        key: 'a',
        children: [{
            label: 'Add Show',
            key: 'o1',
        }, {
            label: 'Add Attraction',
            key: 'o2',
        }, {
            label: 'Add Menu Item',
            key: 'o3',
        }, {
            label: 'Add Store Item',
            key: 'o4',
        }]
    }
];

const headers = { 'Content-Type': 'application/json', credentials: 'include'}

export function AdminDisplay() {
    const [key, setKey] = useState('v'); 
    
    function onClick (e) {
        console.log('click ', e);
        setKey(e.key); 
    };

    return (
        <div className='adminBox'>
            <Layout>
            <Header>
            <Menu onClick={onClick} selectedKeys={key} mode="horizontal" items={items}/>
            </Header>
            <Content style={{display: 'flex', flexDirection: 'row', alignItems: 'center', padding: 20}}>
                {
                    key === 'v' && <Analysis />
                }
                {
                    key === 'd1' && <AllVisitors/>
                }
                {
                    key === 'd2' && <AllOrders />
                }
                {
                    key === 'd3' && <AllTickets />
                }
                {
                    key === 'd4' && <AllShows />
                }
                {
                    key === 'd5' && <AllAttractions />
                }
                {
                    key === 'd6' && <AllStores />
                }
                {
                    key === 'd7' && <AllParkings />
                }
                {
                    key === 'o1' && <AddShow />
                }
                {
                    key === 'o2' && <AddAttraction />
                }
                {
                    key === 'o3' && <AddMenuItem />
                }
                {
                    key === 'o4' && <AddStoreItem />
                }
            </Content>
            </Layout>
            
        </div>
    
    );
} 



function TapGroup() {
    const [activeTab, setActiveTab] = useState('All Visitors'); 
    const titles = ['All Visitors', 'All Orders', 'All Tickets', 'All Shows', 'All Attractions', 'All Stores', 'All Parkings'];
    
    return (
        <div className='tabGroupBox'>
          <div style = {{display: 'flex'}}>
            {titles.map(title => (
              <button 
                className='tab'
                key={title}
                onClick={() => setActiveTab(title)}
              >
                {title}
              </button>
            ))}
          </div>
          <div className='tabContentBox'>
            {activeTab === 'All Visitors' && (
                <AllVisitors /> 
            )}
            {activeTab === 'All Orders' && (
                <AllOrders />
            )}      
            {activeTab === 'All Tickets' && (
                <AllTickets />
            )}    
            {activeTab === 'All Shows' && (
                <div>
                    <AllShows />
                    <AddShow />
                </div>
            )}
            {activeTab === 'All Attractions' && (
                <div>
                    <AllAttractions />
                    <AddAttraction />
                </div>
            )}
            {activeTab === 'All Stores' && (
                <div>
                    <AllStores /> 
                    <AddMenuItem />
                    <AddStoreItem />
                </div>
            )}
            {activeTab === 'All Parkings' && (
                <AllParkings />
            )}
          </div>
        </div>
      );
}
