import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

interface DropdownFolderProps {
  title: string;
  links: { name: string; href: string }[];
}

export default function DropdownFolder({ title, links }: DropdownFolderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUpIcon className="w-4 h-4" />
        ) : (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="ml-4 mt-1 flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-2 py-1 rounded hover:bg-gray-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
