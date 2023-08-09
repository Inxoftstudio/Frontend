import { Navbar, Footer } from "../components";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {

    const { children } = props;

    return (
        <>
            <Navbar />
                <main>{children}</main>
            <Footer />
        </>
    )

}

export default Layout;