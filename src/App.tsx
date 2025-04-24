
import './App.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthorPage } from './pages/AuthorsPage'
import { ProductPage } from './pages/ProductsPage'
import { Link } from 'react-router-dom';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { ProductEditPage } from './pages/ProductEditPage';
import Orders from './components/Orders';
import OrderDetailPage from './pages/OrderDetailPage';
import Cart from './components/Cart';

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
            <li>
                <Link to="/orders">Orders</Link>
            </li>
            <li>
                <Link to="/cart">Cart</Link>
            </li>




        </ul>
      </nav>
    </div>
      <Routes>
        <Route path="/authors" element={<AuthorPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/product/edit/:id" element={<ProductEditPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/:id" element={<OrderDetailPage />} />
        <Route path="/cart" element={<Cart />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
