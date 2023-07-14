import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";

function AllTrails() {
    const [trails, setTrails] = useState([]);
    useEffect(() => {
        axios.get("/allTrails").then((response) => {
            setTrails(response.data);
        });
    }, []);
    return (
        <div>
            <AccountNavigation />
            <div className="mt-8 gap-x-6 gap-y-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {trails.length > 0 &&
                    trails.map((eachTrail, id) => (
                        <Link to={`/trail/${eachTrail._id}`} key={id}>
                            <div className="bg-slate-200 rounded-2xl flex mb-2">
                                {eachTrail.photo?.[0] && (
                                    <img
                                        className="rounded-2xl object-cover aspect-square"
                                        src={`http://localhost:8000/uploads/${eachTrail.photo[0]}`}
                                        alt={eachTrail.title}
                                    />
                                )}
                            </div>
                            <h2 className="text-sm text-slate-600 font-bold">
                                {eachTrail.location}
                            </h2>
                            <h2 className="text-lg text-slate-500 font-bold truncate leading-6">
                                {/* truncate <-- makes text stay in one line */}
                                {/* leading-4 <-- line hight 4 === 1rem 3 === 0.75rem */}
                                {eachTrail.title}
                            </h2>
                            <div>
                                <span className="text-xs text-slate-500">
                                    Approximate Distance :{" "}
                                </span>
                                <span className="text-xs text-slate-500 font-bold">
                                    {`${eachTrail.distance}`}
                                </span>
                                <span className="text-xs text-slate-500">
                                    {" "}
                                    Miles
                                </span>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
}

export default AllTrails;
