import type { RepoDetailTypes } from "../types/commonTypes"
import styles from './Card.module.sass'

const { card, repoDetailsBox } = styles

interface CardProps {
      repoDetails: RepoDetailTypes
}

export const Card = ({repoDetails}: CardProps) => {
      const formatNumber = (num: number): string => {
            if (num >= 1_000_000) 
                  return (num / 1_000_000).toFixed(1).replace(/.0$/, '') + 'M';
            
            if (num >= 1_000) 
                  return (num / 1_000).toFixed(1).replace(/.0$/, '') + 'k';
            
            return num.toString() || '0';
      }
      
      return (
            <div className={card} key={repoDetails.id}>
                  <div>
                        <h3>{repoDetails.name}</h3>
                        <p>{repoDetails.description}</p>
                  </div>

                  <div className={repoDetailsBox}>
                        <div>
                              <img src={repoDetails.owner.avatar_url} alt="Tech Stack Image" />
                              <h5>{repoDetails.owner.login}</h5>
                        </div>

                        <div>⭐ {formatNumber(repoDetails.starsAmount)} </div>
                  </div>
            </div>
      )
}