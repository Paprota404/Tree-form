"use client";
import Image from "next/image";
import React, { useState } from "react";

interface TreeNodeProps {
  node: any;
  name: string;
  onAdd: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  isRoot: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  name,
  onAdd,
  onUpdate,
  onDelete,
  isRoot,
}) => {
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(node.Name);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const addNode = async (newNode: any) => {
    const response = await fetch(`${API_BASE_URL}/api/TreeNode/AddNode`, {
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
    const response = await fetch(`${API_BASE_URL}/api/TreeNode/UpdateNode`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(node),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  };

  const deleteNode = async (node: any) => {
    const response = await fetch(`${API_BASE_URL}/api/TreeNode/DeleteNode`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(node),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  };



  const handleAdd = async () => {
    await addNode(node);
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
      <div
        className="flex  hover:bg-blue-400 justify-between bg-blue-300 rounded-lg py-1 px-2 mt-2 text-black w-full "
        style={{ marginRight: isRoot ? 0 : 20 }}
      >
        {editing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded p-1 "
          />
        ) : (
          <span className="text-sm md:text-md">
            {isRoot ? <strong>Root:</strong> : ""} {name}
          </span>
        )}

        <div className="flex lg:gap-2">
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
                onClick={handleEditClick}
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
              isRoot={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
