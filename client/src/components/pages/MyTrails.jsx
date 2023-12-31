import { Link, useNavigate, useParams } from "react-router-dom";
import { MdAddLocationAlt } from "react-icons/md";
import { CiSquareRemove } from "react-icons/ci";
import { useEffect, useState } from "react";

import axios from "axios";

import AccountNavigation from "../AccountNavigation";

export default function MyTrails() {
    const [trails, setTrails] = useState([]);
    useEffect(() => {
        axios.get("/userTrails").then(({ data }) => {
            setTrails(data);
        });
    }, [trails]);

    const nav = useNavigate();

    function deleteHandler(id) {
        axios.delete(`/deleteTrail/${id}`).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div>
            <AccountNavigation />
            <div className="text-center">
                <br />
                <Link
                    className="items-center inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                    to={"/account/myTrails/new"}>
                    <MdAddLocationAlt className="text-lg" />
                    add new trail
                </Link>
                <div className="mt-4">
                    {trails.length > 0 &&
                        trails.map((eachTrail) => (
                            <div className="relative" key={eachTrail._id}>
                                <Link
                                    to={`/account/myTrails/${eachTrail._id}`}
                                    className="flex cursor-pointer gap-4 bg-slate-100 px-4 py-8 rounded-2xl my-4">
                                    <div className="flex w-32 h-32 bg-slate-50 grow-0 shrink-0">
                                        {eachTrail.photo.length > 0 && (
                                            <img
                                                className="object-cover" // to avoid image to stress
                                                src={`http://localhost:8000/uploads/${eachTrail.photo[0]}`}
                                                alt={`${eachTrail.title} image`}
                                            />
                                        )}
                                    </div>
                                    <div className="grow-0 shrink">
                                        <h2 className="text-xl text-start text-slate-700">
                                            {eachTrail.title}
                                        </h2>
                                        <p className="text-sm text-start mt-2 text-slate-500">
                                            {eachTrail.descriptions}
                                        </p>
                                    </div>
                                </Link>

                                <button
                                    onClick={(e) =>
                                        deleteHandler(eachTrail._id)
                                    }
                                    className="cursor-pointer px-1 flex items-center absolute bottom-2 right-2 text-slate-300 text-sm bg-slate-300 bg-opacity-20 rounded">
                                    <CiSquareRemove /> remove trail
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
