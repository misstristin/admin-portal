import React, { Component } from 'react';
import './App.css';
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login-Signup/Login";
import LoginNav from "./components/Nav/LoginNav";
import SignUp from "./components/Login-Signup/SignUp";
import SignupNav from "./components/Nav/SignupNav";

import { _signUp, _login } from './services/AuthService';
import { _getUserInfo } from './services/UserServices';


class App extends Component {
  constructor(props) {
    super(props);

    if(localStorage.token) {
      this.state = {
        isLoggedIn : true,
        isSignedUp : true
      }
    }else{
      this.state = {
        isLoggedIn : false,
        isSignedUp : true
      }
    }
    
  }

getToken = () => {
  return localStorage.getItem('token');
}

goToLogin = (event) => {
  let isSignedUp = true;
  this.setState ({isSignedUp});
}

goToSignUp = (event) => {
  let isSignedUp = false;
  this.setState ({isSignedUp});
}

signUp = (event) => {
  event.preventDefault();

  let form = event.target;

  let username = form.children[0].value;
  let password = form.children[1].value;
  let email = form.children[2].value;
  let industry = form.children[3].value;
  let yearsexp = form.children[4].value;
  let area = form.children[5].value;


  console.log(username + password + email + yearsexp + area);
    
  return _signUp(username, password, email, industry, yearsexp, area).then(res => {
    console.log(res);
    let isSignedUp = true;
    this.setState({isSignedUp});
  });
}

login = (event) => {
  event.preventDefault();
  let form = event.target;

  let username = form.children[0].value;
  let password = form.children[1].value;

  return _login(username, password).then(res => {
    if (res.token){
      let isLoggedIn = true;
      this.setState({isLoggedIn}, function(){
        localStorage.setItem('token', res.token);
      });
      return _getUserInfo (username).then(res => {
        let industry = res.industry;
        let yearsexp = res.yearsexp;
        let area = res.area;
        this.setState({username}, function(){
          localStorage.setItem('username', username);
        });
        this.setState ({industry}, function(){
          localStorage.setItem('industry', industry);
        });
        this.setState ({yearsexp}, function(){
          localStorage.setItem('yearsexp', yearsexp);
        });
        this.setState ({area}, function(){
          localStorage.setItem('area', area);
        });
      })
  } else {
    alert('Incorrect Password.');
  }
  });
}

logout = (event) => {
  event.preventDefault();
  this.setState({isLoggedIn: false}, function(){
    localStorage.removeItem('token');
  });
}

componentDidMount () {
    this.setState ({username : localStorage.username});
    this.setState ({industry : localStorage.industry});
    this.setState ({yearsexp : localStorage.yearsexp});
    this.setState ({area : localStorage.area});
}

render() {
  let isLoggedIn = this.state.isLoggedIn;
  let isSignedUp = this.state.isSignedUp;
    return (
      <div className="App">
      {isLoggedIn && <Nav logout={this.logout} />} 
      {isSignedUp && !isLoggedIn && <LoginNav goToSignUp={this.goToSignUp} />}
      {!isSignedUp && !isLoggedIn && <SignupNav goToLogin={this.goToLogin} />}
        
      {isSignedUp && isLoggedIn && <Main username={this.state.username} 
                                          industry={this.state.industry}
                                          yearsexp={this.state.yearsexp} 
                                          area={this.state.area} />}

      {isSignedUp && !isLoggedIn && <Login login={this.login} />}
      {!isSignedUp && !isLoggedIn && <SignUp signUp={this.signUp} />}

      <Footer />
      </div>
    );
  }
}

export default App;
