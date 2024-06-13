import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import TextToSpeech from './Pages/Text2Speech/Text2Speech'
import Auth from './Pages/Auth/Auth'
import { AuthProvider } from './Context/AuthContext';

function App() {

  return (
    <>
       <AuthProvider>
        <Router>
            <div className="wrapper">
              <Header />
              <Routes>
                <Route path="/" element={<TextToSpeech />} />
                <Route path="/Auth" element={<Auth />} />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
    </>
  )
}

export default App
