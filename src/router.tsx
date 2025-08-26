// import Post from "./pages/posts";
import {Branches, Dashboard, NotFound404, Posts, Post} from '@/pages'
import { useEffect } from "react";
import Layout from "./components/layout";
import { toast } from "./hooks/use-toast";
import Login from "./pages/authentication/login";
import { authApi } from "./services/auth.service";
import { NavGroup } from "./components/layout/types";
import { useAuth } from "./context/auth/authContext";
import { Navigate, useNavigate, useRoutes } from "react-router";
import { LayoutDashboardIcon, NewspaperIcon } from "lucide-react";
import Clients from './pages/informations/clients';
import { LoginResult } from './pages/authentication/types';

const privateRoutes = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        title: "General",
        children: [
          {
            icon: LayoutDashboardIcon,
            title: "Dashboard",
            path: "/",
            element: <Dashboard />,
          },
          {
            title: "Ma'lumotlar",
            icon: NewspaperIcon,
            children: [
              {
                title: "Filiallar",
                path: "/branches",
                element: <Branches />,
              },
              {
                title: "Mijozlar",
                path: "/clients",
                element: <Clients />,
              },
              {
                title: "Posts List",
                path: "/posts",
                element: <Posts />,
              },
              {
                hide: true,
                title: "Post Detail",
                path: "/post/:postId",
                element: <Post />,
              },
            ],
          },
        ],
      },
    ],
  },
];

const publicRoutes = [
  {
    path: "/",
    element: <Login />,
  },
  { path: "*", element: <Navigate to="/" replace /> },
];

export const DashboardMenu = (): NavGroup[] => {
  // Transform privateRoutes[0]?.children to match NavGroup[] type
  const groups = privateRoutes[0]?.children ?? [];
  // Filter and map to ensure each item matches NavGroup/NavItem/NavLink types
  return groups.map((group: any) => ({
    title: group.title,
    children: (group.children ?? []).map((item: any) => {
      if (item.children) {
        // NavItem with children (submenu)
        return {
          title: item.title,
          icon: item.icon,
          children: (item.children ?? []).map((subItem: any) => ({
            title: subItem.title,
            path: subItem.path,
            hide: subItem.hide,
          })),
        };
      } else {
        // NavLink or NavItem without children
        return {
          title: item.title,
          icon: item.icon,
          path: item.path,
        };
      }
    }),
  }));
};

export const RoutesApp = () => {
  const user_info = sessionStorage.getItem("auth");
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const isAuthenticated: LoginResult = user_info ? JSON.parse(user_info) : {};
  const token = isAuthenticated?.token;

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const response = await authApi.me();
          if (response?.resoult) {
            dispatch({ type: "login", payload: response?.resoult });
            navigate("/");
          }
        } catch (err: any) {
          toast({ variant: "destructive", title: "Xatolik", description: err?.message });
        }
      })();
    }
  }, [token]);

  return useRoutes(token ? privateRoutes : publicRoutes);
};
