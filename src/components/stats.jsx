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

    dispUsers = (stats) => {

        console.log(stats);
        
           return <div id="userCard">
                <h5>Ride</h5>
                <p>start: </p>
                <p>{stats}</p>
                <p>end: </p>
                <p>{stats}</p>
                <p>fall: </p>
                <p>{stats}</p>
            </div>
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