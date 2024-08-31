import { createContext, useEffect, useRef, useState } from "react";

export const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
    const [songInfo, setSongInfo] = useState([]);
    const [albumData, setAlbumData] = useState(null);
    const [track, setTrack] = useState(null); // Initialize as null
    const [PlayStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: { sec: 0, min: 0 },
        totalTime: { sec: 0, min: 0 }
    });

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef();

    const baseCoverURL = "https://cms.samespace.com/assets/";

    const fetchSongs = async () => {
        try {
            const url = "https://cms.samespace.com/items/songs";
            const data = await fetch(url);
            const res = await data.json();
            setAlbumData(res);

            if (res && res.data && res.data.length > 0) {
                const songDetails = res.data.map(item => ({
                    id: item.id,
                    name: item.name,
                    artist: item.artist,
                    cover: `${baseCoverURL}${item.cover}`,
                    bgColor: item.accent,
                    songUrl: item.url
                }));
                setSongInfo(songDetails);

                // Set the first song as the default track
                setTrack(songDetails[0]); // Default to the first song in the list
                if (audioRef.current) {
                    audioRef.current.src = songDetails[0].songUrl; // Set the audio source to the first song's URL
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const play = () => {
        if (audioRef.current && track) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    };

    const contextValue = {
        audioRef,
        seekBar,
        seekBg,
        track,
        setTrack,
        PlayStatus,
        setPlayStatus,
        time,
        setTime,
        play,
        pause
    };

    console.log("Current Track:", track);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export default PlayerContextProvider;
