import { RootLayout } from "../../widgets/root-layout/ui/RootLayout";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { Auth } from "@/pages";
import { ProtectedLayout } from "@/widgets/protected-layout/ui/ProtectedLayout";
import { Dashboard } from "@/pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        children: [
            {
                index: true,
                element: <Navigate to={'auth'}/>
            },
            {
                path: 'auth',
                lazy: async () => {
                    return { Component: Auth }
                }
            },
        ]
    },
    {
        path: '/',
        element: <ProtectedLayout/>,
        children: [
            {
                path: 'dashboard',
                lazy: async () => {
                    return { Component: Dashboard }
                }
            }
        ]
    }
])

export default router;