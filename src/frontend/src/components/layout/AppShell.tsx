import PhasmaLogo from "@/components/brand/PhasmaLogo";
import MobileNavDrawer from "@/components/layout/MobileNavDrawer";
import { Button } from "@/components/ui/button";
import WorkspacePlanSwitcher from "@/components/workspace/WorkspacePlanSwitcher";
import { useHeaderOffset } from "@/hooks/useHeaderOffset";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, BarChart3, Home, Menu } from "lucide-react";
import { type ReactNode, useState } from "react";

interface AppShellProps {
  children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const router = useRouterState();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Measure header height for mobile offset
  useHeaderOffset("app-header");

  const currentPath = router.location.pathname;

  const handleNavigate = (path: string) => {
    navigate({ to: path });
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header with iOS safe-area support */}
      <header
        id="app-header"
        className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50"
        style={{
          paddingTop: "max(env(safe-area-inset-top, 0px), 0px)",
        }}
      >
        <div className="container mx-auto px-4">
          {/* Mobile: compact header with hamburger */}
          <div className="flex items-center justify-between h-16 sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileDrawerOpen(true)}
              className="text-white hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>

            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <PhasmaLogo size="small" />
              <span className="text-lg font-bold text-white">PHASMA</span>
            </Link>

            {/* Spacer for visual balance */}
            <div className="w-10" />
          </div>

          {/* Desktop/Tablet: horizontal layout */}
          <div className="hidden sm:flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <Link
              to="/"
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <PhasmaLogo size="small" />
              <span className="text-xl font-bold text-white">PHASMA</span>
            </Link>

            {/* Navigation and Auth */}
            <div className="flex items-center gap-4">
              <nav className="flex items-center gap-2">
                <Link to="/">
                  <Button
                    variant={currentPath === "/" ? "secondary" : "ghost"}
                    size="sm"
                    className={
                      currentPath === "/"
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/runs">
                  <Button
                    variant={
                      currentPath.startsWith("/runs") ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      currentPath.startsWith("/runs")
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  >
                    <Activity className="w-4 h-4 mr-2" />
                    Training Runs
                  </Button>
                </Link>
                <Link to="/analytics">
                  <Button
                    variant={
                      currentPath === "/analytics" ? "secondary" : "ghost"
                    }
                    size="sm"
                    className={
                      currentPath === "/analytics"
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </Link>
              </nav>

              {/* Plan Switcher */}
              <div className="border-l border-white/10 pl-4">
                <WorkspacePlanSwitcher />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNavDrawer
        open={mobileDrawerOpen}
        onOpenChange={setMobileDrawerOpen}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Content with dynamic offset */}
      <main
        style={{
          paddingTop: "var(--header-offset, 0px)",
        }}
      >
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} PHASMA
            </div>
            <div className="text-sm text-gray-400">
              Decentralized Robotics RL Platform
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
