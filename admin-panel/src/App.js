import { useState, useEffect } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import StakingPlans from "./components/StakingPlans";

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedIn = localStorage.getItem("adminLoggedIn");
        if (loggedIn === "true") {
            setUser({ email: "admin@yourdomain.com" });
        }
    }, []);

    if (!user) return <Login onLogin = { setUser }
    />;

    return ( <
        div >
        <
        h1 > Admin Panel < /h1> <
        Dashboard / >
        <
        Users / >
        <
        StakingPlans / >
        <
        /div>
    );
}

export default App;