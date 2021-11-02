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

    displayTime = (timestamp) => {
        const date = new Date(timestamp);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();

        console.log(hr, min, sec);
    
        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }
    
        return hr + ':' + min + ':' + sec + ' - ' + dt + '/' + month + '/' + year;
    
    }

    dispUsers = () => {

        const stats = this.state.stats;
        const allStats = [];

        for (let i = 0; i < stats.length; i++){
            allStats.push(stats[i]);
        }
        return allStats.map((stats, index) => {
            return <div id="userCard" key={index}>
                <h5>Ride {index+1}</h5>
                <p>start: </p>
                <p>{this.displayTime(stats.time_start)}</p>
                <p>fall: </p>
                <p>{this.displayTime(stats.fall_time)}</p>
                <p>end: </p>
                <p>{this.displayTime(stats.time_end)}</p>
            </div>
        })
           
    }

    render() {
        return (
            <>
                <section>
                    <h2>All trips</h2>
                    <div id="dispUsers">
                    {this.dispUsers(this.state.stats)}
                    </div>
                </section>
            </>
            )
        }
}

export default Stats;