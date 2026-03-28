import { ThemeToggle } from "@/components/theme-toggle";

export function DashboardHeader() {
  return (
    <header className="h-18 border-b bg-card flex items-center justify-between px-6">
      <div className="flex-1" />
      <span className="text-2xl font-bold">presti</span>
      <div className="flex-1 flex justify-end">
        <ThemeToggle />
      </div>
    </header>
  );
}
