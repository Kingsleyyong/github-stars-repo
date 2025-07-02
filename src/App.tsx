import styles from './App.module.sass'
import { Card } from './components/Card';
import { useFetchRepos } from './hooks/useFetchRepos';

const { mainContainer, header, cardsContainer, paginationButtonGroup } = styles

function App() {
  const { repos, loading, hasMore, loadMore, page, setPage } = useFetchRepos();

  return (
    <div className={mainContainer}>
      <div className={header}>Trending Repos</div>

      <div className={cardsContainer}>
        {!loading ? repos.slice((page - 1) * 30, page * 30).map((repo, repoIndex) => {
          return (
            <Card repoDetails={repo} key={`${repoIndex} ${repo.id}`} />
          );
        }) : <p>Loading...</p>}
      </div>
      
      <div className={paginationButtonGroup}>
        {page !== 1 && <button onClick={()=> setPage((prev)=> prev-1)}>{`<`}</button>}
        {hasMore && <button onClick={loadMore}>{`>`}</button>}
      </div>
    </div>
  )
}

export default App
 