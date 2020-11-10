import React, {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react';
import s from './VoiceSearch.module.css';


const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = 'ru-RU';

type VoiceSearchPropsType = {
  search: () => void
  setHideResults: (hideResults: boolean) => void
}
const VoiceSearch = (props: VoiceSearchPropsType) => {
  const [searchValue, setSearchValue] = useState<string>('');// значение в строке поиска
  const [isListening, setIsListening] = useState<boolean>(false);// микрофон

  useEffect(() => {
    handleListen()
  }, [isListening])

  // управлять микрофоном
  const handleListen = () => {
    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue...');
        mic.start();
      }
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }
    mic.onresult = event => {
      const transcript = Array.from(event.results).map(result => result[0]).map(result => result.transcript).join('')
      console.log(transcript);
      setSearchValue(transcript);//записать в строку поиска
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }
// включить/выключить микрофон (по кнопке)
  const onIsListening = () => {
    setIsListening(!isListening);
  }
  // ввод символов в строку с клавиатуры
  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  // искать (по кпопке)
  const onSearch = () => {
    props.search();
    setIsListening(false); // выключить микрофон
  }
  // искать (по клавише Enter)
  const onEnterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      props.search();
      setIsListening(false); // выключить микрофон
    }
  }
  // очистить строку ввода
  const onCancel = () => {
    setSearchValue('');
    props.setHideResults(true); // спрятать результаты поиска
  }

  return (
    <div>
      <div className={s.search_block}>
        <input type="text"
               value={searchValue}
               onChange={onChangeSearchValue}
               onKeyPress={onEnterSearch}
               placeholder='Search...'
               className={s.search_string}/>
        <div className={s.buttons}>
          <button className={s.btn_cancel} onClick={onCancel}>X</button>
          {isListening
            ? <button className={s.btn_mic} onClick={onIsListening}>Stop</button>
            : <button className={s.btn_mic} onClick={onIsListening}>Speak</button>}
          <button className={s.btn_search} onClick={onSearch}>Search</button>
        </div>
      </div>
    </div>
  )
}

export default VoiceSearch;