import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Editor from "../pages/Editor";
import MainPage from "../pages/MainPage";
import ReadContent from "../pages/ReadContent";
import EditContent from "../pages/EditContent";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <MainPage />
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
    },
    {
        path: "/register",
        element: (
            <Register />
        )
    },
    {
        path: "/editor",
        element: (
            <Editor />
        )
    },
    {
        path: "/content/:contentID",
        element: (
            <ReadContent />
        )
    },
    {
        path: "/content/:contentID/:versionID",
        element: (
            <ReadContent />
        )
    },
    {
        path: "/edit/:contentID/:versionID",
        element: (
            <EditContent />
        )
    }
])

export default Routes;