import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />      
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
