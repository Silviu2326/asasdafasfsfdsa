import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Bell, User, AlertCircle } from 'lucide-react';
import { Card } from '../design/Card';
import { Alert } from '../feedback/Alert';
import { Toast } from '../feedback/Toast';
import { Badge } from '../feedback/Badge';

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  client: string;
  notes?: string;
}

interface AppointmentCalendarProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleAppointments = (): Appointment[] => {
  const today = new Date();
  return Array.from({ length: 5 }, (_, i) => ({
    id: `APT-${(i + 1).toString().padStart(4, '0')}`,
    title: `Cita ${i + 1}`,
    start: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 9 + i, 0),
    end: new Date(today.getFullYear(), today.getMonth(), today.getDate() + i, 10 + i, 0),
    status: ['pending', 'confirmed', 'cancelled'][i % 3] as 'pending' | 'confirmed' | 'cancelled',
    client: `Cliente ${i + 1}`,
    notes: `Notas para la cita ${i + 1}`
  }));
};

const statusColors = {
  pending: 'yellow',
  confirmed: 'green',
  cancelled: 'red'
};

const statusLabels = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada'
};

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [appointments, setAppointments] = useState<Appointment[]>(generateSampleAppointments());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const notify = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleDragStart = (e: React.DragEvent, appointmentId: string) => {
    e.dataTransfer.setData('appointmentId', appointmentId);
  };

  const handleDrop = (e: React.DragEvent, date: Date) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData('appointmentId');
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    if (appointment) {
      const updatedAppointments = appointments.map(apt => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            start: date,
            end: new Date(date.getTime() + (apt.end.getTime() - apt.start.getTime()))
          };
        }
        return apt;
      });
      
      setAppointments(updatedAppointments);
      notify(`Cita ${appointment.title} reprogramada`);
    }
  };

  const updateAppointmentStatus = (appointmentId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const updatedAppointments = appointments.map(apt => {
      if (apt.id === appointmentId) {
        return { ...apt, status };
      }
      return apt;
    });
    
    setAppointments(updatedAppointments);
    notify(`Estado de la cita actualizado a: ${statusLabels[status]}`);
  };

  const todayAppointments = useMemo(() => {
    return appointments.filter(apt => 
      apt.start.toDateString() === selectedDate.toDateString()
    );
  }, [appointments, selectedDate]);

  return (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-500" />
            Calendario de Citas
          </h2>
          <Badge variant="outline" colorScheme={colorScheme}>
            {todayAppointments.length} citas hoy
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <Card variant="elevated" className="md:col-span-2">
          <div className="p-4">
            <div className="h-[400px] flex items-center justify-center text-slate-500">
              Área para calendario interactivo
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold text-slate-700 mb-2">Citas del día</h3>
          {todayAppointments.map(appointment => (
            <Card
              key={appointment.id}
              variant="elevated"
              className="p-4 cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, appointment.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">
                    {appointment.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <Badge
                  variant="solid"
                  colorScheme={statusColors[appointment.status]}
                  size="sm"
                >
                  {statusLabels[appointment.status]}
                </Badge>
              </div>
              
              <h4 className="font-medium text-slate-800">{appointment.title}</h4>
              <div className="flex items-center gap-2 mt-2 text-sm text-slate-600">
                <User className="w-4 h-4" />
                {appointment.client}
              </div>

              {variant === 'detailed' && appointment.notes && (
                <p className="mt-2 text-sm text-slate-500">{appointment.notes}</p>
              )}
            </Card>
          ))}
        </div>
      </div>

      {showNotification && (
        <Toast
          message={notificationMessage}
          variant="info"
          position="bottom-right"
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};