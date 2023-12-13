// ListPage.tsx
import React, { useEffect, useState, useRef } from "react";
import { FixedSizeList as List } from "react-window";
import useFetch from "../hooks/useFetch";

const ListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const { data, loading, error, fetchData } = useFetch(`https://swapi.dev/api/planets/?page=${pageNumber}`);
  const listRef = useRef<List>(null);

  useEffect(() => {
    if (data && data.results) {
      setItems((prevItems) => [...prevItems, ...data.results]);
      setIsLoading(false);
    }
  }, [data]);

  const handleItemsRendered = (itemsRendered: { overscanStartIndex: number; overscanStopIndex: number }) => {
    const { overscanStopIndex } = itemsRendered;
    const totalItems = items.length;

    if (overscanStopIndex === totalItems - 1 && !isLoading) {
      setIsLoading(true);
      setPageNumber((prevPageNumber) => prevPageNumber + 1);
    }
  };

  return (
    <div>
      {items.length === 0 && !loading && !error && <div>Does not exist</div>}
      <List height={400} itemCount={items.length} itemSize={50} width={"100%"} onItemsRendered={handleItemsRendered} ref={listRef}>
        {({ index, style }) => (
          <a href={items[index]?.url} style={style}>
            {items[index]?.name}
          </a>
        )}
      </List>
      {isLoading && !error && <div>Loading more...</div>}
      {error && <div>Done</div>}
    </div>
  );
};

export default ListPage;
