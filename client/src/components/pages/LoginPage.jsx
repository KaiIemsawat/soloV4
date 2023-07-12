import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

function LoginPage() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const { setUser } = useContext(UserContext);

    const nav = useNavigate();

    async function loginSubmit(e) {
        e.preventDefault();
        try {
            const data = await axios.post("/login", { email, password });
            setUser(data);
            alert("LOGGED IN");
            nav("/");
            window.location.reload(); // ! tempory fix issue that the name only appear once refresh page
        } catch (error) {
            alert("FAILED TO LOG IN");
            console.error(error);
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-2xl text-center text-slate-500 mb-4">
                    LOGIN
                </h1>
                <form className="max-w-md mx-auto" onSubmit={loginSubmit}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="primary">login</button>
                </form>
                <div className="text-center py-2 text-slate-500">
                    Need an account?{" "}
                    <Link to={"/register"} className="text-slate-900 underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
