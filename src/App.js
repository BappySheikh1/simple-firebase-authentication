import './App.css';
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user,setUser]=useState({})

  const provider = new GoogleAuthProvider()

  const handleGoogleSignIn=()=>{
    signInWithPopup(auth , provider)
    .then(result =>{

      const user =result.user
      setUser(user)
      console.log(user)
    })
    .catch(error=>{
      console.error('error',error)
    })
  }

  const handleSignOut=()=>{
//  console.log('handle sign out');
signOut(auth)
.then(() =>{
  setUser({})
})
.catch(error =>{
  console.log(error);
  setUser({})
})
  }

  return (
    <div className="App">
     {/* consition ? true: false */}
     { user.email ? 
     
     <button onClick={handleSignOut}>Google Sign Out</button>
     :
     <button onClick={handleGoogleSignIn}>Google Sing in</button>
     },

     { user.email && <div>
      <h3>user name: {user.displayName}</h3>
      <p>email: {user.email}</p>
      <img src={user.photoURL} alt="" />
     </div>}
    </div>
  );
}

export default App;
