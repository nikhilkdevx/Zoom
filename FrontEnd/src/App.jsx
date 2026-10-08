import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Authentication";
import socket from "./socket";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}/>
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </BrowserRouter>
    
  );
};

