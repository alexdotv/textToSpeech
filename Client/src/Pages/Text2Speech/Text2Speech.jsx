import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';
import './Text2Speech.css';

export default function Text2Speech() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [token, setToken] = useState('');
  const [voice, setVoice] = useState('alloy');
  const [history, setHistory] = useState([]);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUserDetails(storedToken);
      fetchHistory(storedToken);
    }
  }, []);

  const fetchUserDetails = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTokens(response.data.tokens);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const fetchHistory = async (token) => {
    try {
      const response = await axios.get('http://localhost:3000/api/history', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setHistory(response.data.history);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleVoiceChange = (e) => {
    setVoice(e.target.value);
  };

  const handleReadClick = async () => {
    if (!text.trim()) {
      message.error('Пожалуйста, введите текст для чтения.');
      return;
    }

    try {
      if (!token) {
        alert('Token is missing');
        return;
      }

      const response = await axios.post('http://localhost:3000/api/read', { text, voice }, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const audioBlob = new Blob([response.data], { type: 'audio/mp3' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);

      const audio = new Audio(url);
      audio.play();
      
      await fetchUserDetails(token);
      await fetchHistory(token);
    } catch (error) {
      console.error('Error reading text:', error);
    }
  };

  const handleDownloadClick = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'audio.mp3';
      a.click();
    }
  };

  return (
    <div className="container">
      <div className="history">
        <h2>Your History:</h2>
        <ul>
          {history.map((item, index) => (
            <li key={index}>{`${item.text} - ${item.voice}`}</li>
          ))}
        </ul>
      </div>

      <div className="text2speech">
        <textarea
          id="bigInput"
          value={text}
          onChange={handleInputChange}
          rows={5}
          cols={40}
          placeholder="Enter text..."
        />
        <div className='buttons'>
          <select name="options" id="options" value={voice} onChange={handleVoiceChange}>
            <option value="alloy">Alloy</option>
            <option value="echo">Echo</option>
            <option value="fable">Fable</option>
            <option value="onyx">Onyx</option>
            <option value="nova">Nova</option>
            <option value="shimmer">Shimmer</option>
          </select>
          <button onClick={handleReadClick}>Read</button>
          <button onClick={handleDownloadClick}>Download</button>
        </div>
        <audio controls src={audioUrl} />
        <div className="token-count">Tokens left: {tokens}</div>
      </div>
    </div>
  );
}
