import { format, getISOWeek, getDayOfYear } from 'date-fns';
import { es } from 'date-fns/locale';
import UserDropdownComponent from './Log/UserDropdownComponent';
import useAuthenticatedUser from '../hooks/useAuthenticatedUser';

const HeaderComponent = () => {
  const username = useAuthenticatedUser();
  const isGuest = !username;
  const userType = isGuest ? 'guest' : (username === 'responsable' ? 'responsable' : 'operator');
  
  const now = new Date();
  const date = format(new Date(), "dd/MM/yyy", {locale: es});
  const week = getISOWeek(new Date());
  const year = format(now, "yy");
  const dayYear = getDayOfYear(now);
  const lot = `${year}${dayYear}`;

  return (
    <div className="navbar border-b-4 border-gray-300 px-8 py-4 items-center justify-between">
      <h1 className="text-3xl font-bold text-gray-800">FOODIFY PLANNER</h1>

      <div className="flex items-center gap-6">
        <div className="text-sm text-right text-gray-700 leading-tight">
          <p><span className="font-semibold"></span> {date}</p>
          <p><span className="font-semibold">Semana:</span> {week}</p>
          <p><span className="font-semibold">Lote:</span> {lot}</p>
        </div>
        <UserDropdownComponent username={username} userType={userType} />
      </div>
    </div>
  );
};


export default HeaderComponent;
