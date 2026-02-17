import './App.css'
import { Navbar } from './components/Navbar';
import { ComingSoon } from './views/ComingSoon';
import { MaterialsSection } from './views/MaterialsSection';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />   
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/materiales" element={<MaterialsSection />} />
      </Routes>
    </>
  )
}

export default App