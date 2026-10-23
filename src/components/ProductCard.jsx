import { Card } from 'antd';
import React from 'react';
import {useProductStore} from '../store/useProductStore'

const ProductCard = ( product ) => {

    const { cart, favorites, toggleFavorite } = useProductStore()

    const isFavorite = favorites.some(
        (item) => item.id === recipe.id
    )

    const isCart = cart.some(
        (item) => item.id === recipe.id
    )
    return (
        <div>
            <Card key={product.id}
                title="Дважды нажмите, чтобы изменить"
                style={{ cursor: "pointer" }}>
                <Link to={`/product/${product.id}`}>
                    <img src={product.image} alt={product.name} />

                    <h3>{product.name}</h3>
                    <span>{product.cost}</span>
                </Link>

                <p>Рейтинг: ⭐ {product.rating}</p>

                <button onClick={() => toggleFavorite(recipe)}>
                    {isFavorite ? 'Убрать из избранного' : 'В избранное'}
                    {isCart ? 'Убрать из корзины' : 'В корзину'}
                </button>
            </Card>
        </div>
    );
}

export default ProductCard;