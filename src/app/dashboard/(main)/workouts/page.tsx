import { api } from "~/trpc/server";
import CreateUpdateWorkout from "./create-update";
import { type Workout } from "~/lib/shared/types/workout";
import UpdateExercise from "./update-exercise";
import DeleteExercise from "./delete-exercise";
import DeleteWorkout from "./delete";
import Link from "next/link";

function WorkoutItem({
    workout
} : {
    workout: Workout
}) {

    return (
        <div className="flex flex-col gap-4 p-6 bg-white rounded-3xl">
            <div className="flex justify-between items-center pb-4 border-b border-b-muted">
                <h1 className="text-base text-accent font-semibold">{workout.name}</h1>

                <div className="flex gap-2">
                    <CreateUpdateWorkout workout={workout} />
                    <DeleteWorkout id={workout.id} />
                </div>
            </div>

            {workout.exercises.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-sm text-accent font-semibold">{item.name}</h1>
                        <p className="text-xs text-accent font-semibold opacity-60">{item.setRepeatWeight}</p>
                    </div>

                    <div className="flex gap-2">
                        <UpdateExercise exercise={item} />
                        <DeleteExercise id={item.id} />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default async function WorkoutsDashboardPage() {
    const workouts = await api.workout.getAll();

    return (
        <div className="flex flex-col gap-6 pb-14 lg:pb-0">
            <Link href="/" className="text-center text-primary text-2xl font-bold lg:hidden">FITLOG</Link>
            <div className="bg-white rounded-3xl p-6">
                <h1 className="text-accent text-base font-semibold text-center lg:text-left">Тренировки</h1>
            </div>

            {workouts.map((item, index) => (
                <WorkoutItem key={index} workout={item} />
            ))}

            <CreateUpdateWorkout/>
        </div>
    )
}