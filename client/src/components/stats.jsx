import React, { Component } from 'react';
import api from '../api/api';

class Stats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stats: [],
            isLoading: false
        }
    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.dispUsers();
        await api.getStats().then(stats => { 
            this.setState({
                stats: stats.data.data,
                isLoading: false,
            })
        })
    }

    duration = (start, end) => {
        const date = new Date(start);
        const date2 = new Date(end);

        let mili = date2 - date;
        let seconds = mili/1000;

        let min = new Date(seconds * 1000).toISOString().substr(14, 5);

        return min
    }

    displayTime = (timestamp, type) => {
        const date = new Date(timestamp);
        const sdate = date.toLocaleString('no-NO', {timeZone: "GMT"}); 
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        //let hr = date.getHours();
        //let min = date.getMinutes();
        //let sec = date.getSeconds();

        let hrplace = 12;
        let minplace = 15;
        let secplace = 18; 
    
        if (dt < 10) {
            dt = '0' + dt;
            hrplace --;
            minplace --;
            secplace --;
        }
        if (month < 10) {
            month = '0' + month;
            hrplace --;
            minplace --;
            secplace --;
        }
        
        let hr = sdate.substr(hrplace, 2);
        let min = sdate.substr(minplace, 2);
        let sec = sdate.substr(secplace, 2);
        
        if (type === "time"){
            return hr + ':' + min + ':' + sec;
        }else{
            return dt + '/' + month + '/' + year;
        }
    
    }

    array = (falls) => {
        let allFalls = [];
        for (let i = 0; i < falls.length; i++){
            allFalls.push(falls[i]);
        }
        return allFalls.map((fall, index) => {
            return <div id="fall">
                <p>Fall {index + 1}: </p>
                <p>Time: </p>
                <p>{this.displayTime(fall, "time")}</p>
            </div>
        })
    }

    dispUsers = () => {

        const stats = this.state.stats;
        const allStats = [];

        for (let i = 0; i < stats.length; i++){
            allStats.push(stats[i]);
        }
        
        return allStats.map((stats, index) => {
            return <div id="statsCard" key={index}>
                <h3>Ride {index+1}</h3>
                <p><b>Date: </b></p>
                <p>{this.displayTime(stats.time_start, "date")}</p>
                <p><b>Start: </b></p>
                <p>{this.displayTime(stats.time_start, "time")}</p>
                <p><b>End: </b></p>
                <p>{this.displayTime(stats.time_end, "time")}</p>
                <p><b>Duration: </b></p>
                <p>{this.duration(stats.time_start, stats.time_end)}</p>
                {stats.falls.length > 0 && 
                <><p><b>Falls: </b></p>
                
                <div id="allFalls">
                {this.array(stats.falls)}
                </div></>
                }
            </div>
        }) 
    }

    render() {
        return (
            <>
            <h2>All trips</h2>
                <section>
                    <div id="dispUsers">
                    {this.dispUsers(this.state.stats)}
                    </div>
                </section>
            </>
            )
        }
}

export default Stats;