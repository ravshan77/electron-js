import { useAuth } from '@/context/auth/authContext'
import { NavUser } from '@/components/layout/nav-user'
import { NavGroup } from '@/components/layout/nav-group'
import { SidebarDataComponent } from './data/sidebar-data'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state: userInfo } = useAuth()
  const { sidebarData } = SidebarDataComponent()


  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg'>
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <sidebarData.app.logo className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {sidebarData.app.name}
                </span>
                <span className='truncate text-xs'>{sidebarData?.user?.branch_name}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map(props => <NavGroup key={props.title} {...props} />)}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userInfo} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
