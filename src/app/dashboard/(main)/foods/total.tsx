import { api } from "~/trpc/server";


export default async function Total() {

    const total = await api.food.getTotal();

    return (
        <div className="bg-white rounded-3xl p-6 hidden lg:grid grid-cols-4">
            <div className="space-y-2">
                <h1 className="text-xs text-accent/60 font-medium">Жиры</h1>

                <h1 className="text-sm text-accent font-medium">{total.fat}</h1>
            </div>

            <div className="space-y-2">
                <h1 className="text-xs text-accent/60 font-medium">Углеводы</h1>

                <h1 className="text-sm text-accent font-medium">{total.carbonydrates}</h1>
            </div>

            <div className="space-y-2">
                <h1 className="text-xs text-accent/60 font-medium">Белки</h1>

                <h1 className="text-sm text-accent font-medium">{total.squirrels}</h1>
            </div>

            <div className="space-y-2">
                <h1 className="text-xs text-accent/60 font-medium">Калории</h1>

                <h1 className="text-sm text-accent font-medium">{total.calories}</h1>
            </div>
        </div>
    )
}

