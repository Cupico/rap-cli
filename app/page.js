"use client";
import { useState, useEffect } from "react";
import { apiRequest } from "../api/api";
import ArtistCard from "../components/ArtistCard";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getArtists = async (query) => {
    const artists = await apiRequest("get", `/artists?${query}`);
    const response = artists.data.artists ? artists.data?.artists : artists.data
    setArtists(response);
    setTotalPages(artists.data.totalPages);
  };

  useEffect(() => {
    getArtists(`limit=12&page=${page}`);

    return () => setArtists([]);
  }, [page]);

  return (
    <main className="px-10 sm:px-24 py-10">
      <div className="mb-10 sm:mb-12s">
        <Search getArtists={getArtists} setPage={setPage} />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-20">
        {artists.length > 0 && artists.map((e, i) => (
          <div key={i}>
            <ArtistCard e={e} pathname={"artists"} />
          </div>
        ))}
      </div>

      <Pagination totalPages={totalPages} setPage={setPage} page={page} />
    </main>
  );
}
