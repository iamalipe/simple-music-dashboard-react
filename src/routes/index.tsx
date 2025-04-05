import ErrorPage from "@/components/general/error-page";
// import LoadingElement from "@/components/general/loading-element";
// import PageNotFound from "@/components/general/page-not-found";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
// import { createFileRoute } from "@tanstack/react-router";

import { createBrowserRouter } from "react-router";

// export const Route = createFileRoute("/")({
//   component: Index,
//   errorComponent: ErrorPage,
//   notFoundComponent: PageNotFound,
//   pendingComponent: LoadingElement,
//   loader: () => ({
//     crumb: "Home",
//   }),
// });

export function Index() {
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
}

const rootRouter = createBrowserRouter([
  {
    path: "/",
    element: <Index />,

    ErrorBoundary: () => <ErrorPage />,
    loader: async () => {
      return { crumb: "Home" };
    },
  },
]);

export default rootRouter;