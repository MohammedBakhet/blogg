import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import { UserContextProvider } from './Components/UserContext';
import CreatePost from './Pages/CreatePost';

const App = () => {
  return (
    <UserContextProvider>
   <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
   </Router>
   </UserContextProvider>
  );
}

export default App;
