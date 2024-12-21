import Image from 'next/image';
import { Button } from '@/components/ui/button';

function MaterialCardItem({ item }) {
  return (
    <div className="border shadow-md rounded-lg p-5 flex flex-col items-center bg-white dark:bg-gray-800 dark:border-gray-700">
      <span className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
        Ready
      </span>
      <Image src={item.icon} alt={item.name} width={50} height={50} />
      <h3 className="font-medium mt-3 text-gray-900 dark:text-white">
        {item.name}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm text-center mt-2">
        {item.desc}
      </p>
      <Button
        className="mt-3 w-full"
        variant="outline"
        onClick={() => (window.location.href = item.path)}
      >
        View
      </Button>
    </div>
  );
}

export default MaterialCardItem;
