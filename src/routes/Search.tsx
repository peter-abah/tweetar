import { useState } from "react";
import { Link } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";

const Search = () => {
  const [query, setQuery] = useState("");

  const onSubmit = ({ query }: { query: string }) => {
    setQuery(query);
  };

  return (
    <>
      <SearchForm onSubmit={onSubmit} />
      <SearchResults query={query} />
    </>
  );
};

export default Search;
