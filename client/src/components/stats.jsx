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

        let hr = sdate.substr(11, 2);
        let min = sdate.substr(14, 2);
        let sec = sdate.substr(17, 2);

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (hr < 10) {
            hr = '0' + hr;
        }
        if (min < 10) {
            min = '0' + min;
        }
        if (sec < 10) {
            sec = '0' + sec;
        }

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
                <p><b>Fall {index + 1} Time: </b></p>
                <p>{this.displayTime(fall, "time")}</p>
            </div>
        })
    }

    countFalls = () => {
        let allFalls = [];

        const stats = this.state.stats;

        for (let i = 0; i < stats; i++){
            if(stats.falls.length > 0){
                allFalls.push(stats[i]);
            }
        }
        return allFalls.length;
    }


    dispUsers = () => {

        console.log(this.state.stats)
        const stats = this.state.stats;
        const allStats = [];

        for (let i = 0; i < stats.length; i++){
            allStats.push(stats[i]);
        }

        return allStats.map((stats, index) => {
            return <div id="statsCard" key={index}>
                <h3>Ride {index+1}</h3>
                <p><b>Date: </b>{this.displayTime(stats.time_start, "date")}</p>

                <p><b>Start: </b>{this.displayTime(stats.time_start, "time")}</p>

                <p><b>End: </b>{this.displayTime(stats.time_end, "time")}</p>

                <p><b>Duration: </b>{this.duration(stats.time_start, stats.time_end)}</p>

                {stats.falls.length < 1 &&
                <p>No falls</p>
                }
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
            <h2>Stats</h2>
            <section id="stats">
                <p><b>Total number of trips: </b>{this.state.stats.length}</p>
                <p><b>Total number of trips with falls: </b>{this.countFalls()}</p>
            </section>
            </>
            )
        }
}

export default Stats;