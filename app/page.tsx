import TreeNode from "./TreeNode";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-4 mx-auto w-1/3 rounded-lg">
        <div className="text-black mb-2 text-lg">Widok drzewa</div>
        <div className="flex gap-2">
          <button className="bg-black p-2 rounded-lg text-sm">
            Rozwiń wszystko
          </button>
          <button className="bg-black p-2 rounded-lg text-sm">
            Odwróć kierunek sortowania
          </button>
        </div>

        <TreeNode name="Root" isRoot/>
      </div>
    </div>
  );
}
