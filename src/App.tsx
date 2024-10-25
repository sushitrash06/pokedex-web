import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/header';
import HomePage from './pages/home';
import DetailPage from './pages/details';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<DetailPage />} /> {/* Updated path to include id */}
      </Routes>
    </Router>
  );
}

export default App;
