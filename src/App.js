import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import ListUsers from './pages/ListUsers';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import CreateUser from './pages/CreateUser';

function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/users" element={<ListUsers />}/>
        <Route path="/create-user" element={<CreateUser />}/>
      </Routes>
    </Router>
  );
}

export default App;
