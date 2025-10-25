import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/app/(main)/components/layout/header";
import { AppSidebar } from "./components/layout/app-sidebar";
import { HeaderMobileNav, HeaderNav } from "./components/layout/header-nav";
import { HeaderUserMenu } from "./components/layout/user-menu/header-user-menu";
import { Toaster } from "@/components/ui/sonner";
import { NavUser } from "./components/layout/user-menu/nav-user";
import { UserMenuItem } from "./components/layout/user-menu/user-menu-item";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <Header>
          <HeaderMobileNav className="lg:hidden" />
          <HeaderNav className="hidden lg:block" />
          <HeaderUserMenu>
            <UserMenuItem />
          </HeaderUserMenu>
        </Header>
        <div className="flex flex-1">
          <AppSidebar>
            <NavUser />
          </AppSidebar>
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
      <Toaster richColors />
    </div>
  );
}
