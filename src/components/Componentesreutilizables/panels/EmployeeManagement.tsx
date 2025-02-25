import React, { useState, useMemo } from 'react';
import { User, Clock, Star, Bell, Calendar, ChevronRight, Award, AlertTriangle } from 'lucide-react';
import { Card } from '../design/Card';
import { Badge } from '../feedback/Badge';
import { PrimaryButton } from '../buttons/PrimaryButton';
import { Progress } from '../feedback/Progress';
import { FilterableTable } from '../tables/FilterableTable';
import { Modal } from '../design/Modal';
import { Alert } from '../feedback/Alert';

interface Shift {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

interface Evaluation {
  id: string;
  date: Date;
  score: number;
  feedback: string;
  category: 'performance' | 'attendance' | 'teamwork';
}

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  status: 'active' | 'onLeave' | 'inactive';
  shifts: Shift[];
  evaluations: Evaluation[];
  imageUrl: string;
  email: string;
  phone: string;
}

interface EmployeeManagementProps {
  variant?: 'simple' | 'detailed';
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'blue' | 'green' | 'red' | 'yellow' | 'gray';
  className?: string;
}

const generateSampleEmployees = (): Employee[] => {
  const departments = ['Ventas', 'IT', 'RRHH', 'Producción'];
  const positions = ['Gerente', 'Supervisor', 'Analista', 'Asistente'];
  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];

  return Array.from({ length: 8 }, (_, i) => ({
    id: `EMP-${(i + 1).toString().padStart(4, '0')}`,
    name: `Empleado ${i + 1}`,
    position: positions[i % positions.length],
    department: departments[i % departments.length],
    status: ['active', 'active', 'onLeave', 'inactive'][i % 4] as Employee['status'],
    shifts: days.map((day, j) => ({
      id: `SHF-${i}-${j}`,
      day,
      startTime: '09:00',
      endTime: '17:00'
    })),
    evaluations: Array.from({ length: 3 }, (_, j) => ({
      id: `EVL-${i}-${j}`,
      date: new Date(Date.now() - j * 30 * 24 * 60 * 60 * 1000),
      score: Math.floor(Math.random() * 5) + 1,
      feedback: `Evaluación de desempeño ${j + 1}`,
      category: ['performance', 'attendance', 'teamwork'][j % 3] as Evaluation['category']
    })),
    imageUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
    email: `empleado${i + 1}@empresa.com`,
    phone: `+34 ${Math.floor(Math.random() * 900000000) + 100000000}`
  }));
};

export const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  variant = 'simple',
  size = 'md',
  colorScheme = 'blue',
  className = ''
}) => {
  const [employees] = useState<Employee[]>(generateSampleEmployees());
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showEvaluation, setShowEvaluation] = useState(false);

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'green';
      case 'onLeave': return 'yellow';
      case 'inactive': return 'red';
      default: return 'gray';
    }
  };

  const getStatusLabel = (status: Employee['status']) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'onLeave': return 'Ausente';
      case 'inactive': return 'Inactivo';
      default: return status;
    }
  };

  const calculateAverageScore = (evaluations: Evaluation[]) => {
    if (evaluations.length === 0) return 0;
    return evaluations.reduce((sum, eval) => sum + eval.score, 0) / evaluations.length;
  };

  const columns = [
    {
      header: 'Empleado',
      cell: (info: any) => (
        <div className="flex items-center gap-3">
          <img
            src={info.row.original.imageUrl}
            alt={info.row.original.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-medium">{info.row.original.name}</div>
            <div className="text-sm text-slate-500">{info.row.original.position}</div>
          </div>
        </div>
      )
    },
    { header: 'Departamento', accessorKey: 'department' },
    {
      header: 'Estado',
      accessorKey: 'status',
      cell: (info: any) => (
        <Badge
          variant="subtle"
          colorScheme={getStatusColor(info.getValue())}
        >
          {getStatusLabel(info.getValue())}
        </Badge>
      )
    },
    {
      header: 'Evaluación',
      cell: (info: any) => (
        <div className="flex items-center gap-2">
          <Progress
            value={calculateAverageScore(info.row.original.evaluations) * 20}
            max={100}
            size="sm"
            variant="info"
            className="w-24"
          />
          <span className="text-sm text-slate-600">
            {calculateAverageScore(info.row.original.evaluations).toFixed(1)}/5
          </span>
        </div>
      )
    },
    {
      header: 'Acciones',
      cell: (info: any) => (
        <div className="flex gap-2">
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => {
              setSelectedEmployee(info.row.original);
              setShowEvaluation(true);
            }}
          >
            <Star className="w-4 h-4" />
          </PrimaryButton>
          <PrimaryButton
            size="sm"
            variant="outline"
            colorScheme={colorScheme}
            onClick={() => window.location.href = `mailto:${info.row.original.email}`}
          >
            <Bell className="w-4 h-4" />
          </PrimaryButton>
        </div>
      )
    }
  ];

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Empleados</p>
              <h3 className="text-2xl font-bold text-slate-800">{employees.length}</h3>
            </div>
            <User className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">En Turno</p>
              <h3 className="text-2xl font-bold text-green-600">
                {employees.filter(e => e.status === 'active').length}
              </h3>
            </div>
            <Clock className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card variant="elevated" className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Ausentes</p>
              <h3 className="text-2xl font-bold text-yellow-600">
                {employees.filter(e => e.status === 'onLeave').length}
              </h3>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-slate-800">Lista de Empleados</h3>
          <PrimaryButton
            variant="solid"
            colorScheme={colorScheme}
            className="flex items-center gap-2"
          >
            <User className="w-4 h-4" />
            Nuevo Empleado
          </PrimaryButton>
        </div>

        <FilterableTable
          data={employees}
          columns={columns}
          variant={variant === 'simple' ? 'default' : 'bordered'}
          className="w-full"
        />
      </Card>

      <Modal
        isOpen={showEvaluation}
        onClose={() => {
          setShowEvaluation(false);
          setSelectedEmployee(null);
        }}
        title={`Evaluaciones - ${selectedEmployee?.name}`}
        size="lg"
      >
        {selectedEmployee && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
              <img
                src={selectedEmployee.imageUrl}
                alt={selectedEmployee.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h4 className="font-medium text-lg">{selectedEmployee.name}</h4>
                <p className="text-slate-600">{selectedEmployee.position}</p>
                <p className="text-sm text-slate-500">{selectedEmployee.department}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-slate-800">Horario de Turnos</h5>
              <div className="grid grid-cols-5 gap-2">
                {selectedEmployee.shifts.map(shift => (
                  <div key={shift.id} className="p-2 text-center border rounded">
                    <div className="text-sm font-medium">{shift.day}</div>
                    <div className="text-xs text-slate-500">
                      {shift.startTime} - {shift.endTime}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h5 className="font-medium text-slate-800">Evaluaciones Recientes</h5>
              {selectedEmployee.evaluations.map(eval => (
                <Card key={eval.id} variant="outline" className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="subtle"
                          colorScheme={
                            eval.category === 'performance' ? 'blue' :
                            eval.category === 'attendance' ? 'green' : 'yellow'
                          }
                        >
                          {eval.category}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {eval.date.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-2 text-slate-600">{eval.feedback}</p>
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: eval.score }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};