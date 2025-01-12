import { Home } from "./components/Home";
import { Connections } from "./components/Connections";
import { Connection } from "./components/Connection";
import { NewGame } from "./components/NewGame";
import { CoinToss } from "./components/CoinToss";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/new',
    element: <NewGame />
  },
  {
    path: '/coin-toss',
    element: <CoinToss />
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
