import React, { Component } from "react";
import Select from "react-select";
import "../css/Device.css";
import axios, { post } from "axios";
import HeaderComponent from "./HeaderComponent";
export default class UpdateRecords extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      store: "",
      devices: [],
      device: "",
      selectedApps: [],
   apps: [
        { label: "Create Network App", value: "create_network_app" },
        { label: "HI 5 App", value: "hi_5_app" },
        { label: "Self Server App", value: "self_serve_app" },
        { label: "Qudini greeter App", value: "qudini_greeter_app" },
        { label: "Airtel TV App", value: "airtel_tv_app" },
        { label: "Consultation hub App", value: "consultation_hub_app" },
        { label: "Fast lane App", value: "fast_lane_app" },
        { label: "DigitalOr App", value: "digitalOR_app" }
      ],
     
      wallpaper: "",
    
    successFlag: false  
  };
    this.handleStoreChange = this.handleStoreChange.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3000/device")
      .then(res => res.json())
      .then(
        result => {
          console.log(result.results)  
          this.setState({
            stores: result.results
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );
  }
  handleSubmit(event) {
    event.preventDefault();

    let data = {
     wallpaper: {
        imageLink: this.state.wallpaper
      },
      appInfo: []
    };
    this.state.apps.forEach(app => {
      if (
        this.state.selectedApps.find(a => {
          return a.value === app.value;
        })
      ) {
        data.appInfo.push({ appName: app.value, isActive: true });
      } else {
        data.appInfo.push({ appName: app.value, isActive: false });
      }
    });
    if (data.wallpaper.imageLink) {
       console.log(this.state.device.value) 
      fetch(`http://localhost:3000/device/${this.state.device.value}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        mode: "cors",
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          this.showSuccess();
          console.log(data);
        })
        .catch(error => alert(error));
    } else {
      console.log("upload is not succeed");
    }
  }
  showSuccess = () => {
    this.setState({
      successFlag: true,
      store: "",
      device: "",
      wallpaper: "",
      selectedApps: []
    });
    setTimeout(() => this.setState({ successFlag: false }), 2000);
  };

handleDeviceChange(device) {
  this.setState({ device });
 }
  handleStoreChange(store) {
    
    this.setState({ store });
    fetch(`http://localhost:3000/device/${store.value}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            devices: result.results
          });
        },
        error => {
          this.setState({
            error
          });
        }
      );

  }
  onFormSubmit = e => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file).then(response => {
      this.setState({ wallpaper: response.data });
    });
  };
  onChange = e => {
    this.setState({ file: e.target.files[0] });
  };
  fileUpload(file) {
    const url = "http://localhost:3000/upload";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return post(url, formData, config);
  }

  render() {
 
    return (
      <div>
        <HeaderComponent />
        {this.state.successFlag && (
          <div className="successMsg">Date Has been inserted Successfully</div>
        )}

<form className="form__row" method="POST" onSubmit={this.handleSubmit}>
<div className="row">
            <label className="label" for="Select Store">
              <b>Select Store</b>
            </label>
            <Select
              className="value"
              value={this.state.store}
              onChange={this.handleStoreChange}
              options={this.state.stores.map(store => {
                 
                return { value: store.storeInformation.storeId, label: store.storeInformation.storeId };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Select Store">
              <b>Select Device</b>
            </label>
            <Select
              className="value"
              value={this.state.device}
              onChange={this.handleDeviceChange}
              options={this.state.devices.map(device => {
                 
                return { value: device._id, label: device._id };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Select App</b>
            </label>
            <Select
              className="value"
              options={this.state.apps}
              value={this.state.selectedApps}
              onChange={selectedApps => this.setState({ selectedApps })}
              isMulti
            />
          </div>
          <div className="row">
            <label for="Store Manager Name">
              <b>wallpaper</b>
            </label>
            <input className="value" type="file" onChange={this.onChange} />
            <button onClick={this.onFormSubmit} type="submit">
              Upload
            </button>
          </div>
          <div className="row">
            <input className="btnClass" type="submit" value="Submit" />
          </div>
     </form>
      </div>
    );
  }
}
