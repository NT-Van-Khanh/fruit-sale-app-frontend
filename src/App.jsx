import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './page/HomePage';
import SearchPage from './page/SearchPage';
import CartPage from './page/CartPage';
import PaymentPage from './page/PaymentPage'; 
import ProductDetailPage from './page/ProductDetailPage';
import OrderDetailPage from './page/OrderDetailPage';
function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/cart' element={<CartPage/>} />
        <Route path='/product/:productId' element={<ProductDetailPage/>} />
        <Route path='/payment' element={<PaymentPage />} />
        <Route path='/order-detail' element={<OrderDetailPage />} />
        {/* <Route path='/login' element={<LoginPage/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;


// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
