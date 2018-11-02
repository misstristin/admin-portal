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
import { _addPost, _loadPosts } from './services/PostService';

import profimg from './components/adminDefault.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    if(localStorage.token) {
      this.state = {
        isLoggedIn : true,
        isSignedUp : true,
        posts : [],
        category : "Now",
        image : profimg
        
      }
    }else{
      this.state = {
        isLoggedIn : false,
        isSignedUp : true,
        posts : [],
        category : "Now",
        image: profimg
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

goToLater = (event) => {
  let category = "Later";
  this.setState ({category});
}

goToNow = (event) => {
  let category = "Now";
  this.setState ({category});
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
  let image = profimg;

    
  return _signUp(username, password, email, industry, yearsexp, area, image).then(res => {
    console.log(res);
    let isSignedUp = true;
    this.setState({isSignedUp});
    this.setState({image})
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
        let image = res.image;
        this.setState({username}, function(){
        localStorage.setItem('username', username);
        this.setState({industry});
        this.setState({yearsexp});
        this.setState({area});
        this.setState({image});
        });
      })
  } else {
    alert('Incorrect Password.');
  }
  });
}

logout = (event) => {
  event.preventDefault();
  let username="";
  let industry="";
  let yearsexp="";
  let area="";
  let image=profimg;
  
  this.setState({isLoggedIn: false}, function(){
    localStorage.removeItem('token');
    localStorage.clear();
  this.setState({username});
  this.setState({industry});
  this.setState({yearsexp});
  this.setState({area});
  this.setState({image});

  });
 
}

addPost = (event) => {
  event.preventDefault();

  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  let time = date.getTime();

  let content = event.target.children[0].value;
  let category = this.state.category;
  let username = this.state.username;
  let timeStamp = day + month + year + time;
  let likes = 0;
  let comments = ['None Yet'];

  return _addPost(content, category, username, timeStamp, likes, comments).then(rj => {
      let posts = [...this.state.posts, rj];
      this.setState({posts});
      setTimeout(()=> {
        return this.getPostData()        
      })
      }, 500)}



getUserData(){
    console.log('Our user data is fetched');
    let username = localStorage.getItem('username');
    if(!username || username==="null"){
      console.log('No one is logged in yet.')
    }else {
      return _getUserInfo (username).then(res => {
        let username = res.username;
        let industry = res.industry;
        let yearsexp = res.yearsexp;
        let area = res.area;
        let image = res.image;
        this.setState({username});
        this.setState({industry});
        this.setState({yearsexp});
        this.setState({area});
        this.setState({image});
      })
    }};


getPostData(){
    console.log('Our post data is fetched');
    return _loadPosts()
    .then(resultingJSON => this.setState({posts : resultingJSON}))
  }


componentDidMount () {
  this.getUserData();
  this.getPostData();
}

render() {
  let isLoggedIn = this.state.isLoggedIn;
  let isSignedUp = this.state.isSignedUp;
    return (
      <div className="App">
      {isLoggedIn && <Nav logout={this.logout} goToLater={this.goToLater} goToNow={this.goToNow} />} 
      {isSignedUp && !isLoggedIn && <LoginNav goToSignUp={this.goToSignUp} />}
      {!isSignedUp && !isLoggedIn && <SignupNav goToLogin={this.goToLogin} />}
        
      {isSignedUp && isLoggedIn && <Main username={this.state.username} 
                                          industry={this.state.industry}
                                          yearsexp={this.state.yearsexp} 
                                          area={this.state.area}
                                          addPost={this.addPost}
                                          posts={this.state.posts}
                                          image={this.state.image} />}

      {isSignedUp && !isLoggedIn && <Login login={this.login} />}
      {!isSignedUp && !isLoggedIn && <SignUp signUp={this.signUp} />}

      <Footer />
      </div>
    );
  }
}

export default App;
