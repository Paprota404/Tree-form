"use client";
import Image from "next/image";

import React, { useState } from "react";
import { moveNode } from "../utils/api";

interface TreeNodeProps {
  node: any;
  name: string;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onMove: (nodeId: number, newParentId: number) => void;
  isRoot: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  name,
  onAdd,
  onUpdate,
  onDelete,
  onMove,
  isRoot,
}) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(node.Name);
  const [newParentId, setNewParentId] = useState<number | null>(null);

  const addNode = async (node: any, parentId: number | null) => {
    const newNode = {
      ...node,
     
    };

    console.log("Sending node:", newNode);

    const response = await fetch("http://localhost:5063/api/TreeNode/AddNode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNode),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const updateNode = async (node: any) => {
    const response = await fetch(
      "http://localhost:5063/api/TreeNode/UpdateNode",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(node),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const deleteNode = async (node: any) => {
    const response = await fetch(
      "http://localhost:5063/api/TreeNode/DeleteNode",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(node),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };

  const handleAdd = async () => {
    const parentId = node.Id;
    await addNode(node, parentId);
    onAdd();
  };

  const handleUpdate = async () => {
    await updateNode({ ...node, Name: newName });
    setEditing(false);
    onUpdate();
  };

  const handleDelete = async () => {
    await deleteNode(node);
    onDelete();
  };

  const handleMove = async () => {
    if (newParentId !== null) {
      await moveNode(node.Id, newParentId);
      onMove(node.Id, newParentId);
    }
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setNewName(node.Name);
  };

  return (
    <div style={{ marginLeft: isRoot ? 0 : 20 }}>
      {" "}
      {/* Indent child nodes */}
      <div className="flex items-center hover:bg-blue-400 justify-between bg-blue-300 rounded-lg py-1 px-2 mt-2 text-black w-full">
        {editing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-1"
          />
        ) : (
          <span>
            {isRoot ? <strong>Root:</strong> : ""} {name}
          </span>
        )}

        {/* Image Buttons */}
        <div className="flex gap-2">
          {editing ? (
            <>
              <Image
                src="/check-svgrepo-com.svg"
                alt="Save"
                width={15}
                height={15}
                onClick={handleUpdate}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
              <Image
                src="/cancel-svgrepo-com (2).svg"
                alt="Cancel"
                width={15}
                height={15}
                onClick={handleCancelEdit}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </>
          ) : (
            <>
              <Image
                src="/plus.svg"
                alt="Add"
                width={15}
                height={15}
                onClick={handleAdd}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
              <Image
                src="/edit-svgrepo-com.svg"
                alt="Edit"
                width={15}
                height={15}
                onClick={handleEditClick} // Enter edit mode
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
              {!isRoot && (
                <Image
                  src="/delete.svg"
                  alt="Delete"
                  width={15}
                  height={15}
                  onClick={handleDelete}
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                />
              )}
            </>
          )}
        </div>
      </div>
      {node.children && node.children.length > 0 && (
        <div className="children">
          {node.children.map((childNode: any) => (
            <TreeNode
              key={childNode.Id}
              node={childNode}
              name={childNode.name}
              onAdd={onAdd}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onMove={onMove}
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
