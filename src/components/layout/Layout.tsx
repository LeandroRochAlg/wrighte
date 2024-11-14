import { useNavigate } from "react-router-dom";
import Navbar from "../system/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('token') ? true : false;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username'); // Remove o username ao sair
        navigate('/login');
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            {children}
        </>
    );
};

export default Layout;