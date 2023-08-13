import { useState, useEffect, useRef } from 'react';
import Header from '../components/shared/Header';
import Styles from '../styles/dictado/Dictado.module.css'

const Dictado = () => {
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const [rate, setRate] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [textToRead, setTextToRead] = useState('');
  const [wordsPerChunk, setWordsPerChunk] = useState(1);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [practiceArea, setPracticeArea] = useState('');
  const [currentPortionOfText, setCurrentPortionOfText] = useState('')
  const [textsMatch, setTextsMatch] = useState(true);


  const practiceAreaRef = useRef(null);

  useEffect(() => {
    const fetchVoices = () => {
      const speechSynthesisVoices = window.speechSynthesis.getVoices();
      setVoices(speechSynthesisVoices);
    };

    window.speechSynthesis.addEventListener('voiceschanged', fetchVoices);
    if ('onvoiceschanged' in speechSynthesis) {
      speechSynthesis.onvoiceschanged = fetchVoices();
    } else {
        fetchVoices();
    }

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', fetchVoices);
    };
  }, []);

  const handleChange = (event) => {
    const selectedVoiceURI = event.target.value;
    const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
    setSelectedVoice(voice);
  };

  const handleRateChange = (event) => {
    const rateValue = parseFloat(event.target.value);
    setRate(rateValue);
  };

  const handleTextChange = (event) => {
    //setTextsMatch(false)
    setTextToRead(event.target.value);
  };

  const handleWordsPerChunkChange = (event) => {
    const wordsPerChunkValue = parseInt(event.target.value, 10);
    setWordsPerChunk(wordsPerChunkValue);
  };

  
  const handleSpeak = () => {
    //setTextsMatch(false)
    if (selectedVoice && textToRead) {
      if (wordsPerChunk === 0) {
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setCurrentPortionOfText(textToRead)

        let r = setInterval(() => {
          console.log(speechSynthesis.speaking);
          if (!speechSynthesis.speaking) {
            clearInterval(r);
          } else {
            speechSynthesis.pause();
            speechSynthesis.resume();
          }
        }, 14000);

      } else {
        const words = textToRead.split(' ');
        const chunk = words.slice(currentWordIndex, currentWordIndex + wordsPerChunk);
        const utterance = new SpeechSynthesisUtterance(chunk.join(' '));
        setCurrentPortionOfText(chunk.join(' '))
        utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.onend = handleNextWords;
        window.speechSynthesis.speak(utterance);

        let r = setInterval(() => {
          console.log(speechSynthesis.speaking);
          if (!speechSynthesis.speaking) {
            clearInterval(r);
          } else {
            speechSynthesis.pause();
            speechSynthesis.resume();
          }
        }, 14000);
      }

      setSpeaking(true);
    }
  };

  const handleRepeat = () =>{
    const utterance = new SpeechSynthesisUtterance(currentPortionOfText);
        utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.onend = () => setSpeaking(false);
        window.speechSynthesis.speak(utterance);
        setSpeaking(true);

  }

  const handleNextWords = () => {
    setCurrentWordIndex(currentWordIndex + wordsPerChunk);
    setSpeaking(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    setTextsMatch(true)
  };

  const handleAreaChange = (event) => {
   //console.log(event.keyCode)
    //console.log(event.target.value)
    //console.log(event.target.value.length)
    //console.log(practiceArea.length)
    if(event.target.value.length < practiceArea.length)
        return
    if(event.target.value == textToRead.substring(0, event.target.value.length)){
        setPracticeArea( () => {return event.target.value})
        //console.log(practiceArea)

        if(textToRead.split(' ').slice(0, currentWordIndex)){
          //console.log("Texto escrito "+practiceArea)
        }
          //handleSpeak()
    }
  };
 

  useEffect(() => {
    if(textToRead.split(' ').slice(0, currentWordIndex).join(' ') == practiceArea){
      handleSpeak()
    }else{
      setTextsMatch(false);
    }
  }, [practiceArea]);

  useEffect(() => {
    // Focus the text area when the component mounts
    practiceAreaRef.current.focus();
    //setTextsMatch()
  }, []);


  return (
    <div>
      <Header></Header>

      <section>
        <h1>Practica de escritura</h1>
        <p>Selecciona las configuraciones para el dictado</p>
        <select value={selectedVoice ? selectedVoice.voiceURI : ''} onChange={handleChange}>
          <option value="">Idioma y voz</option>
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </select>
        <label htmlFor="hola">Velocidad</label>
        <input name='hola' type="range" min="0.5" max="2" step="0.1" value={rate} onChange={handleRateChange} />
        <select value={wordsPerChunk} onChange={handleWordsPerChunkChange}>
          <option value="0">Texto completo</option>
          <option value="1">1 word</option>
          <option value="2">2 words</option>
          <option value="3">3 words</option>
          <option value="4">4 words</option>
          <option value="5">5 words</option>
          <option value="10">10 words</option>
          <option value="20">20 words</option>
          <option value="30">30 words</option>

          {/* Add more options for desired number of words per chunk */}
        </select>
        <br />
        <br />
        <input placeholder='Escribe o pega el texto a dictar' type="text" value={textToRead} onChange={handleTextChange} style={{ width: '400px', marginBottom: '10px' }} />
        <br />
        <br />
        <button onClick={handleSpeak} disabled={!selectedVoice || !textToRead || speaking || !textsMatch}>
          Speak
        </button>
        <button onClick={handleRepeat} disabled={!selectedVoice || !textToRead || speaking}>
          Repeat
        </button>
        <button onClick={handleStop} disabled={!speaking}>
          Stop
        </button>
        <button onClick={handleReset}>
          Reset
        </button>

          <br/><br />
        <textarea className={Styles.practiceArea} id="w3review" name="w3review" rows="4" cols="50" style={{ padding:'10px'}}
                value={practiceArea} onChange={handleAreaChange} 
                ref={practiceAreaRef} // Add the ref attribute
        >
        </textarea>
          
      </section>
    </div>
  );
};

export default Dictado;
