export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-bold text-purple-400 animate-pulse">Finding Friends...</p>
      </div>
    </div>
  );
}
