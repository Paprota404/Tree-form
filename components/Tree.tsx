"use client";
import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";

const Tree: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const getTreeNodes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/TreeNode/GetTreeNodes`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const sortNodes = async () => {
    const response = await fetch(`${API_BASE_URL}/api/TreeNode/SortNodes`, {
      method: "POST",
      headers: {},
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  const fetchTreeNodes = async () => {
    try {
      const data = await getTreeNodes();
      console.log("Fetched nodes:", data); // Add this line to inspect the data
      setNodes(data);
    } catch (error) {
      console.error("Error fetching tree nodes:", error);
    }
  };

  useEffect(() => {
    fetchTreeNodes();
  }, []);

  const handleAdd = () => {
    fetchTreeNodes();
  };

  const handleUpdate = () => {
    // Refresh the tree structure
    fetchTreeNodes();
  };

  const handleDelete = () => {
    // Refresh the tree structure
    fetchTreeNodes();
  };

  const handleSort = async () => {
    await sortNodes();
    fetchTreeNodes();
  };

  return (
    <>
      <div className="bg-white p-4  mx-auto m-5 w-3/4 md:w-2/3 lg:w-1/3 rounded-lg">
        <div className="text-black mb-2 text-lg">Widok drzewa</div>
        <div className="flex gap-2">
          <button
            onClick={handleSort}
            className="bg-black p-2 rounded-lg text-sm"
          >
            Sortuj
          </button>
        </div>

        {nodes.map((node) => (
          <TreeNode
            key={node.Id}
            node={node}
            name={node.name}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isRoot={true}
          />
        ))}
      </div>
    </>
  );
};

export default Tree;
