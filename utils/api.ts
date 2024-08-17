const API_URL = 'http://localhost:5063/api'; // Replace with your backend API URL



export const addNode = async (node: any) => {
    const response = await fetch(`${API_URL}/TreeNode/AddNode`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(node),
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};


export const deleteNode = async (id: number) => {
    const response = await fetch(`${API_URL}/TreeNode/DeleteNode/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
};

export const moveNode = async (nodeId: number, newParentId: number) => {
    const response = await fetch(`${API_URL}/TreeNode/MoveNode/${nodeId}/to/${newParentId}`, {
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

