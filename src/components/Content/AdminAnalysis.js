import React  from 'react';
import { useState, useCallback, PureComponent } from 'react'; 

import './Admin.css'; 
import axios from 'axios'; 
import { Pie, PieChart, Sector, Label } from 'recharts'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'; 
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { RadialBarChart, RadialBar, Legend } from 'recharts';

export function Analysis() {
    return (
    <div className='analysisBox'>
        <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <VisitorAnalysis />
        <OrderAnalysis />
        </div >
        <div style = {{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
        <TicketAnalysis />
        <StoreAnalysis />
        <AttractionAnalysis />
        </div>
    </div>)
} 

class AttractionAnalysis extends React.Component {
    state = {
        data: [], 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/attraction/count')
        .then((response) => response.data) 
        .then((data) => {
            console.log("get attraction count: " + data); 
            this.setState({
                data: [ 
                    {
                        name: 'roller coaster', 
                        value: data.rollercoaster, 
                    },
                    {
                        name: 'water ride', 
                        value: data.waterride,
                    }, 
                    {
                        name: 'dark ride', 
                        value: data.darkride,
                    }, 
                    {
                        name: 'kid ride', 
                        value: data.kidride, 
                    }, 
                    {
                        name: 'vr ride', 
                        value: data.vrride, 
                    }, 
                ], 
            }, () => {
                console.log(this.state.data); 
            }) 
            
        })
    } 

    render() {
        return ( 
        <div style = {{marginTop: 30}}>
            <label style={{color: "#8C8C8C"}}>Attraction Visit Distribution</label>
            <RadarChart 
            width={400}
            height={300}
            cx="50%" 
            cy="50%" 
            outerRadius="80%" data={this.state.data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        </div>
        );
    }
}

class StoreAnalysis extends React.Component {
    state = {
        data: [], 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/store/salescount')
        .then((response) => response.data) 
        .then((data) => {
            console.log("get store count: " + data); 
            this.setState({
                data: [ 
                    {
                        name: 'apparels', 
                        amount: data.apparels, 
                        fill: '#8dd1e1',
                    },
                    {
                        name: 'icecreamparlor', 
                        amount: data.icecreamparlor, 
                        fill: '#82ca9d',
                    }, 
                    {
                        name: 'restaurant', 
                        amount: data.restaurant, 
                        fill: '#a4de6c',
                    }, 
                    {
                        name: 'giftshop', 
                        amount: data.giftshop, 
                        fill: '#d0ed57',
                    }, 
                    {
                        name: 'foodstall', 
                        amount: data.foodstall, 
                        fill: '#ffc658',
                    }, 
                ], 
            }, () => {
                console.log(this.state.data); 
            }) 
            
        })
    }

    render() {
        return ( 
        <div style = {{marginTop: 30}}>
            <label style={{color: "#8C8C8C"}}>Store Sales Distribution</label>
            <RadialBarChart 
            width={320}
            height={300}
            cx="60%" 
            cy="50%" 
            innerRadius="10%" 
            outerRadius="80%" barSize={10} data={this.state.data}>
            <RadialBar
                minAngle={15}
                label={{ position: 'insideStart', fill: '#8884d8' }}
                background
                clockWise
                dataKey="amount"
            />
            <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
            </RadialBarChart>
        </div>
        );
    }
}

const style = {
    top: '50%',
    left: '10%',
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

class TicketAnalysis extends React.Component {
    state = {
        data: [], 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/ticket/count')
        .then((response) => response.data) 
        .then((data) => {
            console.log("get ticket count: " + data); 
            this.setState({
                data: [
                    {
                        name: 'senior', 
                        amount: data.senior, 
                    }, 
                    {
                        name: 'adult', 
                        amount: data.adult, 
                    }, 
                    {
                        name: 'child', 
                        amount: data.child, 
                    }
                ], 
            }, () => {
                console.log(this.state.data); 
            }) 
            
        })
    }

    render() {
        return ( 
        <div>
            <BarChart
            width={360}
            height={300}
            data={this.state.data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Ticket Distribution', angle: -90, offset: 0, position: 'left' }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#ffc658" barSize={40}/>
            </BarChart>
        </div>
        );
    }
}


class OrderAnalysis extends React.Component {
    state = {
        data: [], 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/order/count')
        .then((response) => response.data) 
        .then((data) => {
            console.log("get order count: " + data); 
            this.setState({
                data: [
                    {
                        name: 'ticket', 
                        amount: data.ticket, 
                    }, 
                    {
                        name: 'show', 
                        amount: data.show, 
                    }, 
                    {
                        name: 'store', 
                        amount: data.store, 
                    }, 
                    {
                        name: 'parking', 
                        amount: data.parking, 
                    }
                ], 
            }, () => {
                console.log(this.state.data); 
            }) 
            
        })
    }

    render() {
        return ( 
        <div style={{marginLeft: 80}}>
            <BarChart
            width={500}
            height={300}
            data={this.state.data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Order Distribution', angle: -90, offset: 0, position: 'left' }} />
            <Tooltip />
            <Bar dataKey="amount" fill="#82ca9d" barSize={50}/>
            </BarChart>   
        </div> 
        );
    }
}


class VisitorAnalysis extends React.Component { 
    state = {
        data: [], 
    }
    
    componentDidMount() {
        axios.get('http://localhost:8080/visitor/count')
        .then((response) => response.data) 
        .then((data) => {
            console.log("get visitor count: " + data); 
            this.setState({
                data: [
                    {
                        name: 'individual', 
                        value: data.individual, 
                    }, 
                    {
                        name: 'student', 
                        value: data.student, 
                    }, 
                    {
                        name: 'member', 
                        value: data.member, 
                    }, 
                    {
                        name: 'group', 
                        value: data.group, 
                    }
                ], 
            }, () => {
                console.log(this.state.data); 
            }) 
            
        })
    }

    render() {
        return (
          <VisitorChart data = {this.state.data}/>
        );
    }
} 

function VisitorChart({data}) {
    const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <div>
        <label style={{color: "#8C8C8C"}}>Visitor Distribution</label>
        <PieChart width={400} height={270}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx="200"
        cy="150"
        innerRadius={50}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
    </div>); 
}

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";
  
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={"#8dd1e1"}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={"#8dd1e1"}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Amount: ${value}`}</text>
      </g>
    );
  };


