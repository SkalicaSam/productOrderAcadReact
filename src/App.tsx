
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorPage } from './pages/AuthorsPage'
import { ProductPage } from './pages/ProductsPage'
import { Link } from 'react-router-dom';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductEditPage } from './pages/ProductEditPage';

function App() {
 

 



  return (
    <BrowserRouter>
    <div>
      <nav>
        <ul>nav menu
          <li>
            <Link to="/authors">Authors</Link>   
            {/* <> <br/></> */}
            </li>
            <li>
            <Link to="/products">Products</Link>
            
          </li>
        </ul>
      </nav>
    </div>
      <Routes>
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product/edit/:id" element={<ProductEditPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
