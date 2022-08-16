import React, { useState,useRef } from "react";
import "./styles/app.scss"
import Player from "./components/Player";
import Song from "./components/Song";
import chillHop from "./data"
import Library from "./components/Library";
import Nav from "./components/Nav"

function App() {
  const audioRef = useRef(null)

  const [libraryStatus,setLibraryStatus]= useState(false)
  const [songs , setSongs] = useState(chillHop())
  const [currentSong , setCurrentSong] = useState(songs[3])
  const [isPlaying ,setPlaying ] = useState(false)
  const [songInfo , setSngInfo] = useState({
    currentTime :0,
    duration :0,
    animationPercentage : 0 
});

const timeUpdateHandeler = (e) => {
  const current = e.target.currentTime
  // console.log(e.at)
  const duration = e.target.duration

  const roundedCurrent = Math.round(current)
  const roundedDuration = Math.round(duration)
  const animation = Math.round((roundedCurrent/roundedDuration)*100)
  
  console.log(duration)
  setSngInfo (
      {   ...songInfo,
          currentTime : current,
          duration,
          animationPercentage : animation
      }
  )
}
const songEndHandeler = async () =>{
  let currentIndex=songs.findIndex((song)=>song.id === currentSong.id)
     await setCurrentSong(songs[(currentIndex + 1) % songs.length])
      if(isPlaying)audioRef.current.play()
    }
  return (
    <div className={`App ${libraryStatus? 'library-active': ''}`}>
      <Nav
        libraryStatus={libraryStatus}
        setLibraryStatus={setLibraryStatus}
      />
      <Song currentSong={currentSong} />
      <Player 
      isPlaying={isPlaying} 
      setPlaying = {setPlaying}
      currentSong={currentSong}
      audioRef={audioRef}
      songInfo={songInfo}
      setSngInfo={setSngInfo}
      songs={songs}
      setCurrentSong={setCurrentSong}
      setSongs={setSongs}
      />
      <Library
       
       songs={songs}
       setCurrentSong={setCurrentSong}
       audioRef={audioRef}
       isPlaying={isPlaying}
       setSongs={setSongs}
       libraryStatus={libraryStatus}
       />
      <audio 
      onLoadedMetadata={timeUpdateHandeler}
      onTimeUpdate={timeUpdateHandeler}
      ref={audioRef}
      src={currentSong.audio}
      onEnded={songEndHandeler}
      ></audio>
    </div>
  );
}

export default App;
