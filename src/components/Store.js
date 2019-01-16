import React, { Component } from 'react';
import axios from 'axios';
import ToggleButton from 'react-toggle-button'
var panelStyle = {
	'max-width': '80%',
	margin: '0 auto'
}

class Register extends Component {
  constructor() {
   super();

    this.state = {
      error:"",
      circles: [],
      formFields: {circleId: '',circleName:'',}
    }
  }
  componentDidMount() {
    fetch("http://localhost:3000/circle")
      .then(res => res.json())
      .then(
        (result) => {
         this.setState({
          circles: result.results
          });
        },
     (error) => {
          this.setState({
            error
          });
        }
      )
  }
  setGender(event) {
    console.log(typeof(event.target.value));
  }
  render() {
    console.log(this.state)
    return(
     <div>
    <div class="panel panel-primary" style={panelStyle}>
      <div class="panel panel-heading">React Forum - Register</div>
      <div class="panel panel-body">
        <form onsubmit={this.formHandler(this.state.formFields)}>
          <strong>Circle:</strong>
           <br /> 
           <select className="dropdown-content" value={this.state.circleId} name={this.state.circleName}
          onChange={(e) =>  {
            var index = e.nativeEvent.target.selectedIndex;
           return this.setState({ circleId: e.target.value ,circleName: e.nativeEvent.target[index].text});
          }}>
          {this.state.circles.map((circle) => <option key={circle.circleId} value={circle.circleId} name={circle.circleName}  >{circle.circleName}</option>)}
        </select>
        <br />
          <strong>StoreInfo:</strong> 
           <br />
           <input type="email" name="email" placeholder="me@example.com" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.email} /> 
           <input type="text" name="email" placeholder="me@example.com" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.email} /> 
           <input type="email" name="email" placeholder="me@example.com" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.email} /> 
            <input type="email" name="email" placeholder="me@example.com" onChange={(e) => this.inputChangeHandler.call(this, e)} value={this.state.formFields.email} /> 
           <br />
          <strong>App Information:</strong>
          <div onChange={event => this.setGender(event)}>
          <input type="radio" value={true} defaultChecked name="gender"/> Yes
          <input type="radio" value={false} name="gender"/> No
      </div>
      <button class="btn btn-primary">SAVE</button>
        </form>
      </div>
    </div>
  </div>

    );
  }

  inputChangeHandler(e) {
   let formFields = {...this.state.formFields};
   formFields[e.target.name] = e.target.value;
   this.setState({
    formFields
   });
  }

  formHandler(formFields) {
   axios.post('http://localhost:3000/device', formFields)
     .then(function(response){
       console.log(response);
       //Perform action based on response
   })
     .catch(function(error){
       console.log(error);
       //Perform action based on error
     });
  }
}

export default Register