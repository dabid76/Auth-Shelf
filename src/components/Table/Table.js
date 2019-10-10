import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App/App.css';
import axios from 'axios';


class Table extends Component {

    state = {
        items: []
    }

    componentDidMount = () =>{
        axios.get('/api/shelf')
        .then((response) =>{
        console.log(response.data)
        this.setState({items: response.data})
        })
        .catch((error) => {
        console.log('GET ERROR:', error)
        })
    }

    deleteBtn = (id) => {
        // console.log('btn click')
        axios.delete(`/api/shelf/${id}`)
        .then((response) =>{
        console.log(response.data)
        // this.setState({items: response.data})
        })
        .catch((error) => {
        console.log('GET ERROR:', error)
        })
        this.componentDidMount();
    }

    render() {
        return (
            <>
            <table>
                <tbody>
                   <tr>
                       <th>Description</th>
                       <th>Image</th>
                       <th>Username</th>
                   </tr>
                   {this.state.items.map((item, i) => {
                       return(
                       <tr key={i}>
                               <td>{item.description}</td>
                               <td>{item.image_url}</td>
                           <td>{item.username}</td>
                           <td><button onClick={() => this.deleteBtn(item.id)}>Delete</button></td>
                           </tr>
                       );
                   })}
               </tbody>
            </table >
            </>
        );
    }
}
const mapStateToProps = (storeInstance) => ({
    storeInstance
})
export default connect(mapStateToProps)(Table);