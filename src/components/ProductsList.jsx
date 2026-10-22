import ProductCard from './ProductCard';

export default function ProductsList({ products }) {
    if (!products.length) {
        return <p className="empty-message">Продукты не найдены.</p>;
    }

    return (
        <div className="products">
            {products.map((product) => (
                <ProductCard key={product.id} recipe={product} />
            ))}
        </div>
    );
}

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";
import {
    createProduct,
    getProducts,
    updateProduct,
} from "../api/products";

export function AddProductForm() {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [editingId, setEditingId] = useState(null);

    const {
        data: products = [],
        isLoading,
        error: queryError,
    } = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    });

    const {
        mutate,
        isPending,
        isError,
        error: mutationError,
    } = useMutation({
        mutationFn: (product) => {
            if (editingId !== null) {
                return updateProduct({
                    id: editingId,
                    changes: product,
                });
            }

            return createProduct(product);
        },
        onSuccess: () => {
            setTitle("");
            setPrice("");
            setEditingId(null);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });

    const handleEdit = (product) => {
        setEditingId(product.id);
        setTitle(product.title);
        setPrice(String(product.price));
    };

    const handleCancel = () => {
        setEditingId(null);
        setTitle("");
        setPrice("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        mutate({
            title: title.trim(),
            price: Number(price),
            category: "phones",
            rating: 0,
        });
    };

    if (isLoading) {
        return <p>Загрузка товаров...</p>;
    }

    if (queryError) {
        return <p>Ошибка загрузки: {queryError.message}</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Название"
                required
            />

            <input
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                placeholder="Цена"
                type="number"
                min="0"
                required
            />

            <button type="submit" disabled={isPending}>
                {isPending
                    ? "Сохраняем..."
                    : editingId !== null
                        ? "Готово"
                        : "Добавить"}
            </button>

            {editingId !== null && (
                <button type="button" onClick={handleCancel}>
                    Отмена
                </button>
            )}

            {isError && (
                <p>Ошибка сохранения: {mutationError.message}</p>
            )}

            <ul>
                {products.map((product) => (
                    <li
                        key={product.id}
                        onDoubleClick={() => handleEdit(product)}
                        title="Дважды нажмите, чтобы изменить"
                        style={{ cursor: "pointer" }}
                    >
                        {product.title} — {product.price} — рейтинг: {product.rating}
                    </li>
                ))}
            </ul>
        </form>
    );
}