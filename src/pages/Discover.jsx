import React, { useState } from 'react';
import { Error, Loader, SongCard } from '../components';
import { genres } from '../assets/constants';

import { useDispatch, useSelector } from 'react-redux';

import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const Discover = () => {
  const [genreTitile, setGenreTitle] = useState("Pop");
  const { data, isFetching, error } = useGetTopChartsQuery();

  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  console.log(data);

  if (isFetching) {
    return <Loader title="Loading songs..." />
  }
  if (error) {
    return <Error />
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">
          Discover {genreTitile}
        </h2>
        <select
          name=""
          id=""
          onChange={() => {}}
          value=""
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre, i) => (
            <option value={genre.value} key={i}>{genre.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {
          data.tracks?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              i={i}
              activeSong={activeSong}
              isPlaying={isPlaying}
              data={data.tracks}
            />
          ))
        }
      </div>
    </div>
  )
}

export default Discover
