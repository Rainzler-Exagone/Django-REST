import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from "react";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";


interface FormProps {
    route: string;
    methode: "login" | "register";
}

function Form({ route, methode }: FormProps) {
    const [userName, setUserName] = useState<string | undefined>("");
    const [password, setPassword] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const name = methode === "login" ? "Login" : "Register";
    const link = methode === "login" ? "Register" : "Login";
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post(route, { username: userName, password: password });
            if (methode === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally { setLoading(false) }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="username" />
        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
        {loading && <LoadingIndicator/>}
        <button className="form-button" type="submit" >{ name}</button>
        <Link to={`/${link}`}>{link}</Link>
    </form>
    
}


export default Form;