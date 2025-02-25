import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PageContainerProps {
  title: string;
  children: ReactNode;
  prevPage?: string;
  nextPage?: string;
  step: number;
}

const PageContainer: React.FC<PageContainerProps> = ({ title, children, prevPage, nextPage, step }) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-35 py-2 max-w-70xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <span className="text-sm text-gray-600">Paso {step} de 4</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        {children}
      </div>

      <div className="flex justify-between">
        {prevPage ? (
          <button
            onClick={() => navigate(prevPage)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Anterior
          </button>
        ) : <div />}

        {nextPage && (
          <button
            onClick={() => navigate(nextPage)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Siguiente
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        )}
      </div>
    </div>
  );
}

export default PageContainer