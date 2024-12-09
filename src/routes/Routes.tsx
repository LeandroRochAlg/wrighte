import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Editor from "../pages/Editor";
import MainPage from "../pages/MainPage";
import ReadContent from "../pages/ReadContent";
import EditContent from "../pages/EditContent";
import Layout from "../components/layout/Layout";
import AboutPage from "../pages/AboutPage";
import TermsPage from "../pages/TermsPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import UserUpdate from "../pages/UserUpdate";

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
    },
    {
        path: "/about",
        element: (
            <Layout>
                <AboutPage />
            </Layout>
        )
    },
    {
        path: "/terms",
        element: (
            <Layout>
                <TermsPage />
            </Layout>
        )
    },
    {
        path: "/privacy",
        element: (
            <Layout>
                <PrivacyPolicyPage />
            </Layout>
        )
    },
    {
        path: "/update",
        element: (
            <Layout>
                <UserUpdate />
            </Layout>
        )
    }
]);

export default Routes;