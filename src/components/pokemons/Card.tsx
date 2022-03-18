import { TPokemon } from '../../types'
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

function Card({ name, sprites, types, abilities }: TPokemon) {
  const {
    other: {
      'official-artwork': { front_default: frontDefault }
    }
  } = sprites

  const typeTags = types.map(({ type: { name } }) => ({ name }))
  const abilitiesTags = abilities.map(({ ability: { name } }) => ({ name }))

  return (
    <article className={styles.card}>
      <div className={styles.container}>
        <img alt={name} className={styles.image} src={frontDefault} />
      </div>
      <div className={styles.footer}>
        <h2 className={styles.name}>{name}</h2>
        <Tags name="Types" tags={typeTags} />
        <Tags name="Abilities" tags={abilitiesTags} />
      </div>
    </article>
  )
}

export default Card

export function SkeletonCard() {
  return <div>skeleton</div>
}
