import React, { useState } from 'react';
import { useCart } from './CartContext.tsx'; 

function ShoppingCart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Calcula o total do carrinho
  const totalPrice = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  // Função para abrir o modal
  const handleConfirmOrder = () => {
    setIsModalOpen(true);
  };

  // Função para iniciar um novo pedido (limpa o carrinho e fecha o modal)
  const handleStartNewOrder = () => {
    clearCart();
    setIsModalOpen(false);
  };

  return (
    <div className="lg:max-w-[420px] w-full h-fit bg-white rounded-xl p-4 pb-8">
      <h2 className="text-red text-3xl font-bold">Your Cart ({cart.length})</h2>

      {cart.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img src="/assets/images/illustration-empty-cart.svg" alt="Carrinho vazio"/>
          <p className="text-rose-500 text-base font-medium">Your added items will appear here</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item, index) => (
              <div key={index} className="cart-item flex items-center justify-between py-6 border-b border-b-rose-100">
                <div className="product-info flex-1 flex flex-col gap-2">
                  <h3 className="font-medium text-sm">{item.product.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-red text-sm font-medium">{item.quantity}x</p>
                    <p className="text-rose-400 text-base font-normal "> @${item.product.price.toFixed(2)}</p>
                    <p className="text-rose-500 text-base font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  className=" group bg-red-500 text-white rounded-[50%] border border-rose-300 p-[2px] hover:border-red" 
                  onClick={() => removeFromCart(item.product)}
                >
                  <img className="w-2 group-hover:invert group-hover:brightness-100"  src="/assets/images/icon-remove-item.svg" alt="Botão de remover item do carrinho" aria-label='Botão de remover item do carrinho' />
                </button>

              </div>
            ))}
          </div>

          {/* Total do pedido */}
          <div className="total-price flex justify-between mt-8">
            <span className="text-rose-900 text-base font-normal">Order Total</span>
            <h3 className="text-2xl font-bold">${totalPrice.toFixed(2)}</h3>
          </div>

          <div className="bg-rose-50 my-5 rounded-xl flex gap-2 h-12 justify-center items-center">
            <img src="/assets/images/icon-carbon-neutral.svg" alt="Arvore" />
            <span className="font-normal text-base">This is a <span className="text-rose-900 font-bold text-base">carbon-neutral</span> delivery</span>
          </div>  
          {/* Botão Confirmar Pedido */}
          <button
            className="bg-green-500 py-2 px-4 bg-red rounded-3xl w-full h-12 text-rose-50 text-base font-bold hover:opacity-90"
            onClick={handleConfirmOrder}
          >
            Confirm Order
          </button>

          {/* Modal para confirmar pedido */}
          {isModalOpen && (
            <div className="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg shadow-lg max-w-[520px] w-full">
                
                <img  src="/assets/images/icon-order-confirmed.svg" alt="Ordem confirmada" />
                <div className="flex flex-col gap-3 mb-5">
                  <h2 className="text-3xl font-bold mt-5">Order Confirmed</h2>
                  <span className="text-rose-400 font-normal text-sm">we hope you enjoy your food!</span>
                </div>
                <div className="order-items bg-rose-50 rounded-xl p-4">
                  <div className="overflow-y-auto max-h-[260px]">
                    {cart?.map((item, index) => (
                      <div key={index} className="order-item">
                        <div className="flex items-center border-b border-rose-100 py-3">
                          {item.product.image && (
                            <img
                              className="w-14 h-14 rounded-[4px]"
                              src={item.product.image.mobile}
                              alt={item.product.name}
                              loading="lazy"
                            />
                          )}
                          
                          <div className="flex flex-col flex-1 pl-3">
                            <p className="text-rose-900 text-base font-medium">
                              {item.product.name}
                            </p>
                            <div className="flex gap-3">
                              <p className="font-medium text-red">x{item.quantity}</p>
                              <p className="text-rose-400">@ ${item.product.price.toFixed(2)}</p>
                            </div>
                          </div>
                          <p className="text-rose-900 font-semibold text-base">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                      </div>
                    ))}
                  </div>
                  {/* Total do pedido */}
                  <div className="order-total mt-4 flex justify-between">
                    <span className="text-sm font-normal">Order Total</span>
                    <h3 className="text-2xl font-bold ">${totalPrice.toFixed(2)}</h3>
                  </div>
                </div>


                {/* Botão para iniciar um novo pedido */}
                <button
                  className="mt-4 text-white py-2 px-4 rounded-3xl bg-red w-full h-12"
                  onClick={handleStartNewOrder}
                >
                  Start New Order
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ShoppingCart;
