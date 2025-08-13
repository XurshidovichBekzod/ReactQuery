import { lazy, memo, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

const Layout = lazy(() => import("./page/layout/Layout"))
const Country = lazy(() => import("./page/country/Country"))
const Phone = lazy(() => import("./page/phone/Phone"))

const App = () => {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        {
          useRoutes([
            {
              path: "/",
              element: <Layout />,
              children: [
                {
                  index: true,
                  element: <Country />
                },
                {
                  path: "/phone",
                  element: <Phone/>
                }
              ]
            }
          ])
        }
      </Suspense>
    </div>
  );
};

export default memo(App);