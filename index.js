class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class Tree {
    constructor(array) {
        this.sortedArray = this.mergeSort(this.removeDuplicates(array));
        this.root = this.buildTree(this.sortedArray, 0, this.sortedArray.length - 1);
        // this.array = this.mergeSort(this.removeDuplicates(array));
        // this.root = this.array[Math.floor(array.length / 2)];
    }

    buildTree(array, start, end) {
        
        //base case
        if (start > end) return null;
        //get middle element and make it root
        let mid = parseInt((start + end) / 2);
        let node = new Node(array[mid]);

        node.left = this.buildTree(array, start, mid - 1);
        node.right = this.buildTree(array, mid + 1, end);
        return node;
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

    preOrder(node) {
        if(node == null) return;

        console.log(node.value + " ")
        this.preOrder(node.left)
        this.preOrder(node.right);
    }

    prettyPrint(node, prefix = '', isLeft = true) {
        // console.log(node)
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

// tree.prettyPrint(tree.buildTree(tree.root, 0, tree.sortedArray.length - 1))
console.log(tree.prettyPrint(tree.root, prefix = '', isLeft = true))
console.log(tree.sortedArray)
console.log(tree.root.value)
console.log(tree.buildTree(tree.sortedArray, 0, tree.sortedArray.length - 1))