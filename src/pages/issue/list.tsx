import React, { useEffect, useState } from 'react';
import ListTable from '../../components/ListTable';
import issueService from '../../services/issueService';

const headers = [
  'id',
  'motorcycle_id',
  'description',
  'issue_type',
  'date_reported',
  'status',
];

const actions = [
  { nombre: 'ver', etiqueta: 'Ver' },
  { nombre: 'editar', etiqueta: 'Editar' },
];

const IssueListPage: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    issueService.getIssues().then((data) => {
      setIssues(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = (accion: string, item: any) => {
    alert(`Acción: ${accion} sobre incidencia #${item.id}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Incidencias</h2>
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <ListTable
          headers={headers}
          data={issues}
          actions={actions}
          onAccion={handleAccion}
        />
      )}
    </div>
  );
};

export default IssueListPage;
