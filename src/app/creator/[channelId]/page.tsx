import "./page.css";
import { UploadDialog } from "./_components/upload-dialog";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <UploadDialog />
    </div>
  );
};

export default Dashboard;
