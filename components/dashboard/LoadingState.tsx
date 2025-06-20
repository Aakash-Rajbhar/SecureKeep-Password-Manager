export default function LoadingState() {
  return (
    <div className="flex h-64 items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        <p className="text-gray-500 dark:text-gray-400">
          Loading your passwords...
        </p>
      </div>
    </div>
  );
}
