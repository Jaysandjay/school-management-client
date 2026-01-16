export default function LoadingSpinner() {
  return (
    <div className="inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-t-blue-500 border-b-blue-500 border-l-transparent border-r-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-black text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}
