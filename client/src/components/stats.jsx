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
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
    
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        if (type === "time"){
            return hr + ':' + min + ':' + sec;
        }else{
            return dt + '/' + month + '/' + year;
        }
    
         
    
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
                <p>Date: </p>
                <p>{this.displayTime(stats.time_start, "date")}</p>
                <p>Start: </p>
                <p>{this.displayTime(stats.time_start, "time")}</p>
                <p>Fall: </p>
                <p>{this.displayTime(stats.fall_time, "time")}</p>
                <p>End: </p>
                <p>{this.displayTime(stats.time_end, "time")}</p>
                <p>Duration:</p>
                <p>{this.duration(stats.time_start, stats.time_end)}</p>
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