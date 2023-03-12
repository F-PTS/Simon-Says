import { Suspense, lazy } from "react";
import { Center, Spinner } from "@chakra-ui/react";
import { Route } from "react-router-dom";

const NotFound = () => <Center>404 not Found</Center>;

const Routes = () => {
    const HomePage = lazy(() => import("../pages/HomePages/HomePage"));
    const GameRoom = lazy(() => import("../pages/GameRoom"));
    const GameProvider = lazy(() => import("../providers/GameProvider"));

    return (
        <Suspense
            fallback={
                <Center>
                    <Spinner />
                </Center>
            }
        >
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
        </Suspense>
    );
};

export default Routes;
