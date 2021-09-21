import React, { useEffect, useState, useCallback } from 'react'
import './SortingVisualizer.css'

function SortingVisualizer() {

    const [array, setArray] = useState([])

    const randomIntFromRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const fillArray = useCallback(() => {
        const arr = []
        for (let i = 0; i < 80; i++) {
            arr.push(randomIntFromRange(5, 500))
        }
        return arr;
    }, [])

    useEffect(() => {
        setArray(fillArray())
    }, [setArray, fillArray])

    const resetArray = () => {
        setArray(fillArray())
    }

    return (
        <>
        <div>
            {
                array.map((value, index) => {
                    return (
                        <div key={index} className="array-bar" style={{height: `${value}px`}}>
                        </div>
                    )
                })
            }
        </div>
        <button onClick={resetArray}>Generate new array</button>
        </>
    )
}

export default SortingVisualizer
