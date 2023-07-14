import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoMdImages } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";

export default function TrailPage() {
    const { id } = useParams();
    const [trail, setTrail] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/trails/${id}`).then((response) => {
            console.log(response.data);
            setTrail(response.data);
        });
    }, [id]);
    if (!trail) return "";

    if (showAllPhotos) {
        return (
            <div className="absolute inset-0 bg-slate-50  min-h-screen">
                <div className="p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl text-slate-700">
                            Photo from {trail.title}
                        </h2>
                        {/* className="fixed" makes the button stay in the same place while scrolling */}
                        <button
                            onClick={() => setShowAllPhotos(false)}
                            className="flex fixed gap-1 items-center py-2 px-4 rounded-2xl bg-slate-600 bg-opacity-30 text-slate-200 bottom-4 right-2 mx-8">
                            <CiSquareRemove /> Close
                        </button>
                    </div>
                    {trail?.photo?.length > 0 &&
                        trail.photo.map((eachPhoto, index) => (
                            <div key={index}>
                                <img
                                    className="min-w-full"
                                    src={`http://localhost:8000/uploads/${eachPhoto}`}
                                    alt=""
                                />
                            </div>
                        ))}
                </div>
            </div>
        );
    }
    return (
        <div className="mt-4 bg-slate-50 -mx-8 px-8 py-4">
            <h1 className="text-3xl text-slate-700">{trail.title}</h1>
            <a
                className="flex items-center gap-1 my-3 font-semibold underline text-slate-500"
                target="_blank"
                href={`https://maps.google.com/?q=${trail.location}`}>
                <MdLocationPin />
                {trail.location}
            </a>
            <div className="relative">
                <div className="gap-2 grid grid-cols-[2fr_1fr]">
                    {/* grid grid-cols-[2fr_1fr] --- custom grid with 2 : 1 ratio */}
                    <div>
                        {trail.photo.length > 0 && (
                            <div>
                                <img
                                    className="aspect-square object-cover rounded-l-2xl"
                                    src={`http://localhost:8000/uploads/${trail.photo[0]}`}
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid">
                        <div className="overflow-hidden rounded-tr-2xl">
                            {trail.photo?.[1] && (
                                <img
                                    className="aspect-square object-cover relative bottom-1"
                                    src={`http://localhost:8000/uploads/${trail.photo[1]}`}
                                />
                            )}
                        </div>
                        <div className="overflow-hidden rounded-br-2xl">
                            {trail.photo?.[2] && (
                                <img
                                    className="aspect-square object-cover relative top-1"
                                    src={`http://localhost:8000/uploads/${trail.photo[2]}`}
                                />
                            )}
                        </div>
                    </div>
                </div>
                {trail.photo.length >= 3 ? (
                    <button
                        onClick={() => setShowAllPhotos(true)}
                        className="flex gap-1 items-center absolute bottom-1 right-1 px-2 py-1 bg-slate-400 bg-opacity-30 rounded-2xl">
                        <IoMdImages /> More Photos
                    </button>
                ) : null}
            </div>
            <div className="mx-2 my-4">
                <h2 className="font-semibold text-2xl text-slate-700">
                    Descriptions
                </h2>
                <div className=" text-slate-500">{trail.descriptions}</div>
            </div>
            <div className="grid sm:grid-cols-3 mx-2 mt-4 gap-2">
                <div className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-500 text-sm font-bold">
                    Distance : {trail.distance} miles
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-500 text-sm font-bold">
                    Difficulty level : {trail.difficulty}/10
                </div>
                <div className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-500 text-sm font-bold">
                    Duration : {trail.duration} hour(s)
                </div>
            </div>
            {trail?.amenities?.length > 0 && (
                <div className="mx-2 my-4">
                    <h2 className="font-semibold text-2xl text-slate-700">
                        Amenities
                    </h2>
                    <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  mt-4 gap-2">
                        {trail.amenities.map((eaAmenity, index) => (
                            <div
                                key={index}
                                className="bg-slate-100 px-4 py-2 rounded-2xl text-slate-500 text-sm  text-center">
                                {eaAmenity}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <div className="bg-slate-100 -mx-8 my-4 px-8 py-4">
                <div className="mx-2">
                    <h3 className="font-semibold text-xl text-slate-500">
                        Extra Information
                    </h3>
                    <div className=" text-slate-400 text-sm">
                        {trail.extraInfo}
                    </div>
                </div>
            </div>
        </div>
    );
}
