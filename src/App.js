import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Home from "./pages/home/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import About from "./components/About";
import Error from "./components/Error";
import RestaurantMenu from "./pages/menu/RestaurantMenu";

const Contact = lazy(() => import("./components/Contact"));

const AppLayout = () => {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
    </div>
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
          <Suspense fallback={<p>Loading...</p>}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/restaurant/:restaurantId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const rootElemenent = document.getElementById("root");
const root = ReactDOM.createRoot(rootElemenent);
root.render(<RouterProvider router={appRouter} />);
