import React, { Component } from 'react';
import api from '../api/api';

class Stats extends Component {

    constructor(props) {
        super(props)
        this.state = {
            role: '',
            updateId: '',
            users: [],
            columns: [],
            isLoading: false,
            update: false
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

    dispUsers = () => {
        const people = this.state.users;
        const users = [];

        //sorting out managers
        for (let i = 0; i < people.length; i++){
                if(people[i]['role'] === "gardener" || people[i]['role'] === "anonymous"){
                    users.push(people[i]);
                }
        }
        
        return users.map((users, index) => {
           return <div id="userCard" key={index}>
                <h5>{users.name} {users.surname}</h5>
                <p>Email: </p>
                <p>{users.email}</p>
                <p>Role: </p>
                <p>{users.role}</p>
            </div>
        })
    }

    render() {
        return (
            <>
                {!this.state.update &&
                    <section>
                        <h2>All gardeners & anonymous users</h2>
                        <div id="dispUsers">
                        {this.dispUsers(this.state.users)}
                        </div>
                    </section>
                }
            </>
            )
        }
}

export default Stats;