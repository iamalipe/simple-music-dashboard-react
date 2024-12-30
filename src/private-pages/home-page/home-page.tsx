import ActionButtons from "@/private-pages/home-page/action-buttons";

const HomePage = () => {
  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <ActionButtons />
      <div>
        <h1>Private Home Page</h1>
      </div>
      {/* <DataTable /> */}
    </main>
  );
};

export default HomePage;
