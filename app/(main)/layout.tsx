import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/app/(main)/components/layout/header";
import { AppSidebar } from "./components/layout/app-sidebar";
import { HeaderMobileNav, HeaderNav } from "./components/layout/header-nav";
import { HeaderUserMenu } from "./components/layout/header-user-menu";

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
          <HeaderUserMenu />
        </Header>
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
