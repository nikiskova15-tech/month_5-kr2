import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.jsx'

export default function CartPage() {
    const cart = useProductStore((state) => state.cart)
    const changeQuantity = useProductStore((state) => state.changeQuantity)
    const removeFromCart = useProductStore((state) => state.removeFromCart)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <div>
            <div >
                <h1>Ваша корзина.</h1>
            </div>

            {cart.length ? (
                <div >
                    <div>
                        {cart.map((item) => (
                            <div key={item.id}>
                                <Link to={`/products/${item.id}`}>

                                    <img src={item.images[0]} alt={item.title} />

                                </Link>

                                <div >
                                    <Link to={`/products/${item.id}`} className="product-title">
                                        {item.title}
                                    </Link>
                                    <span>{item.category?.name}</span>
                                    <div className="quantity">
                                        <button
                                            onClick={() => changeQuantity(item.id, -1)}
                                        >
                                            −
                                        </button>
                                        <b>{item.quantity}</b>
                                        <button
                                            onClick={() => changeQuantity(item.id, 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                <strong>{(item.price * item.quantity)}</strong>
                                <button onClick={() => removeFromCart(item.id)}                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    <aside >
                        <p>ИТОГО</p>
                        <div><span>Товары</span><b>{(total)}</b></div>
                        <div >
                            <span>Итого</span>
                            <b>{(total + (total > 150 ? 0 : 12))}</b>
                        </div>
                        <button type='primary'
                            onClick={() => window.alert('Оформление заказа скоро появится.')}
                        >
                            Перейти к оформлению
                        </button>
                    </aside>
                </div>
            ) : (
                <div>
                    <h3>Корзина пока пуста</h3>
                    <Link to="/">            Перейти в каталог          </Link>
                </div>
            )}
        </div>
    )
}
