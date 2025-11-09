import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function StakingPlans() {
    const [plans, setPlans] = useState([]);
    const [name, setName] = useState("");
    const [reward, setReward] = useState("");

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "stakingPlans"), (snapshot) => {
            setPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsubscribe();
    }, []);

    const addPlan = async() => {
        await addDoc(collection(db, "stakingPlans"), { name, reward });
        setName("");
        setReward("");
    };

    const deletePlan = async(id) => {
        await deleteDoc(doc(db, "stakingPlans", id));
    };

    return ( <
        div style = {
            { padding: "2rem" } } >
        <
        h2 > Staking Plans < /h2> <
        input placeholder = "Plan Name"
        value = { name }
        onChange = { e => setName(e.target.value) }
        /> <
        input placeholder = "Reward %"
        value = { reward }
        onChange = { e => setReward(e.target.value) }
        /> <
        button onClick = { addPlan } > Add Plan < /button>

        <
        ul > {
            plans.map(plan => ( <
                li key = { plan.id } > { plan.name } - { plan.reward } %
                <
                button onClick = {
                    () => deletePlan(plan.id) } > Delete < /button> <
                /li>
            ))
        } <
        /ul> <
        /div>
    );
}