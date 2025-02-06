import ReportsTable from "./components/ReportsTable";

const Reports = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="sticky z-10 ">
        <p className="font-bold text-2xl">Reports</p>
      </div>

      <div className="flex-grow overflow-y-auto scrollbar-hide custom-scrollbar z-0 mt-5">
        <ReportsTable />
      </div>
    </div>
  );
};

export default Reports;
