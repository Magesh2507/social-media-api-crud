import { useContext } from 'react';
import Feed from './Feed';
import DataContext from './context/DataContext';

const Home = () => {
  const {searchResults, fetchError, isLoading} = useContext(DataContext);
  return (
    <main className='Home'>
      {isLoading && <h4 className='statusMsg'>Loading...</h4>}
      {fetchError && !isLoading && <p className='statusMsg' style={{color:"red"}}>{fetchError}</p>}
      {!isLoading && !fetchError &&  (searchResults.length ? <Feed posts={searchResults} /> : <h4 className='statusMsg'>No posts to show.</h4>)}
    </main>
  )
}

export default Home;