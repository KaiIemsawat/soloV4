import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Amenities from "../Amenities";
import axios from "axios";
import PhotoUploader from "../PhotoUploader";
import AccountNavigation from "../AccountNavigation";

export default function TrailFormPage() {
    const { id } = useParams();

    const nav = useNavigate();

    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [addedPhoto, setAddedPhoto] = useState([]);
    const [photoLink, setPhotoLink] = useState("");
    const [descriptions, setDescriptions] = useState("");
    const [amenities, setAmenities] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [distance, setDistance] = useState(1);
    const [difficulty, setDifficulty] = useState(1);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/trails/${id}`).then((response) => {
            const { data } = response;
            setTitle(data.title);
            setLocation(data.location);
            setAddedPhoto(data.photo);
            setDescriptions(data.descriptions);
            setAmenities(data.amenities);
            setExtraInfo(data.extraInfo);
            setDistance(data.distance);
            setDifficulty(data.difficulty);
            setDuration(data.duration);
        });
    }, [id]);

    function inputHeader(text) {
        return <h2 className="text-xl  mt-4">{text}</h2>;
    }

    function inputDescription(text) {
        return <p className="text-xs text-slate-400">{text}</p>;
    }

    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        );
    }

    async function submitHandler(e) {
        e.preventDefault();
        const trailsData = {
            title,
            location,
            addedPhoto,
            descriptions,
            amenities,
            extraInfo,
            distance,
            difficulty,
            duration,
        };

        if (id) {
            // if there is id as params
            // edit current trail
            await axios.put("/trails", {
                id,
                ...trailsData,
            });
            nav("/account/myTrails");
        } else {
            // if there is no id in params
            // add new trail
            await axios.post("/trails", {
                ...trailsData,
            });
            nav("/account/myTrails");
        }
    }

    return (
        <div>
            <AccountNavigation />
            <form className="mx-2" onSubmit={submitHandler}>
                {preInput("Title", "A name that is known by public, please")}
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="title : please input the trail's name"
                />
                {preInput(
                    "Location",
                    "The proper location is necessary, Other user may do some research for more information"
                )}
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="location : please input the trail's location"
                />
                {preInput(
                    "Images",
                    "You love beatiful scenarios, so does everyone else"
                )}
                <PhotoUploader
                    addedPhoto={addedPhoto}
                    onChange={setAddedPhoto}
                />
                {preInput(
                    "Descriptions",
                    "Please descript the trail. Would also be great if you can include the location you took the photographs"
                )}
                <textarea
                    value={descriptions}
                    onChange={(e) => setDescriptions(e.target.value)}
                />
                {preInput("Amenities", "Select all available amenities")}
                <div className="mt-2 gap-2 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6">
                    <Amenities selected={amenities} onChange={setAmenities} />
                </div>
                {preInput(
                    "Extra Info",
                    "If there is any useful tip or things to aware"
                )}
                <textarea
                    value={extraInfo}
                    onChange={(e) => setExtraInfo(e.target.value)}
                />
                {preInput(
                    "Distance, Difficulty, and Hike Duration",
                    "might need to remove later"
                )}
                <div className="grid gap-2 sm:grid-cols-3">
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Distance{" "}
                            <span className="text-slate-500">(miles)</span>
                        </h3>
                        <input
                            type="number"
                            value={distance}
                            onChange={(e) => setDistance(e.target.value)}
                            placeholder="5.6"
                            min="1"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Difficulty Level{" "}
                            <span className="text-slate-500">(1-10)</span>
                        </h3>
                        <input
                            type="number"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}
                            placeholder="3"
                            min="1"
                            max="10"
                        />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 text-slate-500">
                            Duration{" "}
                            <span className="text-slate-500">(hours)</span>
                        </h3>
                        <input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="6"
                            min="1"
                        />
                    </div>
                </div>
                <button className="primary mt-4">save my trail</button>
            </form>
            {/* <div className="flex flex-col items-center">
                <button className=" bg-slate-300 w-1/4 my-4 py-2 px-4 rounded-2xl" onClick={() => deleteHandler()}>
                    remove
                </button>
            </div> */}
        </div>
    );
}
