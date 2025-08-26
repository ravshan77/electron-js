import { LoginResult } from '@/types/type'
import { useAuth } from '@/context/auth/authContext'
import { ChevronsUpDown, LogOut } from 'lucide-react'
import { role_info } from '@/context/auth/authReducer'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

export function NavUser({ user }: { user: LoginResult}) {
  const { isMobile } = useSidebar()
  const { dispatch } = useAuth()
  
  function formatPhoneNumber(phone: string): string {
    // Faqat raqamlarni olib qolamiz
    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 12) {
      throw new Error("Telefon raqam 12 xonali bo‘lishi kerak (masalan: 998991940851)");
    }

    // Format: +998 99 194 0851
    const country = digits.slice(0, 3);
    const code = digits.slice(3, 5);
    const part1 = digits.slice(5, 8);
    const part2 = digits.slice(8, 12);

    return `+${country} ${code} ${part1} ${part2}`;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground' >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={"https://github.com/shadcn.png"} alt={user?.username} />
                <AvatarFallback className='rounded-lg'>SN</AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{user?.username} </span>
                <span className='truncate text-xs'>{formatPhoneNumber(user?.phone)}</span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg' side={isMobile ? 'bottom' : 'right'} align='end' sideOffset={4} >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={"https://github.com/shadcn.png"} alt={user?.username} />
                  <AvatarFallback className='rounded-lg'>SN</AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{user?.username}</span>
                  <span className='truncate text-xs'>{role_info(user?.roles)}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => dispatch({ type: 'logout' })}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
