"use client";
import React, { useEffect, useState } from "react";
import TreeNode from "./TreeNode";

const Tree: React.FC = () => {
  const [nodes, setNodes] = useState<any[]>([]);
  const [nodeIdsToSort, setNodeIdsToSort] = useState<number[]>([]);

  const getTreeNodes = async () => {
    const response = await fetch(
      "http://localhost:5063/api/TreeNode/GetTreeNodes"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const sortNodes = async (nodeIds: number[]) => {
    const response = await fetch(
      "http://localhost:5063/api/TreeNode/SortNodes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nodeIds),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const fetchTreeNodes = async () => {
    const data = await getTreeNodes();
    setNodes(data);
  };

  useEffect(() => {
    fetchTreeNodes();
  }, []);

  const handleUpdate = () => {
    // Refresh the tree structure
    fetchTreeNodes();
  };

  const handleDelete = () => {
    // Refresh the tree structure
    fetchTreeNodes();
  };

  const handleMove = (nodeId: number, newParentId: number) => {
    // Refresh the tree structure
    fetchTreeNodes();
  };

  const handleSort = async () => {
    await sortNodes(nodeIdsToSort);
    setNodeIdsToSort([]);
    fetchTreeNodes();
  };

  return (
    <>
      <div className="bg-white p-4 mx-auto w-1/2 lg:w-1/3 rounded-lg">
        <div className="text-black mb-2 text-lg">Widok drzewa</div>
        <div className="flex gap-2">
          <button className="bg-black p-2 rounded-lg text-sm">
            Rozwiń wszystko
          </button>
          <button  onClick={handleSort} className="bg-black p-2 rounded-lg text-sm">Sortuj</button>
        </div>
        {nodes.map((node) => (
          <TreeNode
            key={node.Id}
            node={node}
            name={node.name}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onMove={handleMove}
            isRoot={true}
          />
        ))}
        {/* Add sorting functionality */}
       
      </div>
    </>
  );
};

export default Tree;
