import { Query, TPokemon } from '../../types'
import Rating from './Rating'
import styles from './scss/card.module.scss'

function Tag({ name }: { name: string }) {
  return <p className={styles.tag}>{name}</p>
}

function Tags({ name, tags }: { name: string; tags: Array<{ name: string }> }) {
  return (
    <div>
      <p className={styles.titleTags}>{name}:</p>
      <div className={styles.tags}>
        {tags.map(({ name }) => (
          <Tag key={name} name={name} />
        ))}
      </div>
    </div>
  )
}

function Card({
  name,
  image,
  types,
  abilities,
  stars,
  refetch
}: TPokemon & any) {
  return (
    <article className={styles.card}>
      <div className={styles.container}>
        <img alt={name} className={styles.image} src={image} />
        <Rating refetch={refetch} stars={stars} name={name} />
      </div>
      <div className={styles.footer}>
        <h2 className={styles.name}>{name}</h2>
        <Tags name="Types" tags={types} />
        <Tags name="Abilities" tags={abilities} />
      </div>
    </article>
  )
}

export default Card

export function SkeletonCard() {
  return <div>skeleton</div>
}
