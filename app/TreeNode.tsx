import React from "react";
import Image from "next/image";

const TreeNode: React.FC<{ name: string, isRoot?: boolean }> = ({ name, isRoot=false }) => {
  return (
    <div>
      <button className="flex items-center hover:bg-blue-400 justify-between bg-blue-300 rounded-lg py-1 px-2 mt-2 text-black w-full">
        <div className="flex gap-1">
          <Image src="/folder.svg" height={15} width={15} alt="Folder"></Image>
          {name}
        </div>

        <div className="flex gap-3">
          <button>
            <Image className="plus-icon" src="/plus.svg" height={15} width={15} alt="plus"></Image>
          </button>
          <button>
            <Image className="edit-icon" src="/edit-svgrepo-com.svg" height={15} width={15} alt="edit"></Image>
          </button>
          {!isRoot && (
            <button>
              <Image className="delete-icon" src="/delete.svg" height={15} width={15} alt="delete"></Image>
            </button>
          )}
        </div>
      </button>
    </div>
  );
};

export default TreeNode;
