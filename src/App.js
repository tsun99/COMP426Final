import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useEffect, useState } from "react";
import fire from './fire';
import Login from './Login'
import Joe from './Joe'

function App() {

  //warning: each child in a lsit should have a unique "key" prop

  const[book, setBook] = useState("");
  const[apiKey, setApiKey] = useState("AIzaSyBXdi61VjjEI7g3BNl8mTgEMRTJ7x5Dc54");
  const[result, setResult] = useState([]);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const[emailError, setEmailError] = useState('');
  const[passwordError, setPasswordError] = useState('');
  const[hasAccount, setHasAccount] = useState(false);
  const[user, setUser] = useState('');
  const[apiKey2, setApiKey2] = useState("AIzaSyAMxiaI7nvEbJcqfFylVwR2LqPG4TJozRc");
  const[tubeSearch, setTubeSearch] = useState("");
  const[result2, setResult2] = useState([]);


  const clearInputs = () =>{
    setEmail('');
    setPassword('');
  }
  const clearErrors =() =>{
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err =>{
        switch(err.code){
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
        }
      });
  }
  const handleSignup = () =>{
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err =>{
        switch(err.code){
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
        }
      });
  }
  const handleLogout = () =>{
    fire
      .auth()
      .signOut();

  }

  //fix error
  const authListener = ()=>{
    fire.auth().onAuthStateChanged(user =>{
      if(user){
        clearInputs();
        setUser(user);
      }else{
        setUser("");
      }
    });
  };

  useEffect(() =>{
    authListener();
  })

  function change(event){
    const book = event.target.value;
    setBook(book);
  }
  function changeYt(event){
    const video = event.target.value;
    setTubeSearch(video);
  }

  function submit(event){
    event.preventDefault();

    axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=10")
    .then(data => {
      setResult(data.data.items);
      console.log(data);
    })
    .catch(err => {console.log(err)})
    //console.log('yo')
  }
  function youtube(event){
    event.preventDefault();

    axios.get("https://www.googleapis.com/youtube/v3/search?key="+apiKey2+"&part=snippet&maxResults=5&q="+tubeSearch+"&type=video")
    .then(data => {
      setResult2(data.data.items);
      console.log(data);
    })
    .catch(err => {console.log(err)})
  }

  function getURL(id){
    return "https://www.youtube.com/watch?v=" + id;
  }

  return (
    <div className="App">
      {user ? (
        <div className="cont_1">
          <Joe handleLogout={handleLogout}/>
          <div className="youtube">
             <form onSubmit={youtube}>
               <input type="text" onChange={changeYt} className="input_control" placeholder="Video name" />
               <button type="submit" className="btn">Youtube Search</button>
             </form>
              {result2.map(video => (
                <>
                <img src={video.snippet.thumbnails.medium} alt={video.snippet.title} />
               <a href={getURL(video.id.videoId)}>
                 <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
               </a>
               <p></p>
               </>
             ))
             }
          </div>
        </div>
      ):(
        <div>
        <Login
        email = {email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        />
        <div className="cont_1">
        <div className="books">
          <form onSubmit={submit}>
            <div className="form">
              <input type="text" onChange={change} className="input_control" placeholder="Book Name" />
            </div>
            <button type="submit" className="btn">Search</button>
          </form>
          {
            result.map(book => (
              <a href={book.volumeInfo.previewLink}>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title} />
                
              </a>
            ))
          }
        </div>
      </div>
        </div>
      )}
      
    </div>
  );
}

export default App;
