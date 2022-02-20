import styles from "./index.module.scss"
import Link from "next/link"

type HeaderProps = {
    toggleIsNavShown: () => void,
}

function Header({toggleIsNavShown}: HeaderProps):JSX.Element {
    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header__icon}>
                    <img
                        className={styles.header__icon_item}
                        onClick={() => toggleIsNavShown()}
                        src="/img/headerIcon/menu.png"
                        alt="menu icon"
                        loading="eager"
                    />
                </div>
                <h1 style={{ letterSpacing: "1px", textAlign: "left" }}>
                    <Link href="/">
                        <a href="">
                            <span style={{ fontWeight: 250 }}>BTM</span>
                            <span style={{ fontWeight: 100 }}>AreaNews</span>
                        </a>
                    </Link>
                </h1>
            </header>
        </section>
    );
}

export default Header