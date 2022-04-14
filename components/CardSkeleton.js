const CardSkeleton = () => (
    <div className="p-6 border rounded-md dark:border-gray-700 dark:bg-gray-800 animate-pulse">
      <span className="block w-full h-10 mb-4 bg-gray-200 rounded dark:bg-gray-700 sm:w-5/6" />
      <div className="flex items-center mb-4 space-x-2">
        <span className="block w-12 h-12 bg-gray-200 rounded-full dark:bg-gray-700" />
        <div>
          <span className="block w-32 h-4 mb-1 bg-gray-200 dark:bg-gray-700" />
          <span className="block w-24 h-3 bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
      <div className="space-y-2">
        <span className="block w-full h-4 mb-1 bg-gray-200 dark:bg-gray-700" />
        <span className="block w-4/5 h-4 mb-1 bg-gray-200 dark:bg-gray-700" />
        <span className="block w-48 h-4 mb-1 bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
  
  export default CardSkeleton;