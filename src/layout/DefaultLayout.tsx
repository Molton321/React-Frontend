import { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../stores/store';
const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Provider store={store}>
  <div className="dark:bg-boxdark-2 dark:text-bodydark">
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 🔲 Overlay */}
      {sidebarOpen && (
  <div
    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[9980]"
    onClick={() => setSidebarOpen(false)}
  ></div>
)}

      {/* Main Content */}
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden z-50">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  </div>
</Provider>

  );
};

export default DefaultLayout;