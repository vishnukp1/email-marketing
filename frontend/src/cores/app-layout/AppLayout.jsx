import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../../routing/intex";
import { AppHeader } from "../index";

const AppLayout = () => {
  return (
    <>
      <main style={{ background: "#F6F6F6" }}>
        <div className="flex flex-row h-screen w-screen ">
          <div className="flex flex-col gap-2 w-full">
            <div className="bg-white">
              <AppHeader />
            </div>
            <div className="h-full overflow-auto">
              <section className="h-full">
                <Suspense fallback={<div>loading...........</div>}>
                  <Routes>
                    {routes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                      />
                    ))}
                  </Routes>
                </Suspense>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AppLayout;
