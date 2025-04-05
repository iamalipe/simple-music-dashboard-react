import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const Home = () => {
  const onToastTest = () => {
    // toast({ title: "Toast Test" });
    toast({ title: "Toast Test" });
    // toast({
    //   title: "Toast Test",
    //   description: "Description",
    //   action: <Button>Close</Button>,
    // });
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col p-2 md:p-4 gap-2 md:gap-4">
      <div>
        <h1>Private Home Page</h1>
        <Button onClick={onToastTest}>Toast Test</Button>
      </div>
    </main>
  );
};

export default Home;
