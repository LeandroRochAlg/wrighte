import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <h1>Página inicial</h1>
            </>
        ),
    },
    {
        path: "*",
        element: (
            <>
                <h1>Página não encontrada</h1>
            </>
        )
    },
    {
        path: "/login",
        element: (
            <Login />
        )
    }
])

export default Routes;