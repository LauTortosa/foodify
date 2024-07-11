import { Link } from 'react-router-dom';

const PlanningTableComponent = ({ plannings, showLink, showState }) => {
    return (
        <div className='overflow-x-auto'>
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha</th>
                        <th>Trazabilidad</th>
                        <th>Producto</th>
                        <th>Cargas</th>
                        {showState && <th>Estado</th>}
                    </tr>
                </thead>
                <tbody>
                {plannings.map((planning, index) => (
                    <tr key={planning.id} className="hover">
                        <td>{index + 1}</td>
                        <td>{planning.date_value}</td>
                        <td>{planning.tracebility}</td>
                        {showLink ? (
                        <td className="text-blue-500 hover:underline">
                            <Link to={`/planning/${planning.id}`}>
                                {planning.product_value}
                            </Link>
                            </td>
                        ) : (
                        <td>{planning.product_value}</td>
                        )}
                        <td>{planning.load}</td>
                        {showState && <td>{planning.state_value}</td>}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default PlanningTableComponent;