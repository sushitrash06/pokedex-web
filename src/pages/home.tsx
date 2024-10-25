import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pokemon } from "../utils/type";
import { useInfiniteQuery } from "react-query";
import { fetchPokemonList } from "../server/api"; // Ensure you have fetchPokemonTypes
import { fetchPokemonSearch, fetchPokemonTypes } from "../utils/utils";
import InputComponent from "../component/atom/input";
import Loading from "../component/atom/loading";
import ListPokemon from "../component/organism/list-pokemon";

interface FormValues {
  search: string;
  type: string;
}

const HomePage: React.FunctionComponent = () => {
  const [keywordSearch, setKeywordSearch] = useState("");
  const [selectedType, setSelectedType] = useState<string>(""); // State for selected type
  const { control, handleSubmit } = useForm<FormValues>();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]); // State for Pokémon types

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery(
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
        const response = await fetchPokemonTypes(); // Fetch Pokémon types
        setTypes(response); // Assuming response is an array of types
      } catch (error) {
        console.log(error, "Error fetching types");
      }
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!data || !data.pages) return;
      if (!keywordSearch && !selectedType) return; // Fetch only if search or type is selected
      try {
        const filteredResult = await fetchPokemonSearch(keywordSearch, selectedType); // Pass both keyword and type to the search function
        
        // Filter out any null values from the filteredResult
        const validResults = filteredResult.filter((result) => result !== null) as Pokemon[]; // Type assertion here

        setLoading(true);
        setTimeout(() => {
          setSearchResult(validResults); // Update state with valid results
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error, "Error while fetching filtered data");
      }
    };
    fetchData();
  }, [data, keywordSearch, selectedType]); // Add selectedType to dependencies

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    setKeywordSearch(formData.search);
    setSelectedType(formData.type); // Update selected type
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-400">
      <div className="relative flex-1 overflow-y-auto" onScroll={handleLoadMore}>
        <form onSubmit={handleSubmit(onSubmit)} className="m-5">
          <InputComponent
            control={control}
            name="search"
            placeholder="Search by name ..."
            className="h-12 px-4 bg-green-300 rounded-full focus:outline-none"
          />
          <select
            className="h-12 px-4 bg-green-300 rounded-full mt-2"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)} // Update selected type on change
          >
            <option value="">Select a type...</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </form>
        {loading ? (
          <Loading />
        ) : (
          <ListPokemon
            type="list"
            isLoading={isLoading}
            dataList={
              !keywordSearch && !selectedType
                ? data
                  ? data.pages.flat()
                  : []
                : searchResult // Use searchResult for filtered results
            }
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
