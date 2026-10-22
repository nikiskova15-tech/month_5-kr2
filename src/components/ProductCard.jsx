import { Link } from "react-router-dom"
import { useRecipeStore } from "../store/useRecipeStore"

export default function ProductCard({ recipe }) {
    const { favorites, toggleFavorite } = useRecipeStore()

    const isFavorite = favorites.some(
        (item) => item.id === recipe.id
    )

    return (
        <div className="recipe-card">
            <Link to={`/recipes/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.name} />

                <h3>{recipe.name}</h3>
            </Link>

            <p>Кухня: {recipe.cuisine}</p>
            <p>Рейтинг: ⭐ {recipe.rating}</p>

            <button onClick={() => toggleFavorite(recipe)}>
                {isFavorite ? 'Убрать из избранного' : 'В избранное'}
            </button>
        </div>
    )
}