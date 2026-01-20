import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import Home from "./pages/home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import About from "./components/ui/About";
import Error from "./components/ui/Error";

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { SWRProvider } from "./lib/swr-provider";

const Contact = lazy(() => import("./components/ui/Contact"));
const Menu = lazy(() => import("./pages/menu/Menu"));
const Cart = lazy(() => import("./pages/cart/Cart"));

const AppLayout = () => {
  return (
    <SWRProvider>
      <div className="app-layout flex h-screen w-screen flex-col">
        <Header />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </SWRProvider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: (
          <Suspense
            fallback={
              <div className="flex min-h-full items-center justify-center">
                <p className="text-center">Loading…</p>
              </div>
            }
          >
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: (
          <Suspense
            fallback={
              <div className="flex min-h-full items-center justify-center">
                <p className="text-center">Loading…</p>
              </div>
            }
          >
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense
            fallback={
              <div className="flex min-h-full items-center justify-center">
                <p className="text-center">Loading…</p>
              </div>
            }
          >
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const rootElemenent = document.getElementById("root");
const root = ReactDOM.createRoot(rootElemenent);
root.render(<RouterProvider router={appRouter} />);
