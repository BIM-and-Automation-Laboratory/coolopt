import AssignmentInd from "@material-ui/icons/AssignmentInd";
import MultilineChartSharpIcon from "@material-ui/icons/MultilineChartSharp";
import SettingsInputComponentSharpIcon from "@material-ui/icons/SettingsInputComponentSharp";
import DynamicFeedSharpIcon from "@material-ui/icons/DynamicFeedSharp";
import HomeWorkSharpIcon from "@material-ui/icons/HomeWorkSharp";
import ErrorOutlineSharpIcon from "@material-ui/icons/ErrorOutlineSharp";
import MemoryIcon from "@material-ui/icons/Memory";
import FingerprintSharpIcon from "@material-ui/icons/FingerprintSharp";
import EcoSharpIcon from "@material-ui/icons/EcoSharp";
import LibraryBooksSharpIcon from "@material-ui/icons/LibraryBooksSharp";

// Import the components here after creating them in the /src/pages
import BIMModelsPage from "../pages/BIMModelsPage/BIMModelsPage.js";
import DashboardPage from "../pages/DashboardPage/DashboardPage.js";
import AIControlPage from "../pages/AIControlPage/AIControlPage.js";
import AnalyticsPage from "../pages/AnalyticsPage/AnalyticsPage.js";
import IoTConfigPage from "../pages/IoTConfigPage/IoTConfigPage.js";
import ETicketingPage from "../pages/ETicketingPage/EticketingPage.js";
import EstateDocPage from "../pages/EstateDocPage/EstateDocPage.js";
import EnergyPerfPage from "../pages/EnergyPerfPage/EnergyPerfPage.js";
import RolesAuthPage from "../pages/RolesAuthPage/RolesAuthPage.js";
import GettingStartedPage from "../pages/GettingStartedPage/GettingStartedPage.js";

const appRoutes = [
  // {
  //   id: 1,
  //   path: "/getting-started",
  //   exact: false,
  //   name: "Get started",
  //   icon: AssignmentInd,
  //   component: GettingStartedPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  // {
  //   id: 1,
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: DynamicFeedSharpIcon,
  //   component: DashboardPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  // {
  //   id: 2,
  //   path: "/ai",
  //   name: "AI Control",
  //   icon: MemoryIcon,
  //   component: AIControlPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  // {
  //   id: 3,
  //   path: "/analytics",
  //   name: "Analytics",
  //   icon: MultilineChartSharpIcon,
  //   component: AnalyticsPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  {
    id: 4,
    path: "/ld-bim",
    name: "LD-BIM",
    icon: HomeWorkSharpIcon,
    component: BIMModelsPage,
    layout: {
      facilityManager: "/facilityManager",
      admin: "/admin",
    },
  },
  {
    id: 5,
    path: "/iot-config",
    name: "IoT Configuration",
    icon: SettingsInputComponentSharpIcon,
    component: IoTConfigPage,
    layout: {
      facilityManager: "/facilityManager",
      admin: "/admin",
    },
  },
  // {
  //   id: 6,
  //   path: "/e-ticketing",
  //   name: "E-Ticketing",
  //   icon: ErrorOutlineSharpIcon,
  //   component: ETicketingPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  // {
  //   id: 7,
  //   path: "/roles-auth",
  //   name: "Roles and Auth",
  //   icon: FingerprintSharpIcon,
  //   component: RolesAuthPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  // {
  //   id: 8,
  //   path: "/energy-performance",
  //   name: "Energy Performance",
  //   icon: EcoSharpIcon,
  //   component: EnergyPerfPage,
  //   layout: {
  //     facilityManager: "/facilityManager",
  //     admin: "/admin"
  //   },
  // },
  {
    id: 9,
    path: "/cobie-lbd",
    name: "COBie --> LBD",
    icon: LibraryBooksSharpIcon,
    component: EstateDocPage,
    layout: {
      facilityManager: "/facilityManager",
      admin: "/admin",
    },
  },
];

export default appRoutes;
