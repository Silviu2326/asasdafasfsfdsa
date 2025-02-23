import React from 'react';
import { useDrag } from 'react-dnd';
import { Table2, Users, ShoppingCart, BarChart2, CheckSquare, Donut as ButtonIcon, AlertTriangle, CheckCircle, Command, CreditCard, Image, UserCircle, PieChart, Tag, LogIn, UserPlus, Mail, Search, Settings, Menu, Sidebar, LayoutGrid, ChevronRight, ListStart as ListSteps } from 'lucide-react';
import { DraggableItemProps } from '../types';

interface DraggableItemProps {
  type: 'button' | 'table';
  variant?: string;
  label: string;
  description: string;
}

const getIcon = (type: string, variant: string) => {
  const iconProps = { className: "w-5 h-5" };
  
  switch (type) {
    case 'table':
      switch (variant) {
        case 'users': return <Users {...iconProps} className="w-5 h-5 text-blue-600" />;
        case 'products': return <ShoppingCart {...iconProps} className="w-5 h-5 text-green-600" />;
        case 'analytics': return <BarChart2 {...iconProps} className="w-5 h-5 text-purple-600" />;
        case 'tasks': return <CheckSquare {...iconProps} className="w-5 h-5 text-orange-600" />;
        default: return <Table2 {...iconProps} className="w-5 h-5 text-gray-600" />;
      }
    case 'button':
      switch (variant) {
        case 'primary': return <ButtonIcon {...iconProps} className="w-5 h-5 text-blue-600" />;
        case 'danger': return <AlertTriangle {...iconProps} className="w-5 h-5 text-red-600" />;
        case 'success': return <CheckCircle {...iconProps} className="w-5 h-5 text-green-600" />;
        case 'icon': return <Command {...iconProps} className="w-5 h-5 text-purple-600" />;
        default: return <ButtonIcon {...iconProps} className="w-5 h-5 text-gray-600" />;
      }
    case 'card':
      switch (variant) {
        case 'basic': return <CreditCard {...iconProps} className="w-5 h-5 text-blue-600" />;
        case 'image': return <Image {...iconProps} className="w-5 h-5 text-green-600" />;
        case 'profile': return <UserCircle {...iconProps} className="w-5 h-5 text-purple-600" />;
        case 'stats': return <PieChart {...iconProps} className="w-5 h-5 text-orange-600" />;
        case 'pricing': return <Tag {...iconProps} className="w-5 h-5 text-pink-600" />;
        default: return <CreditCard {...iconProps} className="w-5 h-5 text-gray-600" />;
      }
    case 'form':
      switch (variant) {
        case 'login': return <LogIn {...iconProps} className="w-5 h-5 text-blue-600" />;
        case 'register': return <UserPlus {...iconProps} className="w-5 h-5 text-green-600" />;
        case 'contact': return <Mail {...iconProps} className="w-5 h-5 text-purple-600" />;
        case 'search': return <Search {...iconProps} className="w-5 h-5 text-orange-600" />;
        case 'settings': return <Settings {...iconProps} className="w-5 h-5 text-gray-600" />;
        default: return <Mail {...iconProps} className="w-5 h-5 text-gray-600" />;
      }
    case 'nav':
      switch (variant) {
        case 'header': return <Menu {...iconProps} className="w-5 h-5 text-blue-600" />;
        case 'sidebar': return <Sidebar {...iconProps} className="w-5 h-5 text-green-600" />;
        case 'tabs': return <LayoutGrid {...iconProps} className="w-5 h-5 text-purple-600" />;
        case 'breadcrumb': return <ChevronRight {...iconProps} className="w-5 h-5 text-orange-600" />;
        case 'stepper': return <ListSteps {...iconProps} className="w-5 h-5 text-pink-600" />;
        default: return <Menu {...iconProps} className="w-5 h-5 text-gray-600" />;
      }
    default:
      return <ButtonIcon {...iconProps} className="w-5 h-5 text-gray-600" />;
  }
};

export const DraggableItem: React.FC<DraggableItemProps> = ({ type, variant, label, description }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type.toUpperCase(),
    item: { type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [type]);

  return (
    <div
      ref={drag}
      className={`flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white cursor-move transition-all duration-200 ${
        isDragging
          ? 'opacity-50 border-indigo-300 shadow-lg shadow-indigo-100'
          : 'hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100'
      }`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {type === 'button' ? (
        <ButtonIcon className="w-5 h-5 text-indigo-500" />
      ) : (
        <Table2 className="w-5 h-5 text-indigo-500" />
      )}
      <span className="text-sm font-medium text-slate-700">
        {label}
        {variant && ` ${variant}`}
      </span>
      <p className="text-xs text-slate-500 mt-0.5">{description}</p>
    </div>
  );
};
