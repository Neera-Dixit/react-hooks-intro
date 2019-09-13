import React, {
  useEffect,
  useRef,
  useState
} from 'react';
import Axios from 'axios';

function App() {
  const [result, setResult] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setErrorStatus] = useState('');
  const [query, setQuery] = useState('1');
  const searchBoxRef = useRef();

  const getResults = async () => {
    try {
      setLoadingStatus(true);
      const response = await Axios.get(`https://jsonplaceholder.typicode.com/todos/${query}`);
      setResult(response.data);
    } catch (error) {
      setErrorStatus(error.message)
    }
    setLoadingStatus(false);
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    getResults();
  };
  
  const handleSearchClear = () => {
    searchBoxRef.current.focus();
    setQuery('');
    setResult({});
  }

  useEffect(() => {
    getResults();
  }, []);
  
  return (
    <>
      <form onSubmit={handleSearch}>
        User ID: <input type="text" ref={searchBoxRef} value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Search</button>
        <button type="button" onClick={handleSearchClear}>Clear</button>
      </form>
  
      {
        error && <h2>{error}</h2>
      }
      { 
       loadingStatus ? 
        <h1>Loading Results ....</h1>
        :
        result.id && (
          <div>
            <h2>User ID : {result.userId}</h2>
            <h3>Todo ID : {result.id}</h3>
            <h3>Title : {result.title}</h3>
            <hr />
          </div>
          )
      }
    </>
  );
}

export default App;
