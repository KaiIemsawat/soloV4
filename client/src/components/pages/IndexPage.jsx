import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {
    const { user } = useContext(UserContext);
    const [trails, setTrails] = useState([]);
    useEffect(() => {
        axios.get("/allTrails").then((response) => {
            setTrails(response.data);
        });
    }, []);
    return (
        <div className="mt-4 grow flex items-center justify-around">
            {user ? (
                <div>
                    {" "}
                    <div className="mb-64">
                        <h1 className="font-thin text-2xl text-center text-slate-500 mb-4">
                            Welcome back to Tra!ls,{" "}
                            <span className="font-bold text-primary">
                                {user.username}
                            </span>
                        </h1>
                    </div>
                </div>
            ) : (
                <div>
                    {" "}
                    <div className="mb-64">
                        <h1 className="font-thin text-2xl text-center text-slate-500 mb-4">
                            You are just steps away to...{" "}
                            <span className="font-bold text-primary">
                                Tra!ls
                            </span>
                        </h1>
                    </div>
                </div>
            )}
        </div>
    );
}
