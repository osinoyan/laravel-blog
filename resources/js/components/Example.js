import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Example extends Component {
    constructor(props){
        super(props)
        console.log("yeeeeee")
        this.state = {
            apple: [],
        }
    }

    componentDidMount(){
        axios.post('/apple', {
            pen: 'apppple!',
        }).then( res => {
            console.log(res.data)
        }).catch( err => {
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
