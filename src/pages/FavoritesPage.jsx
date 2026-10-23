import React from 'react';

const FavoritesPage = () => {
    return (
        <div>
            <ul style={{
                textDecoration: 'none'
            }}>
                {favorites.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onDoubleClick={() => handleEdit(product)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default FavoritesPage;
