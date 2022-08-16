import React from "react";

const LibrarySong = ({setSongs,songs,isPlaying,song,setCurrentSong,audioRef,id}) =>{

    const songSelectHandeler =() =>{

        setCurrentSong(song)
        
        const newSongs = songs.map((song)=>{
            if(song.id === id){
                return {
                    ...song,
                    active:true,
                }
            }else{
                    return{
                    ...song,
                    active:false,
                }
            }
            
        });
        
        setSongs(newSongs)
        if(isPlaying){
            audioRef.current.play()
        }
        
    }

    return(
        <div onClick={songSelectHandeler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img src={song.cover}></img>
            <div className="song-description">
            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>
        </div>
        );
};

export default LibrarySong;