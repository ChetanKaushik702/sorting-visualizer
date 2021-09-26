const insertionSortHandler = (array) => {
    const animations = []
    console.log(array)
    insertionSort(array, animations)
    console.log(array)
    return animations
}

const insertionSort = (array, animations) => {
    for (let i = 1; i < array.length; i++) {
        const key = array[i]
        let j = i - 1

        animations.push([i, 0, 'position'])
        
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j]

            animations.push([j + 1, array[j + 1], 'shifting', 0])
            animations.push([j + 1, array[j + 1], 'shifting', 1])
            
            j--
        }
        array[j + 1] = key
        animations.push([j + 1, key, 'shifting'])
        animations.push([i, 1, 'position'])
    }
}

export default insertionSortHandler