import './App.css'
import Navbar from './Components/Navbar'
import UserContext from './context/context'
import { useEffect, useState } from 'react';
import testoasaSvg from './assets/testoasa.svg'
import PollComponent from './Components/PollComponent';
import apiBase from './utils/constants';
import PollContext from './context/PollContext';

function App() {
    const [user, setUser] = useState(null);
    const [polls, setPolls] = useState([]);

    const getPolls = async () => {
        const rawResponse = await fetch(`${apiBase}/polls`, {
            method: 'GET',
            // credentials: "include",
            // headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
            // body: JSON.stringify(formData)
        });
        const jsonResponse = await rawResponse.json();
        console.log(jsonResponse);
        setPolls(jsonResponse);
    }

    const getUser = async () => {
        const rawResponse = await fetch(`${apiBase}/get-user`, {
            method: 'POST',
            credentials: "include",
            headers: { "Access-Control-Allow-Credentials": "true", "Content-Type": "application/json" },
        });
        const jsonResponse = await rawResponse.json();
        if (rawResponse.status === 200) {
            setUser(jsonResponse);
        }
    }

    useEffect(() => {
        getPolls();
        getUser();
    }, []);


    return (
        <>
            <UserContext.Provider value={[user, setUser]}>
                <PollContext.Provider value={[polls, setPolls]}>
                    <Navbar></Navbar>
                    <div className='main-content'>
                        <div className='main-content-header'>
                            <p>Opiniile sunt mai importante ca niciodată. Platformele de sondaje permit organizatorilor să culeagă feedback direct de la audiența lor și să înțeleagă mai bine nevoile și dorințele acesteia.</p>
                            <img src={testoasaSvg} style={{ width: '160px' }} />
                        </div>
                        <div className='polls-container'>
                            {polls.length > 0 ?
                                polls.map(poll => (
                                    <PollComponent key={poll._id + (user ? user._id : 1)} pollId={poll._id} question={poll.question} answers={poll.answers} ownerId={poll.ownerId} votes={poll.votes} setPolls={setPolls} />
                                )) : null}
                        </div>
                    </div></PollContext.Provider>
            </UserContext.Provider>
        </>
    )
}

export default App