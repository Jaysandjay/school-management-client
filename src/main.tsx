import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import RootLayout from "./components/layout/layout";
import '@fontsource/geist/400.css';
import '@fontsource/geist/700.css';
import '@fontsource/geist-mono/400.css';
import "./globals.css"; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <RootLayout>

        <App />
        </RootLayout>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
