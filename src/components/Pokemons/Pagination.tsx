import { Query } from '../../types'
import { useRouter } from 'next/router'
import styles from './scss/main.module.scss'

function Pagination({ limit, offset }: Query) {
  const router = useRouter()
  const prevButtonDisabled = offset < 10 ? styles.disabled : ''
  const nextButtonDisabled = offset > 1095 ? styles.disabled : ''

  const buttonPrevClasses =
    styles.button + ' ' + styles.paddingPrev + ' ' + prevButtonDisabled
  const buttonNextClasses =
    styles.button + ' ' + styles.paddingNext + ' ' + nextButtonDisabled

  function handleBack() {
    if (offset >= 10) {
      router.push(`/${Number(offset) - 10}/?limit=${limit}`)
    }
  }

  function handleNext() {
    if (offset <= 1095) {
      router.push(`/${Number(offset) + 10}/?limit=${limit}`)
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        disabled={Boolean(offset < 10)}
        className={buttonPrevClasses}
        onClick={handleBack}
      >
        <span className="material-icons-outlined">chevron_left</span>
        Atras
      </button>
      <p>
        Pokemones del <b>{offset}</b> al <b>{Number(offset) + Number(limit)}</b>
      </p>
      <button className={buttonNextClasses} onClick={handleNext}>
        Siguiente
        <span className="material-icons-outlined">chevron_right</span>
      </button>
    </div>
  )
}

export default Pagination
