import Header from "../components/header"
import styles from "./index.module.scss"

type LayoutProps = {
    children: React.ReactNode,
    toggleIsNavShown: () => void,
};

function MainLayout ({children, toggleIsNavShown}: LayoutProps):JSX.Element {
    return (
        <>
            <Header toggleIsNavShown={toggleIsNavShown} />
            <main className={styles.main}>{children}</main>
        </>
    );

}

export default MainLayout;
