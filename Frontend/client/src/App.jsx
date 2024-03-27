// import './App.css'
// // import LandPage from './Component/LandPage'
// // import Dummy from "./Component/Dummy"
// // import Singer from "./Component/Singer"
// // import UserInput from './Component/UserInput';
// import Update from  "./Component/Update"

// function App() {
//   return (
//     <>
//       {/* <LandPage /> */}
//       {/* <Dummy/> */}
//      {/* <Singer/> */}
//      {/* <UserInput/> */}
//      <Update/>
//     </>
//   )
// }

// export default App;


import React from 'react';
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navigation from './Component/Navigation';
import LandPage from './Component/LandPage';
import Dummy from './Component/Dummy';
import Singer from './Component/Singer';
import UserInput from './Component/UserInput';
import Update from './Component/Update';
import Register from './Component/Register';
import Logout from './Component/Logout';

function App() {
  return (
      <>
        <Navigation />
        <Routes>
          <Route path="/"  element={<LandPage/>} />
          <Route path="/dummy" element={<Dummy/>} />
          <Route path="/singer" element={<Singer/>} />
          <Route path="/user-input" element={<UserInput/>} />
          <Route path="/update" element={<Update/>} />
          <Route path='/login' element={<Register/>}/>
          <Route path='/logout' element={<Logout />}></Route>
        </Routes>
      </>
  );
}

export default App;
