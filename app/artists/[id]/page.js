"use client";
import { useEffect, useState, useCallback } from "react";
import { apiRequest } from "../../../api/api";
import Image from "next/image";

export default function AristPage({ params }) {
  const [artist, setArtist] = useState({});

  const getSpecificArtist = async () => {
    const artist = await apiRequest("get", `/artists/${params.id}`);
    setArtist(artist.data);
  };

  useEffect(() => {
    getSpecificArtist();
  }, [getSpecificArtist]);

  return (
    <main className="">
      <div className="min-w-screen min-h-screen bg-[#233A5E] flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
          <div className="md:flex items-center -mx-10">
            <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
              <div className="relative">
                <Image
                  src={artist.img}
                  className="relative z-10 rounded-xl"
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-10">
              <div className="mb-10">
                <h1 className="font-bold uppercase text-2xl mb-5">
                  {" "}
                  {artist.name}
                </h1>
                <p className="text-sm">{artist.description}</p>
              </div>
              <div>
                <div className="inline-block align-bottom">
                  <button className="bg-[#23395E] opacity-75 text-white rounded-full px-10 py-2 font-semibold">
                    <i className="mdi mdi-cart -ml-2 mr-2"></i>{" "}
                    {artist.auditeurs} auditeurs spotify
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
        <div>
          <div className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
            <Image
              className="object-cover object-center rounded-full"
              src={artist.img}
              alt=""
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
