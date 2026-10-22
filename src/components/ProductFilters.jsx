import { useSearchParams } from "react-router-dom"

const FILTERS = [
    { value: 'name', label: 'По названию' },
    { value: 'rating', label: 'По рейтингу' },
    { value: 'caloriesPerServing', label: 'По калориям' }
]

export default function RecipeFilters() {
    const [searchParams, setSearchParams] = useSearchParams()

    const search = searchParams.get('search') || ''
    const sortBy = searchParams.get('sortBy') || 'name'
    const order = searchParams.get('order') || 'asc'

    function handleSearch(e) {
        const params = new URLSearchParams(searchParams)

        if (e.target.value) {
            params.set('search', e.target.value)
        } else {
            params.delete('search')
        }

        setSearchParams(params)
    }

    function handleFiltered(value) {
        const params = new URLSearchParams(searchParams)
        params.set('sortBy', value)
        setSearchParams(params)
    }

    function handleOrder(value) {
        const params = new URLSearchParams(searchParams)
        params.set('order', value)
        setSearchParams(params)
    }

    return (
        <div className="search">
            <input
                value={search}
                onChange={handleSearch}
                placeholder="Найти рецепт..."
            />

            <div className="sort">
                <div className="sort-1">
                    {FILTERS.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => handleFiltered(s.value)}
                            style={{
                                fontWeight: sortBy === s.value ? 700 : 400
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                <div className="sort-2">
                    <button
                        className={order === 'asc' ? 'active' : ''}
                        onClick={() => handleOrder('asc')}
                    >
                        По возрастанию
                    </button>

                    <button
                        className={order === 'desc' ? 'active' : ''}
                        onClick={() => handleOrder('desc')}
                    >
                        По убыванию
                    </button>
                </div>
            </div>
        </div>
    )
}