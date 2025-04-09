import { Outlet } from "@tanstack/react-router";

const AuthLayout = () => {
  return (
    <>
      <div className="h-full-x flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </>
  );
};
export default AuthLayout;
