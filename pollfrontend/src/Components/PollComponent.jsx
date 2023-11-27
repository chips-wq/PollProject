import { useContext, useState } from "react";
import UserContext from "../context/context";

const PollComponent = ({ question, answers }) => {

    const [selectedVote, setSelectedVote] = useState(null);
    const [user, setUser] = useContext(UserContext);

    const handleSubmit = e => {
        e.preventDefault();
        console.log("submitted");
    }

    const handleCheck = e => {
        setSelectedVote(e.target.value);
        console.log(user);
    }
    //TODO: add functionality to this poll component and voting capacity
    return <form className="poll-container" onSubmit={handleSubmit}>
        <h4>{question}</h4>
        <p>Make a choice:</p>
        {answers.map((answer, id) =>
            <div key={id}>
                <input type="radio" value={id} checked={selectedVote == id} onChange={handleCheck} />
                <label>{answer}</label>
            </div>)}
        <div className="button-container">
            <button type="submit">Vote</button>
            <button>Delete</button>
        </div>
    </form>
}

export default PollComponent;