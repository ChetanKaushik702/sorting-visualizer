const selectionSortHandler = (array) => {
    const animations = []
    selectionSort(array, animations)
    return animations
}

const selectionSort = (array, animations) => {
    for (let i = 0; i < array.length - 1; i++) {
        let pos = i
        for (let j = i + 1; j < array.length; j++) {
            animations.push([pos, j, 'comparison', 0])
            animations.push([pos, j, 'comparison', 1])
            if (array[pos] > array[j])
                pos = j
        }
        let temp = array[i]
        array[i] = array[pos]
        array[pos] = temp
        animations.push([i, array[i], 'swapping', 0])
        animations.push([pos, array[pos], 'swapping', 1])
    }
    animations.push([array.length - 1, array[array.length - 1], 'final', 0])
}

export default selectionSortHandler