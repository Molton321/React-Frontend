import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';

import ProtectedRoute from '../src/components/Auth/ProtectedRoute';
import Google from './pages/Authentication/Google';
import { account } from './services/appwrite';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadUser();
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const loadUser = async () => {
    let user = localStorage.getItem('user');

    if (!user) {
      try {
        const googleUser = await account.get().then((res) => console.log(res));

        /* const saveUser = {
          id: googleUser.$id,
          name: googleUser.name,
          email: googleUser.email,
        };
        localStorage.setItem('user', JSON.stringify(saveUser));
        */
      } catch (error) {
        console.log(error);
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/auth/google" element={<Google />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DefaultLayout />}>
            <Route index element={<ECommerce />} />
            {routes.map((routes, index) => {
              const { path, component: Component } = routes;
              return (
                <Route
                  key={index}
                  path={path}
                  element={
                    <Suspense fallback={<Loader />}>
                      <Component />
                    </Suspense>
                  }
                />
              );
            })}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
