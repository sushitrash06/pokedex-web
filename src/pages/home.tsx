import React, { useEffect, useState } from "react";
import { Pokemon } from "../utils/type";
import { useInfiniteQuery } from "react-query";
import { fetchPokemonList } from "../server/api";
import { fetchPokemonSearch, fetchPokemonTypes } from "../utils/utils";
import Loading from "../component/atom/loading";
import ListPokemon from "../component/organism/list-pokemon";
import { useSearch } from "../context/seacrh-context";

const HomePage: React.FunctionComponent = () => {

  const { searchKeyword } = useSearch();
  const [selectedType, setSelectedType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      "pokemonList",
      async ({ pageParam = 0 }) => {
        return await fetchPokemonList(pageParam * 50, 50);
      },
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.length === 50 ? allPages.length : false;
        },
      }
    );

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetchPokemonTypes();
        setTypes(response);
      } catch (error) {
        console.log(error, "Error fetching types");
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!data || !data.pages) return;
      if (!searchKeyword && !selectedType) return;
      try {
        const filteredResult = await fetchPokemonSearch(
          searchKeyword,
          selectedType
        );
        const validResults = filteredResult.filter(
          (result) => result !== null
        ) as Pokemon[];

        setLoading(true);
        setTimeout(() => {
          setSearchResult(validResults);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error, "Error while fetching filtered data");
      }
    };
    fetchData();
  }, [data, searchKeyword, selectedType]);


  const handleLoadMore = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (
      scrollTop + clientHeight >= scrollHeight * 0.9 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#242525]">
      <div className="p-4">

      <select
          className="h-12 px-4 bg-white border border-gray-200 rounded-lg mt-2 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select a type...</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Scrollable container for the Pokémon list */}
      <div
        className="flex-grow overflow-y-auto"
        onScroll={handleLoadMore}
      >
        {loading ? (
          <Loading />
        ) : (
          <ListPokemon
            type="list"
            isLoading={isLoading}
            dataList={
              !searchKeyword && !selectedType
                ? data
                  ? data.pages.flat()
                  : []
                : searchResult
            }
          />
        )}
        {isFetchingNextPage && <Loading />}
      </div>
    </div>
  );
};

export default HomePage;
