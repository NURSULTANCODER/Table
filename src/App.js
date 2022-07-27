import {Routes, Route} from "react-router-dom";
import Table from "./pages/Table/Table";
import './App.css';

function App() {
  return (
    <div className="container">
        <Routes>
            <Route path="/" element={<Table/>}/>
        </Routes>
    </div>
  );
}

export default App;
