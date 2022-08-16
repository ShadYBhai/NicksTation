import  React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 //we are importing FontAwesome component
import { faPlay, faAngleLeft ,faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons"
//we are using faPlay icon , from fa component

const Player = ({audioRef,currentSong,isPlaying,setPlaying,songInfo,setSngInfo,songs,setCurrentSong,setSongs}) =>{
    //event handelers


    const playSongHandler = () => {
        if (isPlaying){
            audioRef.current.pause()
            setPlaying(!isPlaying)
        }
        else{
            audioRef.current.play()
            setPlaying(!isPlaying)
        }
        // audioRef.current.play()
    }

    const getTime = (time) => {
        return (
            Math.floor(time/60)+ ":" + ('0' + Math.floor(time % 60)).slice(-2)
                )
    }
    const dragHandeler = (e) =>{
        audioRef.current.currentTime  = e.target.value
        setSngInfo(
            {...songInfo,
            currentTime:e.target.value}
            )
    }
    const skipTrackHandeler = async (direction)=>{
        let currentIndex=songs.findIndex((song)=>song.id === currentSong.id)
        if(direction ==="skip-forward"){ 
           await setCurrentSong(songs[(currentIndex + 1) % songs.length])
           activeHandeler(songs[(currentIndex + 1) % songs.length])
        }
        if (direction == "skip-back"){
            if((currentIndex-1)%songs.length===-1){
                await setCurrentSong(songs[songs.length-1])
                activeHandeler(songs[songs.length-1])
                if(isPlaying){
                    audioRef.current.play()
                }                
                return 
            }
           await setCurrentSong(songs[(currentIndex - 1) % songs.length])
           activeHandeler(songs[(currentIndex - 1) % songs.length])
        }
    }
if(isPlaying){
    audioRef.current.play()
}

    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    const activeHandeler = (nextPrev) =>{
        const newSongs = songs.map((song)=>{
            if(song.id === nextPrev.id){
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
        
        
        if(isPlaying){
            const playPromise = audioRef.current.play()
            if(playPromise !== undefined){
                playPromise.then((audio)=>{
                    audioRef.current.play()
                })
            }
        } 
        setSongs(newSongs)
    }

    return(
        <div className="player">
                <div className="time-control">
                    <p>{getTime(songInfo.currentTime)}</p>
                    <div style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`}}className="track">
                    <input 
                    onChange={dragHandeler} 
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime} 
                    type="range" />
                    <div style={trackAnim} className="animate-track"></div>
                    </div> 
                    <p>{songInfo.duration?getTime(songInfo.duration): "0:00"}</p>
                    </div> 

                <div className="play-control">
                    <FontAwesomeIcon onClick={()=>skipTrackHandeler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
                    <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon= {isPlaying ? faPause : faPlay } />    
                    <FontAwesomeIcon onClick={()=>skipTrackHandeler("skip-forward")}className="skip-forward" size="2x" icon={faAngleRight} />
                </div>
                        {/* HERE WE ARE ADDING MP3S */}
                        {/* TO GET THEM LIKE THIS WHOLE ELEMENT WE HAVE TO USE REFSTATE */}
        </div>
        )
}

export default Player