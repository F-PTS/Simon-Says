import { Suspense, lazy } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { Route, Routes as RouterRoutes } from "react-router-dom";

const NotFound = () => <Center>404 not Found</Center>;

const HomePage = lazy(() => import("../pages/HomePage"));
const GameRoom = lazy(() => import("../pages/GameRoom"));
const GameProvider = lazy(() => import("../providers/GameProvider"));

export const Routes = () => {
  return (
    <Suspense
      fallback={
        <Center>
          <Spinner />
        </Center>
      }
    >
      <RouterRoutes>
        <Route path="/" Component={HomePage} />
        <Route
          path="/game/:id"
          Component={() => (
            <GameProvider>
              <GameRoom />
            </GameProvider>
          )}
        />
        <Route Component={NotFound} />
      </RouterRoutes>
    </Suspense>
  );
};
