import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import AddItem from './pages/AddItem';
import ErrorPage from './pages/ErrorPage';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/items/:id' element={<ItemPage/>} />
          <Route path='/add-item' element={<AddItem/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
