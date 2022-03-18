import Link from 'next/link'
import styles from './main.module.scss'

function Header() {
  const src =
    'https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png'

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a className={styles.link}>
            <img height={64} src={src} alt="pokeapi" />
          </a>
        </Link>
      </div>
    </header>
  )
}

export default Header
