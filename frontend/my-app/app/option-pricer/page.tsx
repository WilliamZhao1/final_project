import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex h-full w-full gap-4 p-4 pt-0">

          <div className="w-1/3 bg-muted/50 rounded-xl shadow"></div>

          <div className="grid w-2/3 grid-cols-2 grid-rows-2 gap-4">

            <div className="bg-muted/50 rounded-lg shadow p-4"></div>

            <div className="bg-muted/50 rounded-lg shadow p-4"></div>

            <div className="bg-muted/50 rounded-lg shadow p-4"></div>

            <div className="bg-muted/50 rounded-lg shadow p-4"></div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
