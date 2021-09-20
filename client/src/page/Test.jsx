import axios from 'axios';
import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { configAuth } from '../auth/authHeader';

export default function Test() {
    const [input, setInput] = useState('');
    const [message, setMessage] = useState([]);

    const send = () => {
        axios.post('http://localhost:5050/api/post/comment', {
            token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJtb3ZpZV9pZCI6MiwiaWF0IjoxNjMyMTM2OTk4fQ.syk5qxNWvmx30UFRw_LsTolBLurepV6mUkUVRxc_NjFClE_Hnl_xjSDJQ-TxethAzwq8lM4F-XQYifU7a39ZLA',
            message: input
        }, {
            timeout: 2000,
            headers: configAuth()
        }).then(() => {
            setInput('');
        });
    }

    useEffect(() => {
        const response = () => {
            const socket = socketIOClient('http://localhost:5050');
            socket.on('new-message', (newMessage) => {
                setMessage([...message, newMessage]);
            });
        }

        response();
    }, [message]);

    return (
        <div>
            <input type="text" onChange={(e) => { setInput(e.target.value) }} />
            <button type="button" onClick={() => { send() }}>Send</button>

            { message.map((data, i) => {
                return (
                    <dir key={i}>
                        { i + 1 } : { data.message }
                    </dir>
                )
            }) }
        </div>
    )
}
