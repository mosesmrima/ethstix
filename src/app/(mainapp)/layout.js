import AppNavbar from '../../components/NavBar';

const Layout = ({ children }) => {
    return (
        <div>
            <h1>Hello</h1>
            <AppNavbar/>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
