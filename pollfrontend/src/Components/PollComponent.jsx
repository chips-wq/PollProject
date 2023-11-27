import { useContext, useEffect, useState } from "react";
import UserContext from "../context/context";
import apiBase from "../utils/constants";
import "./poll.css"

const PollComponent = ({ pollId, question, answers, ownerId, votes, setPolls }) => {
    const [user, setUser] = useContext(UserContext);
    const [selectedVote, setSelectedVote] = useState(null);

    useEffect(() => {
        if (user === null)
            return
        const votedArr = votes.filter(vote => vote.voterId === user._id);
        if (votedArr.length > 0) {
            setSelectedVote(votedArr[0].voteIndex);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("into submit");
        console.log(selectedVote);
        try {
            const rawResponse = await fetch(`${apiBase}/polls/vote`, {
                method: 'POST',
                credentials: "include",
                headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
                body: JSON.stringify(
                    { pollId: pollId, voteIndex: selectedVote }
                )
            });
            const updatedPollJson = await rawResponse.json()
            console.log(updatedPollJson)
            if (rawResponse.status == 200) {
                setPolls(prevPolls => {
                    const index = prevPolls.findIndex(poll => poll._id === pollId);
                    const newPolls = [...prevPolls];
                    newPolls[index] = updatedPollJson;
                    console.log(newPolls);
                    return newPolls;
                })
            }
            console.log("submitted");
        } catch (e) {
            console.error(e)
        }
    }

    const handleCheck = e => {
        setSelectedVote(e.target.value);
        console.log(user);
    }

    const handleDelete = async (e) => {
        try {
            const rawResponse = await fetch(`${apiBase}/polls`, {
                method: 'DELETE',
                credentials: "include",
                headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
                body: JSON.stringify(
                    { pollId: pollId }
                )
            });
            if (rawResponse.status == 200) {
                setPolls(prevPolls => {
                    return prevPolls.filter(poll => poll._id !== pollId);
                })
            }
            console.log("deleted");
        } catch (e) {
            console.error(e)
        }

    }

    const isDisabled = () => {
        if (user === null) {
            return true;
        }
        const votedArr = votes.filter(vote => vote.voterId === user._id);
        return votedArr.length > 0;
    }

    return <form className="poll-container" onSubmit={handleSubmit}>
        <h4>{question}</h4>
        <p>Make a choice:</p>
        {answers.map((answer, id) =>
            <div key={id}>
                <input type="radio" value={id} checked={selectedVote == id} onChange={handleCheck} disabled={isDisabled()} />
                <label>{answer}</label>
            </div>)}
        {user !== null ?
            <div className="button-container">
                <button type="submit" className="poll-button" disabled={isDisabled() || selectedVote === null}>Vote</button>
                {ownerId === user._id &&
                    <button type="button" className="poll-button" onClick={handleDelete}>Delete</button>}
            </div>
            : null}
    </form >
}

export default PollComponent;