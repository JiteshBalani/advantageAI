import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import ItemPage from './pages/ItemPage';
import AddItem from './pages/AddItem';
import ErrorPage from './pages/ErrorPage';
import MyRequests from './pages/MyRequests';

function App() {

  return (
    <BrowserRouter>
      <div className='mx-5 p-2'>
        <Header/>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path='/items/:id' element={<ItemPage/>} />
          <Route path='/add-item' element={<AddItem/>} />
          <Route path='/my-requests' element={<MyRequests/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
