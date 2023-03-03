class Node {
    constructor(value, left, right) {
        this.value = value
        this.left = left
        this.right = right
    }
}

class Tree {
    constructor(array) {
        this.array = this.mergeSort(this.removeDuplicates(array));
        this.root = array[Math.floor(array.length / 2)];
    }

    buildTree(array) {
        if (array.length < 2) return new Node

        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);

        this.root = new Node(array[middle], left, right);
    
        return [this.buildTree(left), this.buildTree(right)]
    }

    mergeSort(array) {
        //base case
        if (array.length < 2) return array;
    
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        
        //recursion
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    };
    
    merge(left, right) {
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

    removeDuplicates(array) {
        let uniqueValues = array.filter((x, index) => {
            return array.indexOf(x) === index;
        })
    
        return uniqueValues;
    }

    print() {
        console.log(this.array)
        console.log(this.root)
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

let data = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324]

let tree = new Tree(data);

tree.print()