interface ErrorCardProps {
  error: string;
  onRetry?: () => void;
}

function ErrorCard({ error, onRetry }: ErrorCardProps) {
  return (
    <div className="p-6">
      <div className="bg-gray-700 border-2 border-red-400/50 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-4">⚠️ Error</h1>
        <p className="text-gray-300 text-lg mb-6">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 hover:shadow-lg hover:shadow-red-400/25 transition-all duration-200"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorCard;
