// import search from '../assets/images.png';
// import plays from '../assets/play.png';
// import pauses from '../assets/pause.png';
// import next from '../assets/next.png';
// import prev from '../assets/prev.png';
// import volume from '../assets/volume.png';
// import { useContext, useEffect, useState, useRef } from "react";
// import { PlayerContext } from './PlayerContext';

// const DisplaySongs = ({ onColorChange }) => {
//     const [songInfo, setSongInfo] = useState([]);
//     const [filteredSongs, setFilteredSongs] = useState([]);
//     const [selectedCover, setSelectedCover] = useState();
//     const [songName, setSongName] = useState();
//     const [artistName, setArtistName] = useState();
//     const [selectedSongId, setSelectedSongId] = useState(null);
//     const [currentSongIndex, setCurrentSongIndex] = useState(0);
//     const [showSongList, setShowSongList] = useState(false);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [duration, setDuration] = useState(0);
//     const [currentTime, setCurrentTime] = useState(0);

//     const baseCoverURL = "https://cms.samespace.com/assets/";
//     const {
//         audioRef,
//         seekBar,
//         seekBg,
//         track,
//         setTrack,
//         PlayStatus,
//         setPlayStatus,
//         time,
//         setTime,
//         play,
//         pause
//     } = useContext(PlayerContext);

//     const fetchSongs = async () => {
//         try {
//             const url = "https://cms.samespace.com/items/songs";
//             const data = await fetch(url);
//             const res = await data.json();
//             const songs = res.data.map(item => ({
//                 id: item.id,
//                 name: item.name,
//                 artist: item.artist,
//                 cover: `${baseCoverURL}${item.cover}`,
//                 bgColor: item.accent,
//                 songUrl: item.url
//             }));
//             setSongInfo(songs);
//             setFilteredSongs(songs);

//             // Set the first song as the default track
//             if (songs[0]) {
//                 handleColorClick(songs[0], 0);
//             }
//         } catch (err) {
//             console.log(err.message);
//         }
//     };

//     useEffect(() => {
//         fetchSongs();
//     }, []);

//     useEffect(() => {
//         if (audioRef.current) {
//             audioRef.current.onloadedmetadata = () => {
//                 setDuration(audioRef.current.duration);
//             };
//             audioRef.current.ontimeupdate = () => {
//                 setCurrentTime(audioRef.current.currentTime);
//                 const progress = (audioRef.current.currentTime / duration) * 100;
//                 seekBar.current.style.width = `${progress}%`;
//             };
//         }
//     }, [duration]);

//     const handleColorClick = (song, index) => {
//         onColorChange(song.bgColor);
//         setSelectedCover(song.cover);
//         setSongName(song.name);
//         setArtistName(song.artist);
//         setSelectedSongId(song.id);
//         setCurrentSongIndex(index);
//         setTrack(song);

//         if (audioRef.current) {
//             audioRef.current.src = song.songUrl;
//             audioRef.current.play();
//             setPlayStatus(true);
//         }
//         setShowSongList(false);
//     };

//     const playNextSong = () => {
//         if (currentSongIndex < filteredSongs.length - 1) {
//             handleColorClick(filteredSongs[currentSongIndex + 1], currentSongIndex + 1);
//         }
//     };

//     const playPrevSong = () => {
//         if (currentSongIndex > 0) {
//             handleColorClick(filteredSongs[currentSongIndex - 1], currentSongIndex - 1);
//         }
//     };

//     const handleSearch = (e) => {
//         const query = e.target.value.toLowerCase();
//         setSearchQuery(query);
//         setFilteredSongs(songInfo.filter(song =>
//             song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
//         ));
//     };

//     const handleSeek = (e) => {
//         const seekTime = (e.nativeEvent.offsetX / seekBg.current.clientWidth) * duration;
//         audioRef.current.currentTime = seekTime;
//         setCurrentTime(seekTime);
//     };

//     return (
//         <div className="flex flex-col lg:flex-row lg:p-8 p-4 sm:p-6 text-white">
//             {/* Menu Button for Small Screens */}
//             <div className="lg:hidden mb-4">
//                 <button
//                     className="bg-green-600 text-white py-2 px-4 rounded"
//                     onClick={() => setShowSongList(!showSongList)}
//                 >
//                     {showSongList ? "Hide Songs" : "Show Songs"}
//                 </button>
//             </div>

//             {/* Left Section: Song List */}
//             <div className={`lg:w-2/3 ${showSongList ? 'block' : 'hidden'} lg:block`}>
//                 {/* Title Section */}
//                 <div className="text-white flex flex-col sm:flex-row sm:gap-4 mb-4">
//                     <h1 className="text-lg sm:text-sm font-medium">For You</h1>
//                     <h1 className="text-lg sm:text-sm ml-5 font-medium">Top Tracks</h1>
//                 </div>

//                 {/* Search Box Section */}
//                 <div className="relative mb-4">
//                     <input
//                         type="text"
//                         className="rounded h-8 w-full sm:w-60 pl-2 pr-10"
//                         placeholder="Search Song, Artist"
//                         value={searchQuery}
//                         onChange={handleSearch}
//                     />
//                     <img
//                         src={search}
//                         alt="Search Icon"
//                         className="h-5 w-5 text-gray-500 relative sm:bottom-6 sm:left-52"
//                     />
//                 </div>

//                 {/* Song List Section */}
//                 <div className="flex flex-col gap-4">
//                     {filteredSongs && filteredSongs.map((song, index) => (
//                         <div
//                             key={song.id}
//                             className={`flex items-center gap-4 cursor-pointer p-2 rounded ${selectedSongId === song.id ? 'sm:w-[350px] bg-gray-700 opacity-40' : ''}`}
//                             onClick={() => handleColorClick(song, index)}
//                         >
//                             <img src={song.cover} alt="Cover" className="h-20 w-20 sm:h-10 sm:w-10 rounded-full" />
//                             <div className="flex flex-col justify-center">
//                                 <div className="font-medium text-base sm:text-sm truncate">{song.name}</div>
//                                 <div className="font-light text-sm truncate">{song.artist}</div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>

//             {/* Right Section: Selected Song Info */}
//             <div className="flex flex-col items-center sm:pl-80">
//                 {selectedCover && (
//                     <>
//                         <h1 className="relative sm:right-60 text-nowrap font-semibold">{songName}</h1>
//                         <h1 className="relative sm:right-60 text-nowrap font-light">{artistName}</h1>
//                         <img className="h-48 w-72 sm:h-96 sm:w-96 sm:mr-52 rounded-lg mb-4" src={selectedCover} alt="Selected Cover" />
//                     </>
//                 )}
//                 <div>
//                     {/* Music Player */}
//                     <div>
//                         <div className="flex flex-col items-center gap-1 m-auto">
//                             <div className="flex flex-col gap-4">
//                                 <div
//                                     ref={seekBg}
//                                     className="w-64 sm:mr-48 sm:w-[45vh] bg-gray-300 rounded-md cursor-pointer"
//                                     onClick={handleSeek}
//                                 >
//                                     <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
//                                 </div>
//                                 <div className="flex justify-center sm:mr-40 gap-4">
//                                     <img className="w-4 cursor-pointer" onClick={playPrevSong} src={prev} alt="Previous" />
//                                     {PlayStatus ? (
//                                         <img className="w-4 cursor-pointer" onClick={pause} src={pauses} alt="Pause" />
//                                     ) : (
//                                         <img className="w-4 cursor-pointer" onClick={play} src={plays} alt="Play" />
//                                     )}
//                                     <img className="w-4 cursor-pointer" onClick={playNextSong} src={next} alt="Next" />
//                                     <img className="w-4 cursor-pointer" src={volume} alt="Volume" />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <audio ref={audioRef} preload="auto"></audio>
//         </div>
//     );
// };

// export default DisplaySongs;
import search from '../assets/images.png';
import plays from '../assets/play.png';
import pauses from '../assets/pause.png';
import next from '../assets/next.png';
import prev from '../assets/prev.png';
import volume from '../assets/volume.png';
import { useContext, useEffect, useState, useRef } from "react";
import { PlayerContext } from './PlayerContext';

const DisplaySongs = ({ onColorChange }) => {
    const [songInfo, setSongInfo] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [selectedCover, setSelectedCover] = useState();
    const [songName, setSongName] = useState();
    const [artistName, setArtistName] = useState();
    const [selectedSongId, setSelectedSongId] = useState(null);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [showSongList, setShowSongList] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [isUserInteracted, setIsUserInteracted] = useState(false);

    const baseCoverURL = "https://cms.samespace.com/assets/";
    const {
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
    } = useContext(PlayerContext);

    const fetchSongs = async () => {
        try {
            const url = "https://cms.samespace.com/items/songs";
            const data = await fetch(url);
            const res = await data.json();
            const songs = res.data.map(item => ({
                id: item.id,
                name: item.name,
                artist: item.artist,
                cover: `${baseCoverURL}${item.cover}`,
                bgColor: item.accent,
                songUrl: item.url
            }));
            setSongInfo(songs);
            setFilteredSongs(songs);

            // Set the first song as the default track
            if (songs[0]) {
                handleColorClick(songs[0], 0);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.onloadedmetadata = () => {
                setDuration(audioRef.current.duration);
            };
            audioRef.current.ontimeupdate = () => {
                setCurrentTime(audioRef.current.currentTime);
                const progress = (audioRef.current.currentTime / duration) * 100;
                seekBar.current.style.width = `${progress}%`;
            };
        }
    }, [duration]);

    const handleColorClick = (song, index) => {
        onColorChange(song.bgColor);
        setSelectedCover(song.cover);
        setSongName(song.name);
        setArtistName(song.artist);
        setSelectedSongId(song.id);
        setCurrentSongIndex(index);
        setTrack(song);

        if (audioRef.current) {
            audioRef.current.src = song.songUrl;
            if (isUserInteracted) {
                audioRef.current.play();
                setPlayStatus(true);
            }
        }
        setShowSongList(false);
    };

    const playNextSong = () => {
        if (currentSongIndex < filteredSongs.length - 1) {
            handleColorClick(filteredSongs[currentSongIndex + 1], currentSongIndex + 1);
        }
    };

    const playPrevSong = () => {
        if (currentSongIndex > 0) {
            handleColorClick(filteredSongs[currentSongIndex - 1], currentSongIndex - 1);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        setFilteredSongs(songInfo.filter(song =>
            song.name.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
        ));
    };

    const handleSeek = (e) => {
        const seekTime = (e.nativeEvent.offsetX / seekBg.current.clientWidth) * duration;
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    };

    const handlePlayButtonClick = () => {
        setIsUserInteracted(true);
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row lg:p-8 p-4 sm:p-6 text-white">
            {/* Menu Button for Small Screens */}
            <div className="lg:hidden mb-4">
                <button
                    className="bg-green-600 text-white py-2 px-4 rounded"
                    onClick={() => setShowSongList(!showSongList)}
                >
                    {showSongList ? "Hide Songs" : "Show Songs"}
                </button>
            </div>

            {/* Left Section: Song List */}
            <div className={`lg:w-2/3 ${showSongList ? 'block' : 'hidden'} lg:block`}>
                {/* Title Section */}
                <div className="text-white flex flex-col sm:flex-row sm:gap-4 mb-4">
                    <h1 className="text-lg sm:text-sm font-medium">For You</h1>
                    <h1 className="text-lg sm:text-sm ml-5 font-medium">Top Tracks</h1>
                </div>

                {/* Search Box Section */}
                <div className="relative mb-4">
                    <input
                        type="text"
                        className="rounded h-8 w-full sm:w-60 text-black pl-2 pr-10"
                        placeholder="Search Song, Artist"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <img
                        src={search}
                        alt="Search Icon"
                        className="h-5 w-5 left-64 bottom-7 text-gray-800 relative sm:bottom-6 sm:left-52"
                    />
                </div>

                {/* Song List Section */}
                <div className="flex flex-col gap-4">
                    {filteredSongs && filteredSongs.map((song, index) => (
                        <div
                            key={song.id}
                            className={`flex items-center gap-4 cursor-pointer p-2 rounded ${selectedSongId === song.id ? 'sm:w-[350px] bg-gray-700 opacity-40' : ''}`}
                            onClick={() => handleColorClick(song, index)}
                        >
                            <img src={song.cover} alt="Cover" className="h-20 w-20 sm:h-10 sm:w-10 rounded-full" />
                            <div className="flex flex-col justify-center">
                                <div className="font-medium text-base sm:text-sm truncate">{song.name}</div>
                                <div className="font-light text-sm truncate">{song.artist}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Section: Selected Song Info */}
            <div className="flex flex-col items-center sm:pl-80">
                {selectedCover && (
                    <>
                        <h1 className="relative sm:right-60 text-nowrap font-semibold">{songName}</h1>
                        <h1 className="relative sm:right-60 text-nowrap font-light">{artistName}</h1>
                        <img className="h-48 w-72 sm:h-96 sm:w-96 sm:mr-52 rounded-lg mb-4" src={selectedCover} alt="Selected Cover" />
                    </>
                )}
                <div>
                    {/* Music Player */}
                    <div>
                        <div className="flex flex-col items-center gap-1 m-auto">
                            <div className="flex flex-col gap-4">
                                <div
                                    ref={seekBg}
                                    className="w-64 sm:mr-48 sm:w-[45vh] bg-gray-300 rounded-md cursor-pointer"
                                    onClick={handleSeek}
                                >
                                    <hr ref={seekBar} className="h-1 border-none w-0 bg-green-800 rounded-full" />
                                </div>
                                <div className="flex justify-center sm:mr-40 gap-4">
                                    <img className="w-4 cursor-pointer" onClick={playPrevSong} src={prev} alt="Previous" />
                                    {PlayStatus ? (
                                        <img className="w-4 cursor-pointer" onClick={pause} src={pauses} alt="Pause" />
                                    ) : (
                                        <img className="w-4 cursor-pointer" onClick={handlePlayButtonClick} src={plays} alt="Play" />
                                    )}
                                    <img className="w-4 cursor-pointer" onClick={playNextSong} src={next} alt="Next" />
                                    <img className="w-4 cursor-pointer" src={volume} alt="Volume" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <audio ref={audioRef} preload="auto"></audio>
        </div>
    );
};

export default DisplaySongs;

