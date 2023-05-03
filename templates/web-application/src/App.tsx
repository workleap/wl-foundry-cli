import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Home } from "@root/Home.tsx";
import { Office } from "@root/Office.tsx";
import { NoMatch } from "@root/NoMatch.tsx";
import { Loading } from "@root/components/Loading.tsx";
import { RootErrorBoundary } from "./RootErrorBoundary.tsx";
import { RootLayout } from "./RootLayout.tsx";

export function App() {
    const router = useMemo(() => {
        return createBrowserRouter([{
            element: <RootLayout />,
            children: [
                {
                    // Pathless route to set an error boundary inside the layout instead of outside.
                    // It's quite useful to prevent losing the layout when an unmanaged error occurs.
                    errorElement: <RootErrorBoundary />,
                    children: [
                        {
                            index: true,
                            element: <Home />
                        },
                        {
                            path: "office",
                            element: <Office />
                        },
                        {
                            path: "*",
                            element: <NoMatch path={location.pathname} />
                        }
                    ]
                }
            ]
        }]);
    }, []);

    return (
        <RouterProvider
            router={router}
            fallbackElement={<Loading />}
        />
    );
}
