import React, { useContext } from "react";
import AddMovie from "./AddMovie";
import MovieList from "./MovieList";
import Search from "./Search";
import AppContext from "../../context/AppContext";
import MyMovies from "./MyMovies";
import Loading from "./Loading";
import styled from "styled-components";

const HomeStyle=styled("div")`
  background-color: #f2fcf4;
  background-image: url("https://www.transparenttextures.com/patterns/always-grey.png");
  min-height: 100vh;
  height: 100%;
  padding-bottom: 5rem;
`
const HeaderStyle=styled("div")`
  display: flex;
  flex-direction: row;
`
export default function Home() {
  const { state } = useContext(AppContext);

  return (
    <HomeStyle>
      <HeaderStyle>
        <AddMovie />
        <MyMovies />
      </HeaderStyle>
      <Search />
      {state?.isSearch && state?.loading && <Loading />}
      {!state?.loading && (
        <MovieList
          list={state?.isSearch ? state?.searchedMovieList : state?.movieList}
        />
      )}
    </HomeStyle>
  );
}
