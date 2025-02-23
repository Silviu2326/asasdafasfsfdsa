import React from 'react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-32 h-32 cursor-pointer mx-auto"
      />
      <div
        className="w-full h-8 rounded-lg mt-4"
        style={{
          backgroundColor: value
        }}
      />
    </div>
  );
};

export default ColorPicker;
