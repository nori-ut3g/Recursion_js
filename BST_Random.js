class BinaryTree {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    printInOrder(){
        let arr = []
        this.inOrderWalk(this,arr);
        console.log(arr);
        return arr;
    }

    inOrderWalk(tRoot,arr){
        if(tRoot != null){
            this.inOrderWalk(tRoot.left,arr);
            arr.push(tRoot.data)
            this.inOrderWalk(tRoot.right,arr);
        }
    }


}

class BinarySearchTree {
    constructor(arrList) {
        console.log(arrList);
        this.arrayToBST(arrList);
        this.optimize()
    }

    arrayToBST(arrList) {
        if(!arrList) this.root = null;
        this.root = new BinaryTree(arrList[0]);
        for(let i = 1; i < arrList.length; i++) {
            this.insert(arrList[i]);
        }
    }
//******************ランダム構築******************* */
    optimize(){
        while(!this.isAllAVL(this.root, true)) {
            this.optimizeHelper(this.root)
        }
    }
    optimizeHelper(node) {
        if(node !== null) {
            let direction = this.whichRotation(node);
            switch (direction) {
                case "LL":
                    this.LL(node);
                    break;
                case "LR":
                    this.LR(node);
                    break;
                case "RR":
                    this.RR(node);
                    break;
                case "RL":
                    this.RL(node);
                    break;
                default:
                    break;
            }
            this.optimizeHelper(node.right);
            this.optimizeHelper(node.left);
        }
    }
    isAllAVL(node, isAVL) {
        if(node !== null) {
            if(!this.isAVLNode(node)) return false;
            isAVL = this.isAllAVL(node.right, isAVL);
            isAVL = this.isAllAVL(node.left, isAVL);
        }
        return isAVL;
    }

    //回転
    RL(node) {
        let child = node.right;
        let grandChild = child.left;
        let tmp1 = grandChild;
        let tmp2 = grandChild.right;
        let tmp3 = child;
        node.right = tmp1;
        child.left = tmp2;
        grandChild.right = tmp3;
        this.RR(node);
    }
    RR(node) {
        let head = node;
        let child = node.right;
        let tmp1 = node;
        let tmp2 = child.left;
        child.left = tmp1;
        node.right = tmp2;
        if(head === this.root) {
            this.root = child;
        }else {
            let parent = this.findParent(head);
            if(parent.left === head) parent.left = child;
            else parent.right = child
        }
    }
    LR(node) {
        let child = node.left;
        let grandChild = child.right;
        let tmp1 = grandChild;
        let tmp2 = grandChild.left;
        let tmp3 = child;
        node.left = tmp1;
        child.right = tmp2;
        grandChild.left = tmp3;
        this.LL(node);
    }
    LL(node) {
        let head = node;
        let child = node.left;
        let tmp1 = node;
        let tmp2 = child.right;
        child.right = tmp1;
        node.left = tmp2;
        if(head === this.root) {
            this.root = child;
        }else {
            let parent = this.findParent(head);
            if (parent.left === head) parent.left = child;
            else parent.right = child;
        }

    }

    findParent(node) {
        let iterator = this.root;
        let parent;
        while(iterator !== node) {
            parent = iterator;
            iterator = iterator.data > node.data ?  iterator.left :iterator.right;
        }
        return parent
    }

    whichRotation(node) {
        let leftDepth = this.maxDepth(node.left);
        let rightDepth = this.maxDepth(node.right);
        if(leftDepth - rightDepth > 1) {
            if (this.maxDepth(node.left.left) > this.maxDepth(node.left.right)) return "LL";
            else return "LR";
        }else if (  rightDepth - leftDepth> 1 ){
            if(this.maxDepth(node.right.left) > this.maxDepth(node.right.right)) return "RL";
            else return "RR";
        }else{
            return null;
        }
    }
    isAVLNode(node) {
        let leftDepth = this.maxDepth(node.left);
        let rightDepth = this.maxDepth(node.right);
        return Math.abs(leftDepth - rightDepth) <= 1;
    }
    maxDepth(root) {
        let i = 1;
        let arrDepth = [0]
        let maxDepth = this.maxDepthHelper(root, i, arrDepth);
        return maxDepth;
    }
    maxDepthHelper(node, i , arrDepth) {
        if (node !== null) {
            arrDepth.push(Number(i));
            this.maxDepthHelper(node.left, i+1, arrDepth);
            this.maxDepthHelper(node.right, i+1, arrDepth);
        }
        return Math.max(...arrDepth)
    }
//*****************挿入******************* */
    insert(value){
        let iterator = this.root;
        let parent;
        while(iterator !== null) {
            parent = iterator;
            iterator = iterator.data > value ?  iterator.left :iterator.right;
        }
        parent.data  > value ? parent.left =  new BinaryTree(value): parent.right = new BinaryTree(value);
    }
//******************削除******************* */

    delete(key) {
        if(this.root === null) return null;
        let node = this.search(key)
        if(node === null) return null;
        let parent = this.findParent(node)
        if(node.left === null) this.transPlant(parent, node, node.right);
        else if(node.right === null) this.transPlant(parent, node, node.left);
        else{
            let successor = this.findSuccessor(node);
            let successorParent = this.findParent(successor);
            if(successor !== node.right){
                this.transPlant(successorParent, successor, successor.right);
                successor.right = node.right;
            }
            this.transPlant(parent, node, successor)
            successor.left = node.left
        }
    }

    findSuccessor(node) {
        let iterator = node.right;
        while(iterator.left !== null) {
            iterator = iterator.left
        }
        return iterator;
    }
    search(key){
        let iterator = this.root;
        while(iterator != null){
            if(iterator.data === key) return iterator;
            if(iterator.data > key) iterator = iterator.left;
            else iterator = iterator.right;
        }

        return null;
    }
    transPlant(nodeParent, node, target) {
        if(nodeParent){
            if(nodeParent.data < node.data) nodeParent.right = target;
            else nodeParent.left = target;
        }else{
            this.root = target;
        }
    }
    printSorted() {
        this.root.printInOrder();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

let randomList = (length) => {
    let list = [];
    for(let i = 0; i < length; i ++){
        if(list.includes(i)) continue;
        list.push(getRandomInt(1000))
    }
    return list
}
let balancedBST = new BinarySearchTree([4,43,36,46,3,7,97,95,94,8,96,35,85,1010,232,222,463,475,284,774,2183,457])//
// let balancedBST = new BinarySearchTree(randomList(10))
balancedBST.delete(96)
balancedBST.printSorted();