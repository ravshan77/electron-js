import { Command } from 'lucide-react'
import { DashboardMenu } from '@/router'
import { useAuth } from '@/context/auth/authContext'
import { NavGroup, NavItem, type SidebarData } from '../types'

interface ISidebarDataComponent {
  sidebarData: SidebarData
}

export const SidebarDataComponent = (): ISidebarDataComponent => {
  const routes = DashboardMenu()
  const { state: authState } = useAuth()

  // console.log({ routes })

  type NavGroups = NavGroup[]

  function removeHiddenItems(navGroups: NavGroups): NavGroups {
    function filterItems(items: NavItem[]): NavItem[] {
      return items
        .map(item => {
          if (item?.children) {
            const filteredChildren = filterItems(item.children)
            return { ...item, children: filteredChildren }
          }
          return item
        })
        .filter(item => !item.hide) as NavItem[]
    }

    return navGroups.map(group => ({
      ...group,
      children: filterItems(group.children)
    }))
  }

  return {
    sidebarData: {
      user: { ...authState },
      app: {
        name: 'Metra App',
        logo: Command,
        plan: 'Dashboard'
      },
      navGroups: removeHiddenItems(routes)
    }
  }
}
