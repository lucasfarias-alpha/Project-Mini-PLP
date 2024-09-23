import React, { createContext, useContext, useState, ReactNode } from 'react';

// Definição dos tipos
interface Product {
  name: string;
  category: string;
  price: number;
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  decrementQuantity: (product: Product) => void;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode;
}

// Criando o contexto do carrinho
const CartContext = createContext<CartContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Componente Provider para o carrinho
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Adicionar produto ao carrinho
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.product.name === product.name);
      if (itemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[itemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { product, quantity: 1 }];
      }
    });
  };

  // Remover produto do carrinho
  const removeFromCart = (product: Product) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.name !== product.name));
  };

  // Incrementar quantidade
  const incrementQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.name === product.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrementar quantidade
  const decrementQuantity = (product: Product) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.product.name === product.name && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove item se a quantidade for 0
    );
  };

  // Limpar todo o carrinho
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
