class OperationQueue:
    def __init__(self):
        self.operations = []
        self.array_counter = 0

    def create_array(self, array, array_id=None, metadata="创建数组"):
        if array_id is None:
            array_id = f"array_{self.array_counter}"
            self.array_counter += 1
        self.operations.append(
            {"action": "create_array", "array": array.copy(), "array_id": array_id, "metadata": metadata})
        return array_id

    def swap_elements(self, indices, array_id, metadata=None):
        self.operations.append(
            {"action": "swap_elements", "indices": indices, "array_id": array_id, "metadata": metadata})

    def highlight(self, indices, array_id, metadata=None):
        self.operations.append({"action": "highlight", "indices": indices, "array_id": array_id, "metadata": metadata})

    def unhighlight(self, indices, array_id, metadata=None):
        self.operations.append(
            {"action": "unhighlight", "indices": indices, "array_id": array_id, "metadata": metadata})

    def get_queue(self):
        return self.operations

    def generate_json(self):
        import json
        return json.dumps(self.operations, ensure_ascii=False, indent=2)


def bubble_sort_with_visualization(input_data):
    # Create an instance of OperationQueue
    op_queue = OperationQueue()

    # Create a visualized array from the input data
    array_id = op_queue.create_array(input_data, metadata="初始化数组")

    # Make a copy of the input data to sort
    arr = input_data.copy()
    n = len(arr)

    # Perform bubble sort with visualization
    for i in range(n):
        for j in range(n - i - 1):
            # Highlight the elements being compared
            op_queue.highlight([j, j + 1], array_id, metadata=f"比较元素: {arr[j]} 和 {arr[j + 1]}")

            if arr[j] > arr[j + 1]:
                # Swap elements in the array
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                # Add a swap operation to the visualization
                op_queue.swap_elements([j, j + 1], array_id, metadata=f"交换元素: {arr[j]} 和 {arr[j + 1]}")

            # Unhighlight the elements after comparison
            op_queue.unhighlight([j, j + 1], array_id)

    # Return the operation queue
    return op_queue


# Example usage
input_data = [5, 3, 8, 4, 2]
operation_queue = bubble_sort_with_visualization(input_data)
print(operation_queue.generate_json())