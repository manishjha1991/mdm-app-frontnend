import React, { Component } from "react";
import Select from "react-select";
import "../css/Device.css";
import axios, { post } from "axios";
import HeaderComponent from "./HeaderComponent";
export default class NewRecord extends Component {
  constructor(props) {
    super(props);

    this.state = {
      circles: [],
      circle: "",
      storeName: "",
      fullName: "",
      contactNumber: "",
      emailId: "",
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
      selectedApps: [],
      screenSaver: {
        videoLink: String
      },
      wallpaper: {
        imageLink: String
      },
      successFlag: false
    };
    this.handleCircleChange = this.handleCircleChange.bind(this);
    this.handleStoreFullChange = this.handleStoreFullChange.bind(this);
    this.handleStoreContactNumberChange = this.handleStoreContactNumberChange.bind(
      this
    );
    this.handleStoreEmailIdChange = this.handleStoreEmailIdChange.bind(this);
    this.handleStoreNameChange = this.handleStoreNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    fetch("http://localhost:3000/circle")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            circles: result.results
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
      circleId: this.state.circle.value,
      storeInformation: { storeName: this.state.storeName },
      storeInformation: {
        storeName: this.state.storeName,
        fullName: this.state.fullName,
        contactNumber: this.state.contactNumber,
        emailId: this.state.emailId
      },
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
      fetch("http://localhost:3000/device", {
        method: "POST",
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
        .catch(error => console.log(error));
    } else {
      console.log("upload is not succeed");
    }
  }
  showSuccess = () => {
    this.setState({
      successFlag: true,
      circle: "",
      storeName: "",
      fullName: "",
      contactNumber: "",
      emailId: "",
      selectedApps: []
    });
    setTimeout(() => this.setState({ successFlag: false }), 2000);
  };
  handleCircleChange(circle) {
    this.setState({ circle });
  }

  handleStoreNameChange(event) {
    this.setState({ storeName: event.target.value });
  }
  handleStoreFullChange(event) {
    this.setState({ fullName: event.target.value });
  }
  handleStoreContactNumberChange(event) {
    this.setState({ contactNumber: event.target.value });
  }
  handleStoreEmailIdChange(event) {
    this.setState({ emailId: event.target.value });
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
            <label className="label" for="Select Circle">
              <b>Select Circle</b>
            </label>
            <Select
              className="value"
              value={this.state.circle}
              onChange={this.handleCircleChange}
              options={this.state.circles.map(circle => {
                return { value: circle.circleId, label: circle.circleName };
              })}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Name">
              <b>Enter Store Name</b>
            </label>
            <input
              className="value"
              type="text"
              placeholder="Store Name"
              value={this.state.storeName}
              onChange={this.handleStoreNameChange}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Enter Store Manager Full Name</b>
            </label>
            <input
              className="value"
              type="text"
              placeholder="First  Middle  Last"
              value={this.state.fullName}
              onChange={this.handleStoreFullChange}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Enter Store Manager Contact Number</b>
            </label>
            <input
              className="value"
              type="text"
              placeholder="Mobile"
              value={this.state.contactNumber}
              onChange={this.handleStoreContactNumberChange}
            />
          </div>
          <div className="row">
            <label className="label" for="Store Manager Name">
              <b>Enter Store Manager EmailId</b>
            </label>
            <input
              className="value"
              type="text"
              placeholder="Email"
              value={this.state.emailId}
              onChange={this.handleStoreEmailIdChange}
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
            <input className="input7" type="file" onChange={this.onChange} />
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
