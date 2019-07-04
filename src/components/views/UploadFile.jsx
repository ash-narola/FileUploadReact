import React, { Component } from "react";
import { browserHistory } from 'react-router';

export default class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      fileUploadMessage: ''
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    console.log('handle uploading-', this.state.file);

    let formData = new FormData();
    formData.append('file', this.state.file);
    fetch('https://stunning-grand-teton-61463.herokuapp.com/v1/users.json', { // Your POST endpoint
      method: 'POST',
      body: formData // This is your file object
    }).then(
      response => response.json() // if the response is a JSON object
    ).then((success) =>{
        console.log(success) // Handle the success response object,
        if(success.status === 400) {
          this.setState({
            fileUploadMessage : success.errors
          })
        }else if(success.status === 200){
          this.setState({
            fileUploadMessage : 'File uploaded successfully'
          })
        }
      }).catch((error) =>{ 
        this.setState({
          fileUploadMessage : error.errors
        })
        // console.log(error.status) 
      }// Handle the error response object
    );
  }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }
    reader.readAsDataURL(file)
  }
  _handleListPage(e) {
    browserHistory.push('/');
  }
  render() {
    return (
      <div className="uploadFile">
        <br/><br />
        <div id="contact">Upload your file here</div>
        <br/><br />
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=> this._handleImageChange(e)} />
          <button className="submitButton" 
            type="submit" 
            onClick={(e)=>this._handleSubmit(e)}>Upload File</button>
        </form>
        <p>{this.state.fileUploadMessage}</p>
        <br/><br />
        <button className="submitButton" 
            type="button" 
            onClick={(e)=>this._handleListPage(e)}>Goto Listing Page</button>
      </div>
    );
  }
}