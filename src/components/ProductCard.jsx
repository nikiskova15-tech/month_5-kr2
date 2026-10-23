import { Card } from 'antd'
import { useNavigate, Link } from 'react-router-dom'
import { useProductStore } from '../store/useProductStore.jsx'

function ProductCard({ product }) {
    const navigate = useNavigate()
    const { cart, favorites, toggleFavorite, addToCart } = useProductStore()

    const isCart = cart.some((item) => item.id === product.id)
    const isFavorite = favorites.some((item) => item.id === product.id)

    return (
        <Card style={{ cursor: 'pointer' }}
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <Link>
                <img src={product.image} alt={product.title} loading="lazy" />
                <h3>{product.title}</h3>
                <span>{product.price} $</span>
            </Link>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: "space-between",
                maxWidth: 1000
            }}>
                <button type='button' onClick={() => toggleFavorite(product)}>
                {isFavorite ? 'Убрать из избранного' : 'В избранное'}
            </button>
            <button type='button' onClick={() => addToCart(product)}>
                {isCart ? 'Убрать из корзины' : 'В корзину'}
            </button>
            </div>
        </Card>
    )
}

export default ProductCard