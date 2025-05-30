const codeContent = `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root):
        if not root:
            return None

        # Initialize a stack to help with the preorder traversal
        stack = [root]
        prev = None

        while stack:
            current = stack.pop()

            if prev:
                # Link previous node's right to current node
                prev.right = current
                prev.left = None

            # Push right and left children of current node to stack
            if current.right:
                stack.append(current.right)
            if current.left:
                stack.append(current.left)

            # Update previous node
            prev = current

    def visualize_linked_list(self, root):
        current = root
        while current:
            print(current.val, end=" -> " if current.right else "\n")
            current = current.right

# Helper function to convert dictionary to TreeNode
def dict_to_tree(node_dict):
    if not node_dict:
        return None
    node = TreeNode(node_dict['val'])
    node.left = dict_to_tree(node_dict.get('left'))
    node.right = dict_to_tree(node_dict.get('right'))
    return node

# Example input
input_dict = {'root': {'val': 1, 'left': {'val': 2, 'left': {'val': 4, 'left': None, 'right': None}, 'right': {'val': 5, 'left': None, 'right': None}}, 'right': {'val': 3, 'left': None, 'right': {'val': 6, 'left': None, 'right': None}}}}

# Convert dictionary to TreeNode
root = dict_to_tree(input_dict['root'])

# Flatten the tree and visualize
solution = Solution()
solution.flatten(root)
solution.visualize_linked_list(root)`;