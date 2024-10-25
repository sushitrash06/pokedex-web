// App.tsx
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/header';
import HomePage from './pages/home';
import DetailPage from './pages/details';
import { SearchProvider } from './context/seacrh-context';

function App() {
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
