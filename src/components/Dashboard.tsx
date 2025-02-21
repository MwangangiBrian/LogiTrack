import { DashboardCards } from './DashboardCards';
import { Header } from './Header';
import SideBar from './SideBar';

const Dashboard = () => {
  return (
    <>
      <div className="flex">
        <div>
          <SideBar />
        </div>
        <div>
          <Header />
          <DashboardCards />
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
