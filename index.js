class Node {
    constructor(value, left, right) {
        this.value = data
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(array) {
        this.root = buildTree(array);
    }
}

function buildTree(array) {
    if (array.length < 2) return array

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return [buildTree(left), buildTree(right)]
}

function mergeSort(array) {
    //base case
    if (array.length < 2) return array;

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    
    //recursion
    return merge(mergeSort(left), mergeSort(right));
};

function merge(left, right) {
    let sortedArray = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            sortedArray.push(left.shift());
        } else {
            sortedArray.push(right.shift());
        }
    };

    return [...sortedArray, ...left, ...right];
}

function removeDuplicates(array) {
    let uniqueValues = array.filter((x, index) => {
        return array.indexOf(x) === index;
    })

    return uniqueValues;
}

let tree = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324]
console.log(tree)
console.log(removeDuplicates(tree));
console.log(mergeSort(removeDuplicates(tree)));

