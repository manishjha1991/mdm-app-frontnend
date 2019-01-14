import React, { Component } from 'react';
import logo from './logo.svg';
// import './App.css';
import ThemeSwitcher from "./components/Header"
import FileUpload from "./components/FileUpload"
class App extends Component {
  render() {
    return (
      <div>
        <ThemeSwitcher/>
        <FileUpload/>
      </div>
    );
  }
}

export default App;
