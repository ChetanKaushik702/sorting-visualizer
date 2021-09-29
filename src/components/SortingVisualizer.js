import React, { useEffect, useState, useCallback } from 'react'
import './SortingVisualizer.css'
import mergeSortHandler from '../sortingAlgorithms/mergeSort'
import quickSortHandler from '../sortingAlgorithms/quickSort'
import insertionSortHandler from '../sortingAlgorithms/insertionSort'
import selectionSortHandler from '../sortingAlgorithms/selectionSort'

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

    const callquickSort = () => {
        const animations = quickSortHandler(array)
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const operation = animations[i][2]

            // comparison
            if (operation === 'comparison') {
                const [barOneIdx, barTwoIdx] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style

                const color = animations[i][3] === 0 ? 'red' : 'blue'
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * ANIMATION_SPEED_MS)
            }

            // swapping
            else if (operation === 'swapping') {
                const decider = animations[i][3]
                if (decider === 0) {
                    const [barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style
                    
                    const color = 'orange'
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color
                        barTwoStyle.backgroundColor = color
                    }, i * ANIMATION_SPEED_MS)
                }
                else if (decider === 1) {
                    const [barOneIdx, barTwoIdx] = animations[i]
                    const barOneStyle = arrayBars[barOneIdx].style
                    const barTwoStyle = arrayBars[barTwoIdx].style

                    const color = 'blue'
                    setTimeout(() => {
                        barOneStyle.backgroundColor = color
                        barTwoStyle.backgroundColor = color
                    }, i * ANIMATION_SPEED_MS)
                }
                else if (decider === 2) {
                    const [barIdx, height] = animations[i]
                    const barOneStyle = arrayBars[barIdx].style
                    
                    setTimeout(() => {
                        barOneStyle.height = `${height}px`
                    }, i * ANIMATION_SPEED_MS)
                }
                else {
                    const [barIdx, height] = animations[i]
                    const barOneStyle = arrayBars[barIdx].style
                    
                    setTimeout(() => {
                        barOneStyle.height = `${height}px`
                    }, i * ANIMATION_SPEED_MS)
                }
            }

            // updation
            else {
                const [barIdx, height, ,decider] = animations[i]
                const bar = arrayBars[barIdx].style
                setTimeout(() => {
                    if (decider === 0) bar.backgroundColor = 'green'
                    bar.height = `${height}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }

    }

    const callinsertionSort = () => {
        const animations = insertionSortHandler(array)
        const arrayBars = document.getElementsByClassName('array-bar');

        // insertion sort assumes the first element to be sorted
        arrayBars[0].style.backgroundColor = 'green'

        for (let i = 0; i < animations.length; i++) {
            const operation = animations[i][2]
            if (operation === 'position') {
                const [barIdx, decoder] = animations[i]
                const barStyle = arrayBars[barIdx].style
                const color = decoder === 0 ? 'red' : 'green'
                
                setTimeout(() => {
                    barStyle.backgroundColor = color
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIdx, height, , decoder] = animations[i]
                const barStyle = arrayBars[barIdx].style
                const color = decoder === 0 ? 'orange' : 'green'
                setTimeout(() => {
                    barStyle.backgroundColor = color
                    barStyle.height = `${height}px`
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    const callselectionSort = () => {
        const animations = selectionSortHandler(array)
        const arrayBars = document.getElementsByClassName('array-bar');

        for (let i = 0; i < animations.length; i++) {
            const operation = animations[i][2]
            if (operation === 'comparison') {
                const [barOneIdx, barTwoIdx, ,decoder] = animations[i]
                const barOneStyle = arrayBars[barOneIdx].style
                const barTwoStyle = arrayBars[barTwoIdx].style

                const color = decoder === 0 ? 'red' : 'blue'
                setTimeout(() => {
                    barOneStyle.backgroundColor = color
                    barTwoStyle.backgroundColor = color
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                const [barIdx, height, ,decoder] = animations[i]
                const barStyle = arrayBars[barIdx].style

                setTimeout(() => {
                    barStyle.height = `${height}px`
                    if (decoder === 0)  barStyle.backgroundColor = 'green'
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
        <button className="btn" onClick={callquickSort}>Quick sort</button>
        <button className="btn" onClick={callinsertionSort}>Insertion sort</button>
        <button className="btn" onClick={callselectionSort}>Selection sort</button>
        </>
    )
}

export default SortingVisualizer
