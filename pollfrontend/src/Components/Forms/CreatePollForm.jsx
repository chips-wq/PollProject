
import { useState } from "react";
import apiBase from "../../utils/constants";
const CreatePollForm = () => {
    const [numOptions, setNumOptions] = useState(3);

    const handleSubmit = async (e) => {
        const formData = new FormData(e.target);
        e.preventDefault();

        const formDataIterator = formData.entries();
        const question = formDataIterator.next().value[1]
        const answers = []
        for (let pair of formDataIterator) {
            answers.push(pair[1]);
        }
        console.log(question, answers);

        //http://localhost:8080/polls
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
            }
        } catch (e) {
            console.error(e);
            console.error("Error sending create poll request");
        }
    }
    const inputs = []
    for (let i = 0; i < numOptions; i++) {
        inputs.push(<>
            <input
                key={i}
                required={true}
                style={{ marginBottom: "1em" }}
                type="text"
                id={`answer${i}`}
                name={`answer${i}`}
                placeholder={`Option ${i}`}
            />
            <br />
        </>)
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
                // value={formData.question}
                // onChange={handleQuestionChange}
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