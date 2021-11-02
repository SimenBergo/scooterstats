import React, { Component } from 'react';
import api from '../api/api';

class Stats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false
        }
    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        this.dispUsers();
        await api.getStats().then(users => { 
            this.setState({
                users: users.data.data,
                isLoading: false,
            })
        })
    }

    dispUsers = (users) => {

        console.log(users);
        
           return <div id="userCard">
                <h5>Ride</h5>
                <p>start: </p>
                <p>{users.time_start}</p>
                <p>end: </p>
                <p>{users.time_end}</p>
                <p>fall: </p>
                <p>{users.fall_time}</p>
            </div>
    }

    render() {
        return (
            <>
                <section>
                    <h2>All trips</h2>
                    <div id="dispUsers">
                    {this.dispUsers(this.state.users)}
                    </div>
                </section>
            </>
            )
        }
}

export default Stats;