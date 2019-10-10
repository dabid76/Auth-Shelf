import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';




class AddInfo extends Component {
    state = {
        newItem: {
            user: this.props.storeInstance.user.id,
            description: '',
            url: '',
        }
    }
    componentDidMount () {
        this.props.dispatch({type: 'FETCH_USER'})
    }

    handelChange = (e, propertyName) => {
        this.setState({
            newItem: { ...this.state.newItem,
                [propertyName]: e.target.value
            }
        })
        console.log(this.state.newItem)
    }

    handelClick = () => {
        axios.post('/api/shelf', this.state.newItem)
            .then((result) => {
                this.setState({
                    newItem: {
                        description: '',
                        url: '',
                    }
                })
            }).catch((err) => {
                console.log(err);
            })
    }
    render() {
        return (
            <div>
                <p>Add Info</p>
                <p>Description:</p><input value={this.state.description} onChange={(e) => { this.handelChange(e, 'description') }} />
                <p>Img URL:</p><input value={this.state.url} onChange={(e) => { this.handelChange(e, 'url') }} />
                <br />
                <button onClick={this.handelClick}>Add</button>
            </div>
        )
    }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = (storeInstance) => ({
    storeInstance
})

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddInfo);