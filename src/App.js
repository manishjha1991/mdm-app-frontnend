import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import UpdateRecords from "./components/Update"
import FileUpload from "./components/FileUpload"
import Store from "./components/Store";
import Device from "./components/Device"

class App extends Component {
  render() {
    return (
      <section>
        <UpdateRecords/>
        {/* <FileUpload/> */}
      </section>
    );
  }
}

export default App;
