import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Setup from './components/setup/Setup'
import Workout from './components/workout/Workout'
import Finished from './components/finished/Finished'
import './index.css'

const App = () => {
    const [ screen, setScreen ] = useState('beforeWorkout')
    const [ exercise, setExercise ] = useState({})
    const [ done, setDone ] = useState([])

    const prepWorkout = () => {
        setDone([])
        setExercise({})
        setScreen('beforeWorkout')
    }
    
    const startWorkout = (exercise) => {
        setExercise(exercise)
        setScreen('duringWorkout')
    }

    const endWorkout = (done) => {
        setDone(done)
        setScreen('afterWorkout')
    }

    const Content = () => {
        switch (screen) {
            case 'beforeWorkout':
                return <Setup startWorkout={startWorkout} />
            case 'duringWorkout':
                return <Workout exercise={exercise} endWorkout={endWorkout} />
            case 'afterWorkout':
                return <Finished exercise={exercise} done={done} prepWorkout={prepWorkout} />
            default:
                return <Error />
        }
    }

    return (
        <div className="IntervalTrainer">
            <div className="headerContainer">
                <h1>Interval Trainer</h1>
            </div>

            <Content />
        </div>
    )
     
}

ReactDOM.render(<App />, document.getElementById('app'))