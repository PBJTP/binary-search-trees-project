const Node = require('./node');

class Tree {
    constructor(array) {
        this.sortedArray = this.mergeSort(this.removeDuplicates(array));
        this.root = this.buildTree(this.sortedArray, 0, this.sortedArray.length - 1);
        this.prettyPrint(this.root);
    }

    //Build the tree with the given sorted array
    buildTree(array, start = 0, end = array.length - 1) {
        
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
    prettyPrint(node = this.root, prefix = '', isLeft = true) {
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
        // this.prettyPrint(this.root)
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
    findNode(node = this.root, value) {
        //base case
        if (node == null || node.value == value) return node;

        if (node.value > value) {
            return this.findNode(node.left, value);
        }
        return this.findNode(node.right, value);
    }

    //return an array with the levelOrder search method
    levelOrder(callback) {
        if (this.root == null) return;

        const queue = [this.root];
        const levelOrderArr = [];
        while (queue.length > 0) {
            const node = queue.shift();
            if (node.left !== null) queue.push(node.left);
            if (node.right !== null) queue.push(node.right);
            if (callback) callback(node)
            else levelOrderArr.push(node.value)
        }
        return levelOrderArr;
    }

    //return an array with the inOrder search method
    inOrder(node = this.root, inOrderArr = []) {
        if (node === null) return;
        
        this.inOrder(node.left, inOrderArr);
        inOrderArr.push(node.value);
        this.inOrder(node.right, inOrderArr);

        return inOrderArr;
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
    postOrder(node = this.root, postOrderArr = []) {
        if (node === null) return;

        this.postOrder(node.left, postOrderArr);
        this.postOrder(node.right, postOrderArr);
        postOrderArr.push(node.value)

        return postOrderArr;
    }

    //return the height of a given node from the tree
    height(node = this.root) {
        if (node == null) return 0;
        return Math.max(this.height(node.left), this.height(node.right)) + 1;
    }

    //return the depth of a given node from the tree
    depth(value, node = this.root, depth = 0) {
        if (node == null) return;
        if (node.value === value) return depth; 

        if (node.value < value) {
            return this.depth(value, node.right, depth + 1)
        } else if (node.value > value) {
            return this.depth(value, node.left, depth + 1)
        }
    }

    //check to the see if the tree is balanced, difference in height between left and right is not more than 1
    isBalanced(node = this.root) {
        if(node == null) return true;
        
        if (Math.abs(this.height(node.left) - this.height(node.right)) <= 1 &&
        this.isBalanced(node.right) == true &&
        this.isBalanced(node.left) == true) {
            return true;
        }
        return false;
    }

    //rebalance an unbalanced tree. TIP use the traversal method to return a new array from the tree
    rebalance() {
        const inOrderList = this.inOrder();
        this.root = this.buildTree(inOrderList);
    }

    //Print level, pre, in, and post order to console
    printAll() {
        console.log(`The level order of this BST is ` + this.levelOrder());
        console.log(`The pre order of this BST is ` + this.preOrder());
        console.log(`The post order of this BST is ` + this.postOrder());
        console.log(`The in order of this BST is ` + this.inOrder());
    }
}

module.exports = Tree;