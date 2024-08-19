import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2"
// import "./Chatbox.css"


export default function Chatbox() {
    // const [message, setMessage] = useState('');
    // const [response, setResponse] = useState('');

    // const sendMessage = async () => {
    //     try {
    //         const res = await axios.post('http://localhost:3000/chat', { message });
    //         setResponse(res.data.reply);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const surpriseOptions = [
        "Mau nanya apa si bang?"
        // "Who do you make BLT sandwich?",
        // "What is the capital of France?",
        // "What is the best programming language?",
        // "When is National Cat",
    ];

    const surprise = () => {
        const randomValue = Math.floor(Math.random() * surpriseOptions.length);
        setValue(surpriseOptions[randomValue]);
    };

    const getResponse = async () => {
        if (!value) {
            setError("Please enter a question");
            return;
        }
        try {
            const options = {
                method: "POST",
                body: JSON.stringify({
                    history: chatHistory,
                    message: value,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch("http://localhost:3000/chat", options);
            const data = await response.text();

            setChatHistory((oldChatHistory) => [
                ...oldChatHistory,
                {
                    role: "user",
                    parts: value,
                },
                {
                    role: "model",
                    parts: data,
                },
            ]);
            setValue("");
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please try again later.");
        }
    };

    const clear = () => {
        setChatHistory([]);
        setValue("");
        setError("");
    };
    return (
        // <div className="bg-slate-800 p-10">
        //     <h1>Chat with GPT</h1>
        //     <textarea
        //         value={message}
        //         onChange={(e) => setMessage(e.target.value)}
        //         rows="4"
        //         cols="50"
        //     ></textarea>
        //     <br />
        //     <button onClick={sendMessage}>Send</button>
        //     <h2>Response:</h2>
        //     <p>{response}</p>
        // </div>
        <div className="app">
            <p>
                What do you want to know?
                <button className="surprise" onClick={surprise} disabled={!chatHistory}>
                    Surprise me
                </button>
            </p>
            <div className="input-container">
                <input
                    value={value}
                    placeholder="When is Christmas...?"
                    onChange={(e) => setValue(e.target.value)}
                />
                {!error && <button onClick={getResponse}>Ask me</button>}
                {error && <button onClick={clear}>Clear</button>}
            </div>
            {error && <p className="error">{error}</p>}
            <div className="search-result">
                {chatHistory.map((chatItem, _index) => (
                    <div key={_index}>
                        <p className="answer">
                            {chatItem.role} : {chatItem.parts}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}