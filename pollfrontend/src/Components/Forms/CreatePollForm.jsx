
import { useState, useContext } from "react";
import apiBase from "../../utils/constants";
import PollContext from "../../context/PollContext";

const CreatePollForm = ({ closeModal }) => {
    const [numOptions, setNumOptions] = useState(3);
    const [polls, setPolls] = useContext(PollContext);

    const handleSubmit = async (e) => {
        const formData = new FormData(e.target);
        e.preventDefault();

        const formDataIterator = formData.entries();
        const question = formDataIterator.next().value[1]
        const answers = []
        for (let pair of formDataIterator) {
            answers.push(pair[1]);
        }
        try {
            const rawResponse = await fetch(`${apiBase}/polls`, {
                method: 'POST',
                credentials: "include",
                headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
                body: JSON.stringify(
                    { question: question, answers: answers }
                )
            });
            const jsonResponse = await rawResponse.json();
            if (rawResponse.status === 200) {
                //add the poll to the current list of polls
                setPolls(oldPolls => {
                    return [...oldPolls, jsonResponse]
                });
                closeModal();
            }
        } catch (e) {
            console.error(e);
        }
    }
    const inputs = []
    for (let i = 0; i < numOptions; i++) {
        inputs.push(<div key={i}>
            <input
                required={true}
                style={{ marginBottom: "1em" }}
                type="text"
                id={`answer${i}`}
                name={`answer${i}`}
                placeholder={`Option ${i}`}
            />
            <br />
        </div>)
    }

    return <div className='form-container'>
        <h1>Create a poll</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="question">Title</label> <br />
                <input
                    type="text"
                    required={true}
                    id="question"
                    name="question"
                    placeholder="Type your question here"
                />
            </div>
            <div >
                <label>Answer options</label>
                <br />
                {inputs}
                <button type="button" style={{ fontSize: '0.8em', fontWeight: 'normal' }} onClick={() => setNumOptions(numOptions => numOptions + 1)} className="form-button">Add Option</button>
            </div>
            <button type="submit" className='form-button'>Create Poll</button>
        </form>
    </div>
}

export default CreatePollForm;