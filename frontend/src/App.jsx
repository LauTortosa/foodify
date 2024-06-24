import Navbar from './components/Navbar';
import PlanningView from './views/PlanningView';
import './App.css'

const App = () => {
  return (
    <>
      <div>
      <Navbar />
      <div className='min-h-screen'>
        <PlanningView />
      </div>
    </div>
    </>
  )
};

export default App;
