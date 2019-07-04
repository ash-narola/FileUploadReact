import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {records: ''}
  }
  
  componentDidMount() {
    browserHistory.push('/');
    
    let url = ' https://stunning-grand-teton-61463.herokuapp.com/v1/users.json';
    fetch(url).
    then(response => response.json()).then((repos) => {
        console.log(repos);
        console.log(typeof(repos));
        this.setState({
          records: repos
        });
      })
  }
  _handleFileUploadPage(e) {
    browserHistory.push('/uploadFile');
  }
  render() {
    let data = this.state.records;
    return (
      <div id="home">
        Users List
        <br/>
        <button className="submitButton" 
            type="button" 
            onClick={(e)=>this._handleFileUploadPage(e)}>Goto File Upload Page</button>
        <br/>
        <div>
          <table>
              {               
              data && data.map((key, milestone) => {                
                return <tr key={ key.id }><td>{key.id}</td>
                <td>{key.first_name}</td>
                <td>{key.last_name}</td>
                <td>{key.age}</td>
                <td>{key.sex}</td>
                </tr>
              })
              }
          </table>
        </div>
      </div>
    );
  }
}