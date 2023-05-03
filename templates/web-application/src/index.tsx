import "./index.css";

import { StrictMode, Suspense } from "react";

import { App } from "./App.tsx";
import { Loading } from "@root/components/Loading.tsx";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <Suspense fallback={<Loading />}>
            <App />
        </Suspense>
    </StrictMode>
);
