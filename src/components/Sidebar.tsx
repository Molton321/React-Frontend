import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../assets/DELIGO.png';
import SidebarLinkGroup from './SidebarLinkGroup';

import { useSelector } from 'react-redux';
import { RootState } from '../../src/stores/store';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const user = useSelector((state: RootState) => state.user.user);
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );
  const [modelsDropdownOpen, setModelsDropdownOpen] = useState(false);

  const models = [
    { path: '/customer', label: 'Clients' },
    { path: '/driver', label: 'Delivers' },
    { path: '/motorcycle', label: 'Motorcycles' },
    { path: '/product', label: 'Products' },
    { path: '/restaurant', label: 'Restaurants' },
    { path: '/shift', label: 'Shifts' },
    { path: '/order', label: 'Orders' },
    { path: '/address', label: 'Address' },
    { path: '/issue', label: 'Issue' },
    { path: '/menu', label: 'Menus' },
    { path: '/photo', label: 'Photos' },
  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <>
      {user && (
        <>
          {/* 🧭 Sidebar */}
          <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white text-[#353343] duration-300 ease-linear dark:bg-boxdark ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
              <div className="block flex-shrink-0 center ml-3 mt-2 w-25">
                <NavLink to="/">
                  <img src={Logo} alt="Logo" />
                </NavLink>
              </div>

              <button
                ref={trigger}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <svg
                  className="fill-current dark:text-white"
                  width="20"
                  height="18"
                  viewBox="0 0 20 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                    fill=""
                  />
                </svg>
              </button>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
              {/* <!-- Sidebar Menu --> */}
              <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                {/* <!-- Menu Group --> */}
                <div>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    MENU
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    <li>
                      <button
                        type="button"
                        className="flex items-center w-full text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        aria-controls="dropdown-example"
                        data-collapse-toggle="dropdown-example"
                        onClick={() => setModelsDropdownOpen((prev) => !prev)}
                      >
                        <div
                          className={
                            'w-full group relative flex items-center rounded-sm py-2 px-4 font-bold text-[#353343] dark:text-white duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4'
                          }
                        >
                          <span>Models</span>
                          <svg
                            className="ml-auto w-4 h-4 text-gray-400  dark:group-hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </button>
                      <ul
                        id="dropdown-example"
                        className={`${modelsDropdownOpen ? '' : 'hidden'} py-2 space-y-2`}
                      >
                        {models.map((model) => (
                          <li key={model.path}>
                            <NavLink
                              to={model.path}
                              className={`ml-10 group relative flex items-center rounded-sm py-2 px-4 font-bold text-[#353343] dark:text-white
duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4 ${
                                pathname.includes(
                                  model.path.replace('/', ''),
                                ) && 'bg-bodydark1 dark:bg-meta-4'
                              }`}
                            >
                              <span>{model.label}</span>
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    </li>

                    {/* <!-- Menu Item Map --> */}
                    <li>
                      <NavLink
                        to="/deliveryMap"
                        className={`group relative flex items-center rounded-sm py-2 px-4 font-bold  text-[#353343] dark:text-white
duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4 ${
                          pathname.includes('deliveryMap') &&
                          'dark:bg-meta-4 dark:hover:bg-meta-4'
                        }`}
                      >
                        <span>¿Dónde va mi pedido?</span>
                        <svg
                          className="ml-auto w-4 h-4 text-gray-400  dark:group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </NavLink>
                    </li>
                    {/* <!-- Menu Item Profile --> */}

                    {/* <!-- Menu Item Tables --> */}
                    <li>
                      <NavLink
                        to="/tables"
                        className={`group relative flex items-center rounded-sm py-2 px-4 font-bold text-[#353343] dark:text-white
duration-300 ease-in-out hover:bg-bodydark1 dark:hover:bg-meta-4 ${
                          pathname.includes('tables') &&
                          'bg-bodydark1 dark:bg-bodydark1'
                        }`}
                      >
                        <span>¿Cómo va mi negocio?</span>
                        <svg
                          className="ml-auto w-4 h-4 text-gray-400  dark:text-gray-400 dark:group-hover:text-white"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </NavLink>
                    </li>
                    {/* <!-- Menu Item Tables --> */}
                  </ul>
                </div>
              </nav>
              {/* <!-- Sidebar Menu --> */}
            </div>
          </aside>
        </>
      )}
    </>
  );
};
export default Sidebar;
