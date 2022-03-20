import { DO_LIKE } from '../../graphql/pokemons'
import { useMutation } from '@apollo/client'
import styles from './scss/rating.module.scss'

function Rating({
  name,
  stars,
  refetch
}: {
  name: string
  stars: number
  refetch: any
}) {
  const [doLike, { loading, error }] = useMutation(DO_LIKE, {
    onCompleted: () => {
      refetch()
    }
  })

  if (loading) return <div>Submitting...</div>
  if (error) return <div>Submission error! ${error.message}</div>

  function handleLike() {
    doLike({
      variables: {
        name
      }
    })
  }

  return (
    <div className={styles.rating}>
      <button onClick={handleLike} className={styles.button}>
        ⭐
      </button>
      <b>{stars} stars</b>
    </div>
  )
}

export default Rating
