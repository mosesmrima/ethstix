import AppNavbar from '../../components/NavBar';

const Layout = ({ children }) => {
    return (
        <div>
            <AppNavbar/>
            <main className={"flex flex-col justify-center items-center"}>{children}</main>
        </div>
    );
};

export default Layout;
