import ThemeToggle from "@/components/theme-toggle/theme-toggle";

const Header = () => {
  return (
    <nav className="flex-none h-12 overflow-hidden border-b flex items-center justify-between px-4">
      <span className="text-xl font-bold">Simple Dashboard</span>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Header;
