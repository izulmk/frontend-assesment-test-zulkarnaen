import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { error } from "console";

interface Planet {
  name: string;
  orbital_period: string;
  population: string;
  url: string;
  // Add other properties based on your API response
}

const ListPlanets: React.FC = () => {
  const [posts, setPosts] = useState<Planet[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // Start from page 1

  useEffect(() => {
    const fetchApiPosts = async () => {
      try {
        const res = await axios(`https://swapi.dev/api/planets/?page=${pageNumber}`);
        setPosts(res.data.results);
        setTotal(res.data.count);
        console.log(res.data.results);
        // console.log(res.data.results[pageNumber].url);
        console.log(res.data.count);
        console.log(pageNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors here, e.g., set an error state or notify the user
      }
    };

    fetchApiPosts();
  }, [pageNumber]);

  const fetchData = () => {
    setPageNumber(pageNumber + 1);
    const fetchApiPosts = async () => {
      try {
        const res = await axios(`https://swapi.dev/api/planets/?page=${pageNumber}`);
        setPosts(posts.concat(res.data.results));
        setTotal(res.data.count);
        console.log(res.data.results);
        console.log(res.data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchApiPosts();
  };

  const navigate = useNavigate();

  return (
    <div className="App">
      <h1>Infinite Scroll Bar In React JS</h1>
      <h3>Total planet - {total}</h3>
      <InfiniteScroll dataLength={posts.length} next={fetchData} hasMore={posts.length < total} loader={<h4>Loading...</h4>}>
        {posts.map((post) => (
          <div className="flex flex-col justify-center items-center border-b-2" key={post.name}>
            <li className="flex flex-row justify-between py-10 text-red-800">
              <h1>
                Planet Name: <button onClick={() => navigate(`${post.url}`)}>{post.name}</button>
                {/* Planet Name: <button onClick={() => navigate(`/detail`)}>{post.name}</button> */}
              </h1>
            </li>
          </div>
          //   <Link to={`/planets/${encodeURIComponent(post.name)}`} key={post.name}>
          //     <div className="flex flex-col justify-center items-center border-b-2" key={post.name}>
          //       <li className="flex flex-row justify-between py-10 text-red-800">
          //         <h1>Planet Name: {post.name}</h1>
          //       </li>
          //     </div>
          //   </Link>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ListPlanets;
