// merge-sort handler
const mergeSortHandler = (array) => {
    const auxiliaryArray = [...array]
    const animations = []
    console.log(array)
    mergeSort(array, 0, array.length - 1, auxiliaryArray, animations)
    return animations
}
// merge-sort
const mergeSort = (mainArray, beg, end, auxiliaryArray, animations) => {
    if (beg < end) {
        const mid = (end + beg) >> 1
        mergeSort(auxiliaryArray, beg, mid, mainArray, animations)
        mergeSort(auxiliaryArray, mid + 1, end, mainArray, animations)
        merge(mainArray, beg, mid, end, auxiliaryArray, animations)
    }
}

const merge = (mainArray, beg, mid, end, auxiliaryArray, animations) => {
    let k = beg, i = beg, j = mid + 1
    while (i <= mid && j <= end) {
        // we are comparing the value at indices i and j to mark them
        animations.push([i, j])

        // again push these indices to unmark them
        animations.push([i, j])

        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // overwrite the value at index k in the main array
            animations.push([k, auxiliaryArray[i]])

            mainArray[k++] = auxiliaryArray[i++]
        } else {
            // overwrite the value at index k in the main array
            animations.push([k, auxiliaryArray[j]])

            mainArray[k++] = auxiliaryArray[j++]
        }
    }

    while (i <= mid) {
        animations.push([i, i])
        animations.push([i, i])

        animations.push([k, auxiliaryArray[i]])
        mainArray[k++] = auxiliaryArray[i++]
    }

    while (j <= end) {
        animations.push([j, j])
        animations.push([j, j])

        animations.push([k, auxiliaryArray[j]])
        mainArray[k++] = auxiliaryArray[j++]
    }
}

export default mergeSortHandler