const quickSortHandler = (array) => {
    const animations = []
    console.log(array)
    quickSort(array, 0, array.length - 1, animations)
    console.log(array)
    console.log(animations)

    return animations
}

const quickSort = (mainArray, beg, end, animations) => {
    if (beg <= end) {
        const split = partition(mainArray, beg, end, animations)
        quickSort(mainArray, beg, split - 1, animations)
        quickSort(mainArray, split + 1, end, animations)
    }
}

const partition = (mainArray, beg, end, animations) => {
    const pivot = mainArray[end]
    let i = beg - 1, j = beg
    while (j < end) {
        // comparison between indices j and end for marking
        animations.push([j, end, 'comparison', 0])
        
        // comparison between indices j and end for undoing the changes
        animations.push([j, end, 'comparison', 1])

        if (mainArray[j] <= pivot) {
            i++

            animations.push([i, j, 'swapping', 0])

            animations.push([i, j, 'swapping', 1])

            // swap the values at indices i and j
            let temp = mainArray[i]
            mainArray[i] = mainArray[j]
            mainArray[j] = temp

            animations.push([i, mainArray[i], 'swapping', 2])
            animations.push([j, mainArray[j], 'swapping', 3])
        }

        j++
    }

    // swap the values at indices i + 1 and end
    let temp = mainArray[i + 1]
    mainArray[i + 1] = mainArray[end]
    mainArray[end] = temp
    animations.push([i + 1, mainArray[i + 1], 'updation', 0])
    animations.push([end, mainArray[end], 'updation', 1])

    return i + 1
}

export default quickSortHandler