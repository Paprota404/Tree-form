const API_URL = 'http://localhost:5063/api'; // Replace with your backend API URL






export const moveNode = async (nodeId: number, newParentId: number) => {
    const response = await fetch(`${API_URL}/TreeNode/MoveNode/${nodeId}/to/${newParentId}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

