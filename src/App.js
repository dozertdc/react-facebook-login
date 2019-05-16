import React from 'react';
import './App.css';
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAaa6m_sfNDDulf-zEwNzdBoVHxPi3cHc0",
  authDomain: "authentication-react-cae68.firebaseapp.com"
});

class App extends React.Component {
  state = { isSignedIn : false };
  uiConfig = {
    signedInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false
    }
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({
        isSignedIn: user
      });
      console.log(user);
    });
  }

  render (){
    return (
      <div className="App">
        {this.state.isSignedIn ? 
        <div>
          <div>Signed In</div>
          <button onClick={ () => firebase.auth().signOut() }>Sign Out</button>
          <h1>{firebase.auth().currentUser.displayName}</h1>
          <img
            alt="facebook profile"
            src={firebase.auth().currentUser.photoURL}
          />
        </div>
        :
        <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}
        />
        }
      </div>
    );
  }
}

export default App;
