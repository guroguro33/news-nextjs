import styles from "./index.module.scss"
import Image from "next/image"
import Link from "next/link"

function Header():JSX.Element {
    return (
        <section className={styles.container}>
            <header className={styles.header}>
                <div className={styles.header__icon}>
                    <Image 
                        src="/img/headerIcon/menu.png"
                        alt="menu icon"
                        loading="eager"
                        width={35}
                        height={35}
                        priority
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