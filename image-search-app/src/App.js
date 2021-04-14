import { useEffect, useState } from "react";
import axios from 'axios'
import InfiniteScroll from "react-infinite-scroll-component";
import './App.css';




function App() {

  

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("code");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const CLIENT_ID = "4lRq1m1Fttl03YvV874xIsSI4v8Dead2o1KAcZNFiTk";
  const FETCHURL = `https://api.unsplash.com/search/photos?client_id=${CLIENT_ID}&query=${query}&page=${page}`;


  const searchImages = (e) => {
    if (e.keyCode === 13) {
      setQuery(e.target.value);
      setData([])
    }
  };



  const fetchImages = () => {
    axios.get(FETCHURL, {
      headers: {},
    })
      .then((response) => {
        setData([...data, ...response.data.results]);
      })
      .catch((error) => { console.log(error) });
    setPage(page + 1)
  };

  useEffect(() => {
    fetchImages();
  }, [query])






  return (
    <div className="App-flex">

      <input className="search" type="text" onKeyDown={(e) => searchImages(e)} placeholder="Search For Images 🔎" />
      <InfiniteScroll dataLength={data.length} next={fetchImages} hasMore={hasMore} loader={<p>Load more..</p>} endMessage={
        <p style={{ textAlign: "center" }}><b>Yay! You have seen it all</b></p>
      } >

      <div className="main flex">
        {data.map((data, key) => (
          <div className="container" key={key}>
            <img src={data.urls.small} className="image" alt={data.alt_description} />
            <h4>Photo by {data.user.name} 📸</h4>
          </div>

        ))}
      </div>
      </InfiniteScroll>
    </div >
  );
}

export default App;
