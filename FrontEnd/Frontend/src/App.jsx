import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../src/pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element= {<Home />}/>
      </Routes>
    </BrowserRouter>
    
  );
};

