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
        this.prettyPrint(this.root);
    }

    //Build the tree with the given sorted array
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

    //Sort the array low to high
    mergeSort(array) {
        //base case
        if (array.length < 2) return array;
    
        const middle = Math.floor(array.length / 2);
        const left = array.slice(0, middle);
        const right = array.slice(middle);
        
        //recursion
        return this.merge(this.mergeSort(left), this.mergeSort(right));
    };
    
    //helper function for merge sort
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

    //remove duplicates from array
    removeDuplicates(array) {
        let uniqueValues = array.filter((x, index) => {
            return array.indexOf(x) === index;
        })
    
        return uniqueValues;
    }

    //print tree in the console or terminal with maximum aesthetics
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    //insert a node with given value into the tree
    insertNode(value, node = this.root) {
        //base case
        if (node == null) {
            node = new Node(value);
            return node;
        }

        if (value < node.value) {
            node.left =  this.insertNode(value, node.left);
        } else if (value > node.value) {
            node.right = this.insertNode(value, node.right)
        }
        
        return node;
    }
    
    //Insert and prettyPrint
    insert(value) {
        this.root = this.insertNode(value, this.root)
        this.prettyPrint(this.root)
    }

    //delete a given value from the tree
    deleteNode(value, node = this.root) {
        if (node == null) return node;
        if (value < node.value) {
            node.left = this.deleteNode(value, node.left)
        } else if (value > node.value) {
            node.right = this.deleteNode(value, node.right)
        } else {
            if (node.left == null) return node.right;
            else if (node.right == null) return node.left;

            node.value = this.minValue(node.right);
            node.right = this.deleteNode(node.value, node.right);
            console.log('it got here')
            
        }
        return node;
    }

    //Helper for deleteNode
    minValue(node) {
        let minv = node.value;
        while (node.left != null) {
            minv = node.left.value;
            node = node.left
        }
        return minv;
    }
    
    //delete node and prettyPrint
    delete(value) {
        this.root = this.deleteNode(value, this.root);
        this.prettyPrint(this.root)
    }

    //return a node with given value, else return nothing
    findNode(node, value) {
        //base case
        if (node == null || node.value == value) return node;

        if (node.value > value) {
            return this.findNode(node.left, value);
        }
        return this.findNode(node.right, value);
    }

    //return an array with the levelOrder search method
    levelOrder() {

        return;
    }

    //return an array with the inOrder search method
    inOrder() {
        return;
    }

    //return an array with the preOrder search method
    preOrder(node = this.root, preOrderArr = []) {
        if (node === null) return;

        preOrderArr.push(node.value)
        this.preOrder(node.left, preOrderArr);
        this.preOrder(node.right, preOrderArr);

        return preOrderArr;
    }

    //return an array with the postOrder search method
    postOrder() {
        return;
    }

    //return the height of a given node from the tree
    height() {
        return;
    }

    //return the depth of a given node from the tree
    depth() {
        return;
    }

    //check to the see if the tree is balanced, difference in height between left and right is not more than 1
    isBalanced() {
        return;
    }

    //rebalance an unbalanced tree. TIP use the traversal metod to return a new array from the tree
    rebalance() {
        return;
    }
}

let data = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324,1,2,45,367,567,2345,456,234,457,2345234,4577,45,45,734,3,2,2,7,8,4,435]

let tree = new Tree(data);

// console.log(tree.findNode(tree.root, 67))
// console.log(tree.findNode(tree.root, 890791823))
// console.log(tree.insertNode(1624, tree.root))
// console.log(tree.insert(974))
// console.log(tree.delete(974))
// tree.delete(23)
// tree.delete(7)
tree.preOrder(tree.root, [])
console.log(tree.preOrder())
// console.log(tree.root)
// tree.prettyPrint(tree.root)
// console.log(tree.delete(1))