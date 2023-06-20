import { useEffect, useState, useRef } from 'react';
import { getAnswer, getLanguages } from '../app/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { clearAnswer } from '../app/translateSlice';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const [text, setText] = useState('');

  const sourceInput = useRef();
  const targetInput = useRef();

  console.log(sourceInput, targetInput);

  // hangi dilden çevrilmek istendiği bilgisi
  const [sourceLang, setSourceLang] = useState({
    value: 'tr',
    label: 'Turkish',
  });
  // hangi dile çevirmek istediği
  const [targetLang, setTargetLang] = useState({
    value: 'en',
    label: 'English',
  });

  useEffect(() => {
    // api'nin desteklediği bütün dilleri çek
    dispatch(getLanguages());
  }, []);

  //   çevir butonuna tıklanınca çalışır
  const handleClick = () => {
    /*
     * getAnswer isimli createAsyncThunk ile oluşturduğumuz
     * aksiyon fonksiyonuna parametre olarak göndediğimiz veriyi
     * slice createAysncThunk içerisinde tanımladığımız
     * fonksiyonda erşibiliryoruz
     */
    dispatch(getAnswer({ text, sourceLang, targetLang }));
  };

  // değiş butonuna tıklanınca
  const changeLang = () => {
    // hedef dili kaynak kısmına aktarma
    setSourceLang(targetLang);
    // kaynak dili hedef kısmına aktarma
    setTargetLang(sourceLang);

    // inputları sıfırlama
    sourceInput.current.value = '';
    dispatch(clearAnswer());
  };

  return (
    <>
      <h1>Çeviri +</h1>
      <div className="container">
        <div className="left">
          <Select
            value={sourceLang}
            onChange={(e) => setSourceLang(e)}
            // dil verisi yüklendiğininden selecti haberdar etme
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            type="text"
            ref={sourceInput}
          />
        </div>
        <button className="change-btn" onClick={changeLang}>
          Değiş
        </button>
        <div className="right">
          <Select
            value={targetLang}
            onChange={(e) => setTargetLang(e)}
            //
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            // apiden gelen cevabı ekrana yazma
            value={state.answer}
            className="disabled-area"
            disabled
            type="text"
            ref={targetInput}
          />
        </div>
      </div>
      <button onClick={handleClick}>Çevir</button>
    </>
  );
};

export default MainPage;
