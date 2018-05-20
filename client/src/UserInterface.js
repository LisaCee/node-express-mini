import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';

import './UserInterface.css';

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
                <Row>
                    <table>
                        <tr>
                            <div className='user'>
                                <td>
                                    { this.state.users.map((user, id) => {
                                        return (
                                            <div key={ user.id }>
                                                <div className='userName'>
                                                    { user.name }
                                                </div>
                                            </div>
                                        )
                                    }) }
                                </td>
                            
                                <td>
                                    { this.state.users.map((user, id) => {
                                        return (
                                            <div key={ user.id }>
                                                <div className='userBio'>
                                                    { user.bio }
                                                </div>
                                            </div>
                                        )
                                    }) }
                                </td>
                            </div>
                        </tr>
                    </table>
                </Row>
            </Container>
        )
    }
}

export default UserInterface;