import { useEffect, useState } from 'react';
import { getAnswer, getLanguages } from '../app/actions';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const MainPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);
  const [text, setText] = useState('');

  console.log(state);
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
    dispatch(getAnswer(text));
  };

  return (
    <>
      <h1>Çeviri +</h1>
      <div className="container">
        <div className="left">
          <Select
            // dil verisi yüklendiğininden selecti haberdar etme
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea
            onChange={(e) => setText(e.target.value)}
            type="text"
          />
        </div>
        <div className="right">
          <Select
            isLoading={state.isLoading}
            isDisabled={state.isLoading}
            className="select"
            options={state.languages}
          />
          <textarea className="disabled-area" disabled type="text" />
        </div>
      </div>
      <button onClick={handleClick}>Çevir</button>
    </>
  );
};

export default MainPage;
