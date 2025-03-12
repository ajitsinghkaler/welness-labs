import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Menu, X, Users, Home, LogOut, BarChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const isAdmin = user?.role === 'admin';

  const navigation = isAdmin
    ? [
        { name: 'Home', href: '/dashboard', icon: Home, description: 'Fill out surveys' },
        { name: 'Admin Dashboard', href: '/admin', icon: BarChart, description: 'View analytics' },
      ]
    : [];

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
          <div className="container flex h-16 items-center justify-between px-4 sm:px-6 mx-auto">
            <span className="text-xl font-semibold">Employee Pulse</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout}>
                Log out
              </Button>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-fluid lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center gap-x-4 border-b border-sidebar-border px-6">
          <span className="text-xl font-semibold text-sidebar-foreground">
            Employee Pulse
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden ml-auto"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        <nav className="flex flex-1 flex-col p-4">
          <ul role="list" className="flex flex-1 flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    'group flex items-center gap-x-3 rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
                    location.pathname === item.href
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-muted-foreground font-normal">
                      {item.description}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
            <li className="mt-auto">
              <Button
                variant="ghost"
                className="w-full justify-start gap-x-3 px-4 py-2.5 text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                onClick={logout}
              >
                <LogOut className="h-5 w-5 shrink-0" />
                Log out
              </Button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top bar */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="flex flex-1 items-center gap-x-4 lg:gap-x-6">
              <span className="text-sm font-medium text-foreground/70">
                Welcome, {user?.name}
              </span>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="py-8 px-4 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
} 