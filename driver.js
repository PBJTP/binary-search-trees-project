const Tree = require('./tree');

function driver() {
    let data = [1,7,4,23,8,9,4,3,5,7,9,67,6345,324,1,2,45,367,567,2345,456,234,457,2345234,4577,45,45,734,3,2,2,7,8,4,435]

    let tree = new Tree(data);
    console.log(tree);
}

driver();