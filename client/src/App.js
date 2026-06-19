import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Home from "./pages/home/Home";

import About from "./components/ui/About";
import Error from "./components/ui/Error";

import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { SWRProvider } from "./lib/swr-provider";

const Contact = lazy(() => import("./components/ui/Contact"));
const Menu = lazy(() => import("./pages/menu/Menu"));
const Cart = lazy(() => import("./pages/cart/Cart"));

// Shared Suspense fallback for lazily-loaded routes.
const PageLoader = (
  <div className="flex min-h-full items-center justify-center">
    <p className="text-center">Loading…</p>
  </div>
);

const AppLayout = () => {
  return (
    <SWRProvider>
      <div className="app-layout flex h-screen w-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
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
          <Suspense fallback={PageLoader}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: (
          <Suspense fallback={PageLoader}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={PageLoader}>
            <Cart />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);
root.render(<RouterProvider router={appRouter} />);
