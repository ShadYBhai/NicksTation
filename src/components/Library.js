import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({setSongs,songs,setCurrentSong,audioRef,isPlaying,libraryStatus}) => {
    return (
        <div className={`library ${libraryStatus ? 'active-library' : ''}`}>
            <h2>Library</h2>
            <div className="library-songs"></div>
            {songs.map(song=> (
                <LibrarySong 
                songs={songs} 
                song={song} 
                setCurrentSong={setCurrentSong}
                key={song.id}
                id={song.id}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setSongs={setSongs}
                />
            ))}
        </div>
    )
}
export default Library