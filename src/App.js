import NavBar from "./Components/NavBar";
import NavBar2 from "./Components/NavBar_2";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Users from "./Components/Users";
import User_details from "./Components/User_details";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (

    <div>
      {/* <NavBar /> */}
      <BrowserRouter>
      <NavBar2 />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/user_detail" element={<User_details />} />
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
