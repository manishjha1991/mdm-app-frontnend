import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import ThemeSwitcher from "./components/Header"
import FileUpload from "./components/FileUpload"
import Store from "./components/Store";
import Device from "./components/Device"

class App extends Component {
  render() {
    return (
      <section>
        <Device/>
        {/* <FileUpload/> */}
      </section>
    );
  }
}

export default App;
