import image from '../assets/spotify.png';
const Sidebar = ({ color }) => {
    return (
        <div style={{ backgroundColor: color }} className="hidden sm:flex flex-col relative p-4  text-white">

            <div className="flex items-center mb-6">
                <img className="h-10 w-10" src={image} alt="Logo" />
                <h1 className="text-white font-semibold pl-2 text-lg">Spotify.</h1>
            </div>

            <div className=" relative top-full">
                <img className="h-8 w-8" src={image} alt="Bottom Icon" />
            </div>
        </div>
    );
};

export default Sidebar;