import { Link, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Sliders, 
  Package, 
  FolderKanban,
  Search,
  Settings,
  LogOut,
  User
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";

const navigation = [
  { name: "Analytics", href: "/dashboard", icon: LayoutDashboard },
  { name: "Parámetros", href: "/dashboard/parameters", icon: Sliders },
  { name: "Productos", href: "/dashboard/products", icon: Package },
  { name: "Cartera", href: "/dashboard/portfolio", icon: FolderKanban },
  { name: "Query", href: "/dashboard/query", icon: Search },
];

const secondaryNavigation = [
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [showLabels, setShowLabels] = useState(true);

  useEffect(() => {
    if (collapsed) {
      setShowLabels(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowLabels(true);
    }, 140);

    return () => window.clearTimeout(timeout);
  }, [collapsed]);

  return (
    <aside 
      className={cn(
        "flex flex-col h-screen bg-card border-r transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* User section - clickeable para colapsar */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-4 h-18 border-b hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-primary/10 shrink-0">
            <User className="size-5 text-primary" />
          </div>
          {showLabels && (
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium truncate">{user?.nombre || "Usuario"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
            </div>
          )}
        </div>
      </button>

      {/* Main navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {showLabels && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Secondary navigation */}
      <div className="p-4 space-y-1 border-t">
        {secondaryNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center"
              )}
              title={collapsed ? item.name : undefined}
            >
              <Icon className="size-5 shrink-0" />
              {showLabels && <span>{item.name}</span>}
            </Link>
          );
        })}
        
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-muted-foreground hover:bg-muted hover:text-foreground",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Cerrar sesión" : undefined}
        >
          <LogOut className="size-5 shrink-0" />
          {showLabels && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  );
}
