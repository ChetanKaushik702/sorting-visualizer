const heapSortHandler = (array) => {
    const animations = []
    heapSort(array, animations)
    return animations
}

const heapSort = (array, animations) => {
    // build a heap
    buildHeap(array, array.length, animations)
    let N = array.length;
    for (let i = array.length - 1; i > 0; i--) {
        // swap array[0] with array[N - 1]
        let temp = array[0]
        array[0] = array[N - 1]
        array[N - 1] = temp
        N--
        animations.push([0, array[0], 'sorting', 0])
        animations.push([N, array[N], 'sorting', 1])
        maxHeapify(array, N, 0, animations)
    }
    animations.push([0, array[0], 'sorting', 1])
}

const maxHeapify = (array, N, i, animations) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;
    if (left < N && array[left] > array[largest])   largest = left;
    if (right < N && array[right] > array[largest]) largest = right;

    if (largest !== i) {
        animations.push([i, largest, 'swapping', 0])
        
        let temp = array[i]
        array[i] = array[largest]
        array[largest] = temp
        
        animations.push([i, array[i], 'swapping', 2])
        animations.push([largest, array[largest], 'swapping', 3])

        animations.push([i, largest, 'swapping', 1])

        maxHeapify(array, N, largest, animations)
    }
}

const buildHeap = (array, N, animations) => {
    for (let i = N / 2 - 1; i >= 0; i--) {
        animations.push([i, 'current position', 0])
        animations.push([i, 'current position', 1])

        maxHeapify(array, N, i, animations);
    }
}

export default heapSortHandler