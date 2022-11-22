import RequestsTable from "components/RequestsTable";

const PendingRequests = () => {
  return (
    <div className="flex flex-col flex-grow bg-inherit p-8 h-full gap-5">
      <h1 className="text-4xl font-normal">Pending Requests</h1>
      <RequestsTable />
    </div>
  );
};

export default PendingRequests;
