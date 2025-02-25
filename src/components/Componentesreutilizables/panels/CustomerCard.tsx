import React, { useState } from 'react';
import { User, Phone, Mail, Clock, MessageSquare, Plus } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { TextInput } from '../forms/TextInput';

interface Interaction {
  id: string;
  date: Date;
  type: 'call' | 'email' | 'meeting';
  description: string;
}

interface Comment {
  id: string;
  date: Date;
  text: string;
  author: string;
}

interface CustomerCardProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      date: new Date(),
      text: 'Cliente satisfecho con el último pedido',
      author: 'Juan Pérez'
    }
  ]);

  const interactions: Interaction[] = [
    {
      id: '1',
      date: new Date(),
      type: 'call',
      description: 'Llamada de seguimiento'
    },
    {
      id: '2',
      date: new Date(Date.now() - 86400000),
      type: 'email',
      description: 'Envío de cotización'
    }
  ];

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: Date.now().toString(),
          date: new Date(),
          text: newComment,
          author: 'Usuario Actual',
        },
        ...comments
      ]);
      setNewComment('');
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card variant="elevated" className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
              <User className="w-8 h-8 text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Juan Cliente</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="subtle" colorScheme="green">Cliente Activo</Badge>
                <Badge variant="outline" colorScheme="blue">Premium</Badge>
              </div>
              <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  +34 123 456 789
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  juan@ejemplo.com
                </span>
              </div>
            </div>
          </div>
          <PrimaryButton
            variant="solid"
            colorScheme={colorScheme}
            className="flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Contactar
          </PrimaryButton>
        </div>
      </Card>

      {variant === 'detailed' && (
        <>
          <Card variant="elevated" className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Historial de Interacciones</h3>
            <div className="space-y-4">
              {interactions.map(interaction => (
                <div key={interaction.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <Clock className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {interaction.description}
                    </p>
                    <span className="text-xs text-slate-500">
                      {interaction.date.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="elevated" className="p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Comentarios</h3>
            <div className="flex gap-2 mb-4">
              <TextInput
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Añadir un comentario..."
                className="flex-1"
              />
              <PrimaryButton
                onClick={addComment}
                variant="solid"
                colorScheme={colorScheme}
              >
                <Plus className="w-4 h-4" />
              </PrimaryButton>
            </div>
            <div className="space-y-4">
              {comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-slate-100">
                    <MessageSquare className="w-5 h-5 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600">{comment.text}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-700">
                        {comment.author}
                      </span>
                      <span className="text-xs text-slate-500">
                        {comment.date.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
};