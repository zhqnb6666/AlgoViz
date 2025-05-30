const codeContent = `def permute(nums):
    # Helper function to generate permutations
    def backtrack(start, end):
        if start == end:
            result.append(nums[:])
        for i in range(start, end):
            # Swap numbers to generate new permutation
            nums[start], nums[i] = nums[i], nums[start]
            # Recursively generate permutations for the rest
            backtrack(start + 1, end)
            # Backtrack to restore original order
            nums[start], nums[i] = nums[i], nums[start]

    result = []
    backtrack(0, len(nums))
    return result

# Example usage
nums = [1, 2, 3]
print(permute(nums))`;