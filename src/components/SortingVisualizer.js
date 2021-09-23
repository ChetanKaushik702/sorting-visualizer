import React, { useEffect, useState, useCallback } from 'react'
import './SortingVisualizer.css'
import mergeSortHandler from '../sortingAlgorithms/mergeSort'

function SortingVisualizer() {

    const PRIMARY_COLOR = 'green'
    const SECONDARY_COLOR = 'red'
    const ANIMATION_SPEED_MS = 1
    const NUMBER_OF_ARRAY_BARS = 310

    const [array, setArray] = useState([])

    const randomIntFromRange = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const fillArray = useCallback(() => {
        const arr = []
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            arr.push(randomIntFromRange(5, 500))
        }
        return arr;
    }, [])

    useEffect(() => {
        setArray(fillArray())
    }, [setArray, fillArray])

    const resetArray = () => {
        setArray(fillArray())
        resetColor('blue')
    }

    const resetColor = (color) => {
        const bars = document.getElementsByClassName('array-bar')
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = color
        }
    }


    const callmergeSort = () => {
        const animations = mergeSortHandler(array)

        const arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < animations.length; i++) {
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
              const [barOneIdx, barTwoIdx] = animations[i];
              const barOneStyle = arrayBars[barOneIdx].style;
              const barTwoStyle = arrayBars[barTwoIdx].style;
              const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * ANIMATION_SPEED_MS);
            } else {
              setTimeout(() => {
                const [barOneIdx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    

    return (
        <>
        <div>
            {
                array.map((value, index) => {
                    return (
                        <div key={index} className="array-bar" style={{height: `${value}px`, backgroundColor: 'blue'}}>
                        </div>
                    )
                })
            }
        </div>
        <button className="btn" onClick={resetArray}>Generate new array</button>
        <button className="btn" onClick={callmergeSort}>Merge sort</button>
        </>
    )
}

export default SortingVisualizer
