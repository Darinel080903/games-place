class Node {
    constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node(data);

    if (this.root === null) {
      this.root = node;
    } else {
      this.insertNode(this.root, node);
    }
    
  }

  insertNode(node, newNode) {
  
    if (newNode.data.title < node.data.title) {
        if (node.left === null) node.left = newNode;
        else this.insertNode(node.left, newNode);
      } else {
        if (node.right === null) node.right = newNode;
        else this.insertNode(node.right, newNode);
      }
  }

  lookup(data) {
    if (this.root === null) {
      return false;
    } else {
      return this.lookupNode(this.root, data);
    }
  }

  lookupNode(node, data) {
    if (node === null) {
        return false;
        }
    if (data < node.data.title) {
        return this.lookupNode(node.left, data);
        }
    if (data > node.data.title) {
        return this.lookupNode(node.right, data);
        }
    return node;
  }

  getRootNode() {
    return this.root;
    }

  //make a function to search similar words  for example if you search for "the" it will return "the", "then", "there", "their", "they", "the game"
    search(data) {
        if (this.root === null) {
            return false;
        } else {
            return this.searchNode(this.root, data);
        }
    }

    searchNode(node, data) {
      console.log('node.data');
      console.log(node.data);
    console.log('data');
    console.log(data);
    console.log('node');
    console.log(node);

    

        if (node === null) {
            return false;
        }
        if (node.data.title.includes(data)) {
            return node;
        }
        if (data < node.data.title) {
            return this.searchNode(node.left, data);
        }
        if (data > node.data.title) {
            return this.searchNode(node.right, data);
        }
    }

  remove(data) {
    if (this.root === null) {
      return false;
    } else {
      return this.removeNode(this.root, data);
    }
  }

  removeNode(node, data) {
    if (node === null) {
      return false;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (data > node.data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      // we have found the node
        if (node.left === null && node.right === null) {
            node = null;
            return node;
        }
        if (node.left === null) {
            node = node.right;
            return node;
        }
        if (node.right === null) {
            node = node.left;
            return node;
        }
        var temp = node.right;
        while (temp.left !== null) {
            temp = temp.left;
        }
        node.data = temp.data;
        node.right = this.removeNode(node.right, temp.data);
        return node;
    }
    }
}

  export default BinarySearchTree;
