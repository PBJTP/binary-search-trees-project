const Tree = require('./tree');

//create an array with amount of data equal to argument
function createRandomNumbers(num) {
    let array = [];
    for (let i = 0; i < num; i++) {
        array.push(Math.floor(Math.random()*100));
    }
    return array;
}

function driver(num) {
    //create random array with a variable amount of data
    let array = createRandomNumbers(num);

    //create tree and pretty print it
    const tree = new Tree(array);

    //check for balance and print the level, pre, in, and post order
    console.log('Is the tree balanced? ' + tree.isBalanced());
    tree.printAll();

    //add numbers greater than 100 to unbalnce the tree
    console.log(`Adding some numbers to unbalance the tree....`)
    tree.insertNode(Math.floor(Math.random() * 500));
    tree.insertNode(Math.floor(Math.random() * 560));
    tree.insertNode(Math.floor(Math.random() * 750));
    tree.insertNode(Math.floor(Math.random() * 809));
    tree.insertNode(Math.floor(Math.random() * 550));
    tree.insertNode(Math.floor(Math.random() * 1000));
    tree.insertNode(Math.floor(Math.random() * 900));

    //print and confirm balance again
    tree.prettyPrint();
    console.log('Is the tree still balanced? ' + tree.isBalanced());

    //rebalance the tree, print, and confirm balance
    tree.rebalance();
    tree.prettyPrint();
    console.log('Is the tree balanced now with all the added numbers? ' + tree.isBalanced());

    //print the new order traversals
    tree.printAll();
}

driver(10);