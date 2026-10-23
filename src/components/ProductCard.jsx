import { Card } from 'antd';
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.jsx'

const ProductCard = (product) => {
    const { cart, favorites, toggleFavorite, addToCart } = useProductStore()

    const isCart = cart.some((item) => item.id === product.id)
    const isFavorite = favorites.some((item) => item.id === product.id)
    return (
        <div>
            <Card key={product.id}
                title="Дважды нажмите, чтобы изменить"
                style={{ cursor: "pointer" }}>
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.title} loading="lazy" />
                    <h3>{product.title}</h3>
                </Link>        
                <span>{product.price}</span>
                <button type='button' onClick={() => toggleFavorite(product)}>
                    {isFavorite ? 'Убрать из избранного' : 'В избранное'}
                </button>
                <button type='button' onClick={() => addToCart(product)}>
                    {isCart ? 'Убрать из корзины' : 'В корзину'}
                </button>
            </Card>
        </div>
    );
}

export default ProductCard;