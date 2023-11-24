
const PollComponent = ({ question, answers }) => {

    const handleSubmit = e => {
        e.preventDefault();
        console.log("submitted");
    }
    console.log(question, answers);

    //TODO: add functionality to this poll component and voting capacity
    return <form className="poll-container" onSubmit={handleSubmit}>
        <h4>{question}</h4>
        <p>Make a choice:</p>
        {answers.map(answer =>
            <div>
                <input type="radio" value="test" />
                <label>{answer}</label>
            </div>)}
        <button type="submit">submit</button>
    </form>
}

export default PollComponent;