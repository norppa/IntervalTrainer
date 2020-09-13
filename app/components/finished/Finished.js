import React from 'react'
import './Finished.css'

const Finished = (props) => {

    const getClassName = (i) => {
        if (props.done[i] === true) return 'finished'
        if (props.done[i] === false) return 'unfinished'
        return 'canceled'
    }

    const finishedSets = props.done.reduce((acc, cur) => acc + (cur ? 1 : 0), 0)
    const finishedReps = props.exercise.sets.reduce((acc, cur, i) => {
        if (props.done[i]) {
            return acc + cur.reps
        } else {
            return acc
        }
    }, 0)
    const totalTime = props.exercise.sets.reduce((acc, cur) => acc + cur.time, 0)

    return (
        <div className="Finished">
            <h2>Workout Finished!</h2>
            <div>Total number of sets finished: {finishedSets} </div>
            <div>Total number of reps finished: {finishedReps} </div>
            <div>Time spent: {totalTime} minutes</div>

            <table>
                <tbody>
                    <tr>
                        <td>Set #</td>
                        {props.exercise.sets.map((set, i) => <td key={i} className={getClassName(i)}>{i + 1}</td>)}
                    </tr>
                    <tr>
                        <td>Reps</td>
                        {props.exercise.sets.map((set, i) => <td key={i} className={getClassName(i)}>{set.reps}</td>)}
                    </tr>
                    <tr>
                        <td>Time</td>
                        {props.exercise.sets.map((set, i) => <td key={i} className={getClassName(i)}>{set.time}</td>)}
                    </tr>

                </tbody>
            </table>

            <button onClick={props.prepWorkout}>Start New Exercise</button>
        </div>
    )
}

export default Finished