interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
}

function LoadingSpinner({
  message = "Loading...",
  subMessage,
}: LoadingSpinnerProps) {
  return (
    <div className="p-6">
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-600 border-t-cyan-400 mb-4"></div>
        <h1 className="text-2xl font-bold text-white mb-2">{message}</h1>
        {subMessage && <p className="text-gray-300">{subMessage}</p>}
      </div>
    </div>
  );
}

export default LoadingSpinner;
