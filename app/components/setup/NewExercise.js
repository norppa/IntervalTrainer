import React, { useState } from 'react'
import './NewExercise.css'

const NewExercise = (props) => {
    const [exerciseName, setExerciseName] = useState('')
    const [exerciseSets, setExerciseSets] = useState([{ reps: '', time: '' }])
    const [error, setError] = useState('')

    const use = (setter) => (event) => setter(event.target.value)

    const onExerciseSetChange = (field, index) => (event) => {
        const value = Number(event.target.value)
        if (isNaN(value)) {
            return
        }

        let newExerciseSets = exerciseSets.map((exerciseSet, i) => {
            if (index === i) {
                return { ...exerciseSet, [field]: value }
            } else {
                return exerciseSet
            }
        })

        // remove all empty ingredients except the last
        newExerciseSets = newExerciseSets.filter((x, i) => i == newExerciseSets.length - 1 || x.reps != '' || x.time != '')

        // if a property value was added to the last item, create a new empty last item
        if (index == exerciseSets.length - 1) {
            newExerciseSets = newExerciseSets.concat({ reps: '', time: '' })
        }

        // if second to last ingredient is empty, remove the last (empty) ingredient
        if (index == exerciseSets.length - 2) {
            const { reps, time } = newExerciseSets[index]
            if (reps == '' && time == '') {
                newExerciseSets = newExerciseSets.slice(0, newExerciseSets.length - 1)
            }
        }

        setExerciseSets(newExerciseSets)
    }

    const saveExercise = () => {
        if (!exerciseName) {
            setError('Exercise name is required')
            setTimeout(() => setError(''), 5000)
            return
        }

        if (exerciseSets.some((set, i) => (!set.reps || !set.time) && (i != exerciseSets.length - 1))) {
            setError('Zero values not allowed in reps or time')
            setTimeout(() => setError(''), 5000)
            return
        }

        props.save({
            name: exerciseName,
            sets: exerciseSets.slice(0, exerciseSets.length - 1),
            time: exerciseSets.reduce((acc, cur) => acc + cur.time, 0),
            reps: exerciseSets.reduce((acc, cur) => acc + cur.reps, 0)
        })
    }

    const cancel = () => {
        setExerciseName('')
        setExerciseSets([{ reps: '', time: '' }])
        props.close()

    }

    return (
        <div className="NewExercise">
            <h2>New Exercise</h2>

            {error && <div className="error">{error}</div>}

            <span className="name">
                Name:
                <input type="text"
                    id="nameInput"
                    value={exerciseName}
                    onChange={use(setExerciseName)} /></span>

            {
                exerciseSets.map((exerciseSet, i) => {
                    return (
                        <div key={i} className="setInputContainer">
                            Set #{i + 1}
                            <span className="setInputRow">
                                Reps:
                                <input type="text" value={exerciseSet.reps || ''} onChange={onExerciseSetChange('reps', i)} />
                                Time:
                                <input type="text" value={exerciseSet.time || ''} onChange={onExerciseSetChange('time', i)} />
                            </span>
                        </div>
                    )
                })
            }
            <div className="total">
                <span>Total reps: {exerciseSets.reduce((acc, cur) => acc + cur.reps, 0)}</span>
                <span>Exercise time: {exerciseSets.reduce((acc, cur) => acc + cur.time, 0)}</span>
            </div>

            <div>
                <button onClick={saveExercise}>Save</button>
                <button onClick={cancel}>Cancel</button>

            </div>

        </div>
    )
}

export default NewExercise