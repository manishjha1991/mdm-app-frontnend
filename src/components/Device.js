import React, { Component } from 'react';
import '../css/Device.css';
export default class NewRecord extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            
            circles: [],
            circleId: '',
            storeName:'',
            fullName:'',
            contactNumber:'',
            emailId:'',
            create_network_app:{
                isActive:''
              },
              hi_5_app:{
               isActive:''
              },
              self_serve_app:{
                isActive:''
              },
              qudini_greeter_app:{
                isActive:''
              },
              airtel_tv_app:{
                isActive:''
              },
              consultation_hub_app:{
                isActive:''
              },
              fast_lane_app:{
               isActive:''
              },
              digitalOR_app:{
                isActive:''
              },
              screenSaver:{
                videoLink:String,
                
              },
              wallpaper:{
                imageLink:String,
                
              },
        };
        this.handleCircleChange= this.handleCircleChange.bind(this);
        this.handleStoreFullChange = this.handleStoreFullChange.bind(this);
        this.handleStoreContactNumberChange = this.handleStoreContactNumberChange.bind(this);
        this.handleStoreEmailIdChange = this.handleStoreEmailIdChange.bind(this);
        this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    handleSubmit(event) {
        event.preventDefault();
    
        let data = {
            circleId: this.state.circleId,
            storeInformation: {storeName:this.state.storeName,},
             storeInformation:{
                storeName:this.state.storeName,
                fullName:this.state.fullName,
                contactNumber:this.state.contactNumber,
                emailId:this.state.emailId,
              },
            
        };
    
         fetch("http://localhost:3000/device", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                mode: "cors",
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.log(error));
    
       
    }
    handleCircleChange(event){
        this.setState({circleId: event.target.value});
    }
    
    handleStoreNameChange(event) {
        this.setState({storeName: event.target.value} );
    }
    handleStoreFullChange(event) {
        this.setState({  fullName: event.target.value} );
    }
    handleStoreContactNumberChange(event) {
        this.setState({ contactNumber: event.target.value} );
    }
    handleStoreEmailIdChange(event) {
        this.setState({ emailId: event.target.value});
    }
    render() {
        console.log(this.state)
        return (
            <form className='form__row' method='POST' onSubmit={this.handleSubmit}>
         <label for="Select Circle"><b>Select Circle</b></label>   
         <select className="dropdown-content"  value={this.state.circleId}onChange={this.handleCircleChange}>
          {this.state.circles.map((circle) => <option key={circle.circleId} value={circle.circleId} name={circle.circleName}  >{circle.circleName}</option>)}
        </select>
        <br/>
          <label for="Store Name"><b>Enter Store Name</b></label>   
                <input
                    className="input2"
                    type="text"
                    placeholder="Store Name"
                    value={this.state.storeName}
                    onChange={this.handleStoreNameChange}
                />
                <br/>
                <label for="Store Manager Name"><b>Enter Store Manager Full Name</b></label>  
                <input 
                    className="input1"
                    type="text"
                    placeholder="First  Middle  Last"
                    value={this.state.fullName}
                    onChange={this.handleStoreFullChange}
                />
                <br/>
                <label for="Store Manager Name"><b>Enter Store Manager Contact Number</b></label>  
                <input
                    className="input3"
                    type="text"
                    placeholder="Mobile"
                    value={this.state.contactNumber}
                    onChange={this.handleStoreContactNumberChange}
                />
                <br/>
                <label for="Store Manager Name"><b>Enter Store Manager EmailId</b></label>  
                <input
                    className="input4"
                    type="text"
                    placeholder="Email"
                    value={this.state.emailId}
                    onChange={this.handleStoreEmailIdChange}
                />
                <br/>
                <input className ="input5" type="submit" value="Submit"/>
            </form>
        );
    }
    }