import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { Connections } from "./components/Connections";
import {Connection} from "./components/Connection";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/connections',
    element: <Connections />
  },
  {
    path: '/connections/twoReeds',
    element: <Connection icon="twoReeds" />
  },
  {
    path: '/connections/lion',
    element: <Connection icon="lion" />
  },
  {
    path: '/connections/eyeOfHorus',
    element: <Connection icon="eyeOfHorus" />
  },
  {
    path: '/connections/twistedFlax',
    element: <Connection icon="twistedFlax" />
  },
  {
    path: '/connections/hornedViper',
    element: <Connection icon="hornedViper" />
  },
  {
    path: '/connections/water',
    element: <Connection icon="water" />
  }
];

export default AppRoutes;
