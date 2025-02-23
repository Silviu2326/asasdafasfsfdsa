import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { ChevronDown } from 'lucide-react';

interface IconPickerProps {
  selectedIcon: string;
  onIconSelect: (icon: string) => void;
}

const IconPicker: React.FC<IconPickerProps> = ({ selectedIcon, onIconSelect }) => {
  const [showPicker, setShowPicker] = useState(false);

  const IconComponent = Icons[selectedIcon as keyof typeof Icons] || Icons.Home;

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-3 py-2 border rounded-lg text-sm bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex items-center gap-2">
          <IconComponent size={16} />
          <ChevronDown size={16} />
        </div>
      </button>
      {showPicker && (
        <div className="absolute z-10 mt-1 w-64 p-2 bg-white border rounded-lg shadow-lg grid grid-cols-6 gap-1">
          {Object.keys(Icons).map((name) => {
            if (typeof Icons[name as keyof typeof Icons] !== 'function') return null;
            const Icon = Icons[name as keyof typeof Icons];
            return (
              <button
                key={name}
                onClick={() => {
                  onIconSelect(name);
                  setShowPicker(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title={name}
              >
                <Icon size={16} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default IconPicker;