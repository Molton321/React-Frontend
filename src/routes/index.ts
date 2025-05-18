import { Component, lazy } from 'react';
import UserProfile from '../pages/Users/List';
import ListUsers from '../pages/Users/List';
import ListRoles from '../pages/Roles/ListRoles';
import ListPermisions from '../pages/Permisions/ListPermisions';
import CreateUser from '../pages/Users/Create';  
import UpdateUserPage from '../pages/Users/Update';

const CreateRole = lazy(() => import('../pages/Roles/CreateRoles'))
const UpdateRole = lazy(() => import('../pages/Roles/UpdateRole'))

const CreatePermision = lazy(() => import('../pages/Permisions/UpdatePermision'))
const UpdatePermision = lazy(() => import('../pages/Permisions/UpdatePermision'))

//CAMBIAR A LAZY

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Graficas = lazy(() => import('../pages/Graficas'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Demo = lazy(() => import('../pages/Demo'))
const MapPage = lazy(() => import('../pages/DeliveryMap/MapPage'))


const coreRoutes = [
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/forms/form-elements',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Graficas,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
  {
    path: '/demo',
    title: 'Demo',
    component: Demo,
  },
  {
    path: '/users/profile',
    title: 'Profile',
    component: UserProfile 
  },
  {
    path: '/users/list',
    title: 'List',
    component: ListUsers 
  },
  {
    path: '/roles/list',
    title: 'List',
    component: ListRoles 
  },
  {
    path: '/permisions/list',
    title: 'List',
    component: ListPermisions 
  },
  {
    path: '/users/create',
    title: 'Create',
    component: CreateUser 
  },
  {
    path: '/users/update/:id',
    title: 'Update',
    component: UpdateUserPage
  },
  {
    path: '/roles/create',
    title: 'Create',
    component: CreateRole
  },
  {
    path: '/roles/update/:id',
    title: 'Update',
    component: UpdateRole
  },
  {
    path: '/permisions/create',
    title: 'Create',
    component: CreatePermision 
  },
  {
    path: '/permisions/update/:id',
    title: 'Update',
    component: UpdatePermision
  },
  {
    path: '/deliveryMap',
    title: 'Map',
    component: MapPage
  },
];

const routes = [...coreRoutes];
export default routes;
