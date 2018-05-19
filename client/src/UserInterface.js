import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

class UserInterface extends Component {
    constructor() {
        super();
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        axios
            .get('http://localhost:5000/api/users')
            .then(response => {
                this.setState({ users: response.data.users })
            })
            .catch(err => {
                console.log(err);
            })
    }
    render() {
        console.log('USERS', this.state.users);
        return (
            <Container className='container'>
                <h1>Users</h1>
                { this.state.users.map((user, id) => {
                    return (
                    <div className='user'
                        key={ user.id }>
                        { user.name }
                        { user.bio }
                    </div>
                    )
                }) }
            </Container>
        )
    }
}

export default UserInterface;