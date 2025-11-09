import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
            setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        const unsubscribeTx = onSnapshot(collection(db, "transactions"), (snapshot) => {
            setTransactions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });

        return () => {
            unsubscribeUsers();
            unsubscribeTx();
        };
    }, []);

    const approveTx = async(id) => {
        await updateDoc(doc(db, "transactions", id), { status: "approved" });
    };

    const rejectTx = async(id) => {
        await updateDoc(doc(db, "transactions", id), { status: "rejected" });
    };

    return ( <
        div style = {
            { padding: "2rem" }
        } >
        <
        h2 > Admin Dashboard < /h2> <
        p > Total Users: { users.length } < /p> <
        p > Total Transactions: { transactions.length } < /p>

        <
        h3 > Transactions < /h3> <
        table border = "1" >
        <
        thead >
        <
        tr >
        <
        th > User < /th> <
        th > Amount < /th> <
        th > Type < /th> <
        th > Status < /th> <
        th > Action < /th>  </tr > <
        /thead> <
        tbody > {
            transactions.map(tx => ( <
                tr key = { tx.id } >
                <
                td > { tx.userEmail } < /td> <
                td > { tx.amount } < /td> <
                td > { tx.type } < /td> <
                td > { tx.status } < /td> <
                td >
                <
                button onClick = {
                    () => approveTx(tx.id)
                } > Approve < /button> <
                button onClick = {
                    () => rejectTx(tx.id)
                } > Reject < /button> < /
                td > <
                /tr>
            ))
        } <
        /tbody> < /
        table > <
        /div>
    );
}