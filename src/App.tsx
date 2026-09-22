import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Website from './pages/Website'
import Poster from './pages/Poster'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/poster" element={<Poster />} />
      </Routes>
    </BrowserRouter>
  )
}
