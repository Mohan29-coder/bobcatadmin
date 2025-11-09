import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login({ onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async() => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (email === "admin@yourdomain.com") { // only admin
                localStorage.setItem("adminLoggedIn", "true");
                onLogin(userCredential.user);
            } else {
                setError("Not authorized");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return ( <
        div style = {
            { padding: "2rem" } } >
        <
        h2 > Admin Login < /h2> <
        input type = "email"
        placeholder = "Email"
        onChange = { e => setEmail(e.target.value) }
        /> <
        input type = "password"
        placeholder = "Password"
        onChange = { e => setPassword(e.target.value) }
        /> <
        button onClick = { handleLogin } > Login < /button> {
            error && < p style = {
                    { color: "red" } } > { error } < /p>} <
                /div>
        );
    }