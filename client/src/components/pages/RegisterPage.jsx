import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const nav = useNavigate();

    async function registerHandler(e) {
        e.preventDefault();
        try {
            await axios.post("/register", {
                username,
                email,
                password,
            });
            alert("Registered");
            nav("/login");
        } catch (error) {
            alert("Invalid credentials or used account");
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-2xl text-center text-slate-500 mb-4">
                    REGISTER
                </h1>
                <form className="max-w-md mx-auto" onSubmit={registerHandler}>
                    <input
                        type="text"
                        placeholder="your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
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
                    <button className="primary">register</button>
                </form>
                <div className="text-center py-2 text-slate-500">
                    Already have an account?{" "}
                    <Link to={"/login"} className="text-slate-900 underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
