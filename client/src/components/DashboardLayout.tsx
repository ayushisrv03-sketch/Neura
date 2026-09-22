import { useAuth } from "@/_core/hooks/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { startLogin } from "@/const";
import { useIsMobile } from "@/hooks/useMobile";
import { BookOpenCheck, CheckSquare2, LayoutDashboard, LineChart, LogIn, LogOut, PanelLeft, Sparkles } from "lucide-react";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { DashboardLayoutSkeleton } from "./DashboardLayoutSkeleton";
import { TopicSidebar } from "./TopicSidebar";

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/dashboard" },
  { icon: BookOpenCheck, label: "My courses", path: "#courses" },
  { icon: CheckSquare2, label: "Tasks", path: "#tasks" },
  { icon: LineChart, label: "Insights", path: "#insights" },
];

const SIDEBAR_WIDTH_KEY = "neura-sidebar-width";
const DEFAULT_WIDTH = 248;
const MIN_WIDTH = 210;
const MAX_WIDTH = 360;

export default function DashboardLayout({ children, allowGuest = false }: { children: React.ReactNode; allowGuest?: boolean }) {
  const [sidebarWidth, setSidebarWidth] = useState(() => {
    const saved = localStorage.getItem(SIDEBAR_WIDTH_KEY);
    return saved ? parseInt(saved, 10) : DEFAULT_WIDTH;
  });
  const { loading, user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => localStorage.setItem(SIDEBAR_WIDTH_KEY, sidebarWidth.toString()), [sidebarWidth]);

  // Client-side half of the auth gate: catches in-app (SPA) navigation into
  // /dashboard that a full page reload wouldn't hit. The server-side half
  // (guardProtectedPages in server/_core/index.ts) catches direct/typed-in
  // loads of /dashboard before the SPA even has a chance to render this.
  useEffect(() => {
    if (!loading && !user && !allowGuest) {
      setLocation(`/login?next=${encodeURIComponent(window.location.pathname)}`);
    }
  }, [loading, user, allowGuest, setLocation]);

  if ((loading || !user) && !allowGuest) return <DashboardLayoutSkeleton />;

  return (
    <SidebarProvider style={{ "--sidebar-width": `${sidebarWidth}px` } as CSSProperties}>
      <DashboardLayoutContent setSidebarWidth={setSidebarWidth}>{children}</DashboardLayoutContent>
    </SidebarProvider>
  );
}

function DashboardLayoutContent({ children, setSidebarWidth }: { children: React.ReactNode; setSidebarWidth: (width: number) => void }) {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();
  const [topicMatch, topicParams] = useRoute("/dashboard/lessons/:topic");
  const isTopicRoute = Boolean(topicMatch && topicParams?.topic);
  const currentTopic = topicParams?.topic ? decodeURIComponent(topicParams.topic) : "";

  const { state, toggleSidebar } = useSidebar();
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isCollapsed = state === "collapsed";
  const isMobile = useIsMobile();
  const displayName = user?.name || "Alex Morgan";
  const displayEmail = user?.email || "demo@neura.study";
  const activeMenuItem = menuItems.find(item => item.path === location) ?? menuItems[0];

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizing) return;
      const left = sidebarRef.current?.getBoundingClientRect().left ?? 0;
      const nextWidth = event.clientX - left;
      if (nextWidth >= MIN_WIDTH && nextWidth <= MAX_WIDTH) setSidebarWidth(nextWidth);
    };
    const handleMouseUp = () => setIsResizing(false);
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, setSidebarWidth]);

  const navigate = (path: string) => {
    if (path.startsWith("#")) {
      document.getElementById(path.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setLocation(path);
  };

  return (
    <>
      <div className="relative" ref={sidebarRef}>
        <Sidebar collapsible="icon" className="border-r-0 bg-white" disableTransition={isResizing}>
          {isTopicRoute ? (
            <TopicSidebar topicName={currentTopic} />
          ) : (
            <>
              <SidebarHeader className="h-20 justify-center border-b border-[#e6f0f3] px-4">
                <div className="flex items-center gap-3">
                  <button onClick={toggleSidebar} aria-label="Toggle navigation" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e3f7fb] text-[#159ac1] transition hover:bg-[#d4f1f8] focus-visible:ring-2 focus-visible:ring-[#159ac1]"><PanelLeft className="h-4 w-4" /></button>
                  {!isCollapsed && <div className="flex items-center gap-2"><div className="grid h-8 w-8 place-items-center rounded-xl bg-[#159ac1] text-white"><Sparkles className="h-4 w-4" /></div><span className="text-lg font-bold tracking-tight text-[#173c4b]">neura</span></div>}
                </div>
              </SidebarHeader>
              <SidebarContent className="gap-0 px-3 py-5">
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#a2bac3] group-data-[collapsible=icon]:hidden">Workspace</p>
                <SidebarMenu>
                  {menuItems.map(item => {
                    const isActive = item.path === location || (item.path === "/" && location === "/");
                    return <SidebarMenuItem key={item.path}><SidebarMenuButton isActive={isActive} onClick={() => navigate(item.path)} tooltip={item.label} className="mb-1 h-11 rounded-xl px-3 font-medium text-[#6c8995] transition data-[active=true]:bg-[#e5f8fc] data-[active=true]:text-[#128eaf] hover:bg-[#f0fafc]">
                      <item.icon className="h-[18px] w-[18px]" /><span>{item.label}</span>
                    </SidebarMenuButton></SidebarMenuItem>;
                  })}
                </SidebarMenu>
              </SidebarContent>
            </>
          )}
          <SidebarFooter className="border-t border-[#e6f0f3] p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild><button className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition hover:bg-[#f1fafc] focus-visible:ring-2 focus-visible:ring-[#159ac1] group-data-[collapsible=icon]:justify-center"><Avatar className="h-9 w-9 shrink-0 border-2 border-[#dff4f8]"><AvatarFallback className="bg-[#dff4f8] text-xs font-bold text-[#159ac1]">{displayName.slice(0, 2).toUpperCase()}</AvatarFallback></Avatar><div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"><p className="truncate text-sm font-semibold text-[#234b5b]">{displayName}</p><p className="mt-0.5 truncate text-xs text-[#8ba5ae]">{displayEmail}</p></div></button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl">{user ? <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive"><LogOut className="mr-2 h-4 w-4" />Sign out</DropdownMenuItem> : <DropdownMenuItem onClick={() => startLogin()} className="cursor-pointer"><LogIn className="mr-2 h-4 w-4" />Sign in to save progress</DropdownMenuItem>}</DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <div className={`absolute right-0 top-0 h-full w-1 cursor-col-resize transition-colors hover:bg-[#159ac1]/20 ${isCollapsed ? "hidden" : ""}`} onMouseDown={() => setIsResizing(true)} />
      </div>
      <SidebarInset className="bg-[#f6fbfd]">
        {isMobile && <div className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-[#e6f0f3] bg-white/95 px-3 backdrop-blur"><SidebarTrigger className="h-9 w-9 rounded-lg" /><span className="text-sm font-semibold text-[#234b5b]">{isTopicRoute ? `${currentTopic} Lessons` : activeMenuItem.label}</span></div>}
        <main className="min-h-screen p-0">{children}</main>
      </SidebarInset>
    </>
  );
}
