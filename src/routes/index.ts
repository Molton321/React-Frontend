import { lazy } from 'react';


const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/FormElements'));
const FormLayout = lazy(() => import('../pages/Form/FormLayout'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const TestComponent = lazy(() => import('../components/TestComponent'));

// Users
const ListUsers = lazy(() => import('../pages/user/list'));
// const CreatetUser = lazy(() => import('../pages/user/create'));
// const UpdatetUser = lazy(() => import('../pages/user/update'));
const ViewUser = lazy(() => import('../pages/user/view'));

// Address
const ListAddress = lazy(() => import('../pages/address/list'));
const CreateAddress = lazy(() => import('../pages/address/create'));
const UpdateAddress = lazy(() => import('../pages/address/update'));
const ViewAddress = lazy(() => import('../pages/address/view'));

// Customer
const ListCustomer = lazy(() => import('../pages/customer/list'));
const CreateCustomer = lazy(() => import('../pages/customer/create'));
const UpdateCustomer = lazy(() => import('../pages/customer/update'));
const ViewCustomer = lazy(() => import('../pages/customer/view'));

// Driver
const ListDriver = lazy(() => import('../pages/driver/list'));
const CreateDriver = lazy(() => import('../pages/driver/create'));
const UpdateDriver = lazy(() => import('../pages/driver/update'));
const ViewDriver = lazy(() => import('../pages/driver/view'));

// Issue
const ListIssue = lazy(() => import('../pages/issue/list'));
const CreateIssue = lazy(() => import('../pages/issue/create'));
const UpdateIssue = lazy(() => import('../pages/issue/update'));
const ViewIssue = lazy(() => import('../pages/issue/view'));

// Menu
const ListMenu = lazy(() => import('../pages/menu/list'));
const CreateMenu = lazy(() => import('../pages/menu/create'));
const UpdateMenu = lazy(() => import('../pages/menu/update'));
const ViewMenu = lazy(() => import('../pages/menu/view'));

// Motorcycle
const ListMotorcycle = lazy(() => import('../pages/motorcycle/list'));
const CreateMotorcycle = lazy(() => import('../pages/motorcycle/create'));
const UpdateMotorcycle = lazy(() => import('../pages/motorcycle/update'));
const ViewMotorcycle = lazy(() => import('../pages/motorcycle/view'));

// Order
const ListOrder = lazy(() => import('../pages/order/list'));
const CreateOrder = lazy(() => import('../pages/order/create'));
const UpdateOrder = lazy(() => import('../pages/order/update'));
const ViewOrder = lazy(() => import('../pages/order/view'));

// Photo
const ListPhoto = lazy(() => import('../pages/photo/list'));
const CreatePhoto = lazy(() => import('../pages/photo/create'));
const UpdatePhoto = lazy(() => import('../pages/photo/update'));
const ViewPhoto = lazy(() => import('../pages/photo/view'));

// Product
const ListProduct = lazy(() => import('../pages/product/list'));
const CreateProduct = lazy(() => import('../pages/product/create'));
const UpdateProduct = lazy(() => import('../pages/product/update'));
const ViewProduct = lazy(() => import('../pages/product/view'));

// Restaurant
const ListRestaurant = lazy(() => import('../pages/restaurant/list'));
const CreateRestaurant = lazy(() => import('../pages/restaurant/create'));
const UpdateRestaurant = lazy(() => import('../pages/restaurant/update'));
const ViewRestaurant = lazy(() => import('../pages/restaurant/view'));

// Shift
const ListShift = lazy(() => import('../pages/shift/list'));
const CreateShift = lazy(() => import('../pages/shift/create'));
const UpdateShift = lazy(() => import('../pages/shift/update'));
const ViewShift = lazy(() => import('../pages/shift/view'));


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
    component: Tables,
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
    path: '/users',
    title: 'Users',
    component: ListUsers,
  },
  // {
  //   path: '/users/create',
  //   title: 'Create User',
  //   component: CreatetUser,
  // },
  // {
  //   path: '/users/update/:id',
  //   title: 'Update User',
  //   component: UpdatetUser,
  // },
  {
    path: '/users/view/:id',
    title: 'View User',
    component: ViewUser,
  },
  {
    path: '/test',
    title: 'Test',
    component: TestComponent,
  },
  // Address
  {
    path: '/address',
    title: 'Address',
    component: ListAddress,
  },
  {
    path: '/address/create',
    title: 'Create Address',
    component: CreateAddress,
  },
  {
    path: '/address/update/:id',
    title: 'Update Address',
    component: UpdateAddress,
  },
  {
    path: '/address/view/:id',
    title: 'View Address',
    component: ViewAddress,
  },

  // Customer
  {
    path: '/customer',
    title: 'Customer',
    component: ListCustomer,
  },
  {
    path: '/customer/create',
    title: 'Create Customer',
    component: CreateCustomer,
  },
  {
    path: '/customer/update/:id',
    title: 'Update Customer',
    component: UpdateCustomer,
  },
  {
    path: '/customer/view/:id',
    title: 'View Customer',
    component: ViewCustomer,
  },

  // Driver
  {
    path: '/driver',
    title: 'Driver',
    component: ListDriver,
  },
  {
    path: '/driver/create',
    title: 'Create Driver',
    component: CreateDriver,
  },
  {
    path: '/driver/update/:id',
    title: 'Update Driver',
    component: UpdateDriver,
  },
  {
    path: '/driver/view/:id',
    title: 'View Driver',
    component: ViewDriver,
  },

  // Issue
  {
    path: '/issue',
    title: 'Issue',
    component: ListIssue,
  },
  {
    path: '/issue/create',
    title: 'Create Issue',
    component: CreateIssue,
  },
  {
    path: '/issue/update/:id',
    title: 'Update Issue',
    component: UpdateIssue,
  },
  {
    path: '/issue/view/:id',
    title: 'View Issue',
    component: ViewIssue,
  },

  // Menu
  {
    path: '/menu',
    title: 'Menu',
    component: ListMenu,
  },
  {
    path: '/menu/create',
    title: 'Create Menu',
    component: CreateMenu,
  },
  {
    path: '/menu/update/:id',
    title: 'Update Menu',
    component: UpdateMenu,
  },
  {
    path: '/menu/view/:id',
    title: 'View Menu',
    component: ViewMenu,
  },

  // Motorcycle
  {
    path: '/motorcycle',
    title: 'Motorcycle',
    component: ListMotorcycle,
  },
  {
    path: '/motorcycle/create',
    title: 'Create Motorcycle',
    component: CreateMotorcycle,
  },
  {
    path: '/motorcycle/update/:id',
    title: 'Update Motorcycle',
    component: UpdateMotorcycle,
  },
  {
    path: '/motorcycle/view/:id',
    title: 'View Motorcycle',
    component: ViewMotorcycle,
  },

  // Order
  {
    path: '/order',
    title: 'Order',
    component: ListOrder,
  },
  {
    path: '/order/create',
    title: 'Create Order',
    component: CreateOrder,
  },
  {
    path: '/order/update/:id',
    title: 'Update Order',
    component: UpdateOrder,
  },
  {
    path: '/order/view/:id',
    title: 'View Order',
    component: ViewOrder,
  },

  // Photo
  {
    path: '/photo',
    title: 'Photo',
    component: ListPhoto,
  },
  {
    path: '/photo/create',
    title: 'Create Photo',
    component: CreatePhoto,
  },
  {
    path: '/photo/update/:id',
    title: 'Update Photo',
    component: UpdatePhoto,
  },
  {
    path: '/photo/view/:id',
    title: 'View Photo',
    component: ViewPhoto,
  },

  // Product
  {
    path: '/product',
    title: 'Product',
    component: ListProduct,
  },
  {
    path: '/product/create',
    title: 'Create Product',
    component: CreateProduct,
  },
  {
    path: '/product/update/:id',
    title: 'Update Product',
    component: UpdateProduct,
  },
  {
    path: '/product/view/:id',
    title: 'View Product',
    component: ViewProduct,
  },

  // Restaurant
  {
    path: '/restaurant',
    title: 'Restaurant',
    component: ListRestaurant,
  },
  {
    path: '/restaurant/create',
    title: 'Create Restaurant',
    component: CreateRestaurant,
  },
  {
    path: '/restaurant/update/:id',
    title: 'Update Restaurant',
    component: UpdateRestaurant,
  },
  {
    path: '/restaurant/view/:id',
    title: 'View Restaurant',
    component: ViewRestaurant,
  },

  // Shift
  {
    path: '/shift',
    title: 'Shift',
    component: ListShift,
  },
  {
    path: '/shift/create',
    title: 'Create Shift',
    component: CreateShift,
  },
  {
    path: '/shift/update/:id',
    title: 'Update Shift',
    component: UpdateShift,
  },
  {
    path: '/shift/view/:id',
    title: 'View Shift',
    component: ViewShift,
  },

  // // User
  // {
  //   path: '/user',
  //   title: 'User',
  //   component: ListUser,
  // },
  // {
  //   path: '/user/create',
  //   title: 'Create User',
  //   component: CreateUser,
  // },
  // {
  //   path: '/user/update/:id',
  //   title: 'Update User',
  //   component: UpdateUser,
  // },
];

const routes = [...coreRoutes];
export default routes;
