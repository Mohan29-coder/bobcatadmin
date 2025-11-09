import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    return ( <
        div style = {
            { padding: "2rem" } } >
        <
        h2 > Users List < /h2> <
        table border = "1" >
        <
        thead >
        <
        tr >
        <
        th > Email < /th> <
        th > Joined < /th> <
        th > Total Deposits < /th> <
        /tr> <
        /thead> <
        tbody > {
            users.map(user => ( <
                tr key = { user.id } >
                <
                td > { user.email } < /td> <
                td > { user.joined } < /td> <
                td > { user.totalDeposits } < /td> <
                /tr>
            ))
        } <
        /tbody> <
        /table> <
        /div>
    );
}