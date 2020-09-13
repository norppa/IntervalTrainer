import React, { useEffect, useState } from 'react'
import NewExercise from './NewExercise'
import './Setup.css'

const Setup = (props) => {
    const [exercises, setExercises] = useState([])
    const [selected, setSelected] = useState('')
    const [newExerciseInputOpen, setNewExerciseInputOpen] = useState(false)
    const KEY = '@IntervalTrainerExercises'

    useEffect(() => {
        const exercises = JSON.parse(localStorage.getItem(KEY))
        if (exercises && exercises.length > 0) {
            setExercises(exercises)
            setSelected(0)
        }

    }, [])


    const addNewExercise = () => {
        setNewExerciseInputOpen(true)
    }

    const saveExercise = (exercise) => {
        const newExercises = exercises.concat(exercise)
        localStorage.setItem(KEY, JSON.stringify(newExercises))
        setExercises(newExercises)
        setSelected(newExercises.length - 1)
        setNewExerciseInputOpen(false)
    }

    const deleteExercises = () => {
        const newExercises = exercises.filter((exercise, i) => i != selected)
        localStorage.setItem(KEY, JSON.stringify(newExercises))
        setExercises(newExercises)
        if (newExercises.length == 0) {
            setSelected('')
        } else {
            if (selected > 0) {
                setSelected(selected => selected - 1)
            }
        }
    }

    const startWorkout = () => {
        props.startWorkout(exercises[selected])
    }

    if (newExerciseInputOpen) {
        return <NewExercise save={saveExercise} close={setNewExerciseInputOpen.bind(this, false)} />
    }

    return (
        <div className="Setup">

            {exercises.length > 0
                ? <label className="exercises">
                    Select exercise
                    <select value={selected} onChange={(event) => setSelected(event.target.value)}>
                        {exercises.map((exercise, i) => <option key={i} value={i}>{exercise.name}</option>)}
                    </select>
                </label>
                : <h2>You don't have any exercises saved!</h2>
            }

            {selected !== '' &&
                <div className="exerciseInfo">
                    <table>
                        <tbody>
                            <tr>
                                <th>Set #</th>
                                {exercises[selected].sets.map((set, i) => <th key={i}>{i + 1}</th>)}
                            </tr>
                            <tr>
                                <td>Reps</td>
                                {exercises[selected].sets.map((set, i) => <td key={i}>{set.reps}</td>)}
                            </tr>
                            <tr>
                                <td>Time</td>
                                {exercises[selected].sets.map((set, i) => <td key={i}>{set.time}</td>)}
                            </tr>
                        </tbody>
                    </table>
                    <span>Total reps: {exercises[selected].reps}</span>
                    <span>Total time: {exercises[selected].time} minutes</span>
                </div>
            }

            <div className="buttons">
                {selected !== '' && <button onClick={startWorkout}>Start Workout!</button>}
                {selected !== '' && <button onClick={deleteExercises}>Delete</button>}
                <button onClick={addNewExercise}>Add New Exercise</button>
            </div>
        </div>
    )
}

export default Setup