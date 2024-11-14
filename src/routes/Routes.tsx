import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Editor from "../pages/Editor";
import MainPage from "../pages/MainPage";
import ReadContent from "../pages/ReadContent";
import EditContent from "../pages/EditContent";
import Layout from "../components/layout/Layout";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: (
            <Layout>
                <MainPage />
            </Layout>
        ),
    },
    {
        path: "*",
        element: (
            <Layout>
                <h1>Página não encontrada</h1>
            </Layout>
        )
    },
    {
        path: "/login",
        element: (
            <Layout>
                <Login />
            </Layout>
        )
    },
    {
        path: "/register",
        element: (
            <Layout>
                <Register />
            </Layout>
        )
    },
    {
        path: "/editor",
        element: (
            <Layout>
                <Editor />
            </Layout>
        )
    },
    {
        path: "/content/:contentID",
        element: (
            <Layout>
                <ReadContent />
            </Layout>
        )
    },
    {
        path: "/content/:contentID/:versionID",
        element: (
            <Layout>
                <ReadContent />
            </Layout>
        )
    },
    {
        path: "/edit/:contentID/:versionID",
        element: (
            <Layout>
                <EditContent />
            </Layout>
        )
    }
]);

export default Routes;