import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

function MaterialCardItem({ item, studyTypeContent }) {
  const isReady = studyTypeContent?.[item.type]?.length != null;

  return (
    <div
      className={cn(
        'border shadow-md rounded-lg p-5 flex flex-col items-center bg-white dark:bg-gray-800 dark:border-gray-700 transition-transform transform hover:scale-105',
        !isReady && 'grayscale opacity-75'
      )}
    >
      <span
        className={cn(
          'p-1 px-2 rounded-full text-[10px] font-medium mb-2',
          isReady ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
        )}
      >
        {isReady ? 'Ready' : 'Generate'}
      </span>

      <Image
        src={item.icon}
        alt={item.name}
        width={50}
        height={50}
        className="rounded-lg"
      />

      <h3 className="font-medium mt-3 text-gray-900 dark:text-white text-center">
        {item.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
        {item.desc || 'No description available.'}
      </p>

      <Button className="mt-3 w-full" variant="outline">
        {isReady ? 'View' : 'Generate'}
      </Button>
    </div>
  );
}

export default MaterialCardItem;
