import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListTable from '../../components/ListTable';
import issueService from '../../services/issueService';
import AddButton from '../../components/AddButton';

const headers = [
  'id',
  'motorcycle_id',
  'description',
  'issue_type',
  'date_reported',
  'status',
];

const actions = [
  { nombre: 'ver', etiqueta: (<><svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></>), },
  { nombre: 'editar', etiqueta: (<><svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-1 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3h3z" /></svg></>), },
  { nombre: 'eliminar', etiqueta: (<><svg xmlns="http://www.w3.org/2000/svg" className="inline w-5 h-5 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></>), },
];

const IssueListPage: React.FC = () => {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    issueService.getIssues().then((data) => {
      setIssues(data);
      setLoading(false);
    });
  }, []);

  const handleAccion = async (accion: string, item: any) => {
    if (accion === 'ver') {
      navigate(`/issue/view/${item.id}`);
    } else if (accion === 'editar') {
      navigate(`/issue/update/${item.id}`);
    } else if (accion === 'eliminar') {
      if (window.confirm(`¿Seguro que deseas eliminar la incidencia #${item.id}?`)) {
        const success = await issueService.deleteIssue(item.id);
        if (success) {
          setIssues((prev) => prev.filter((i) => i.id !== item.id));
          alert('Incidencia eliminada correctamente');
        } else {
          alert('Error al eliminar la incidencia');
        }
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Incidencias</h2>
        <AddButton label="Agregar Incidencia" to="/issue/create" />
      </div>
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
