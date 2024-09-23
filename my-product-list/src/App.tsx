import React from 'react';
import { CartProvider } from './Components/CartContext.tsx';
import ProductList from './Components/ProductList.tsx';
import ShoppingCart from './Components/ShoppingCart.tsx';

function App() {
  return (
    <CartProvider>
      <div className="flex lg:flex-row lg:py-10 lg:px-14 sm:p-4 bg-rose-50 gap-7 App sm:flex-col">
        <div className="flex flex-col gap-8">
          <h1 className="text-rose-900 text-5xl sm:text-[42px] font-bold">Desserts</h1>
          <ProductList />
        </div>
        <ShoppingCart />
      </div>
    </CartProvider>
  );
}

export default App;
