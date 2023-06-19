import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from './constants';
/*
 !Asenkron aksiyon
 ? bu method bizden 2 parametre ister:
 * methodun görevini tanımlayan string
 * bir fonksiyon
 * * bu fonksiyon genelde async işlemler yapar
 * * ve api'den gelen cevabı store'aktarmak için return eder
 */

export const getAnswer = createAsyncThunk(
  'translate/getAnswer',
  async (text) => {
    // istek atarken göndereceğim bilgiler
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'tr');
    encodedParams.set('target_language', 'en');
    encodedParams.set('text', text);

    const options = {
      method: 'POST',
      url: 'https://text-translator2.p.rapidapi.com/translate',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key':
          '75dc092df0msh3c03138e5cc1ea2p19035ejsn916bcc592247',
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      },
      data: encodedParams,
    };
    // apiye istek atma kısmı
    const res = await axios.request(options);

    console.log(res);
  }
);

// Diller verisini çekmek için aksiyon
export const getLanguages = createAsyncThunk(
  'translate/getLanguages',
  async () => {
    // api'ye istek atma
    const res = await axios.request(options);
    const languages = res.data.data.languages;
    /*
     * diziyi döndük ve dizi içerisindeki yer alan objelerdeki
     * code ve name değerlerini
     * value ve label değerlyle değiştirdik
     * ve yen bir dizi oluşturduk
     */
    const newLanguages = languages.map((lang) => ({
      value: lang.code,
      label: lang.name,
    }));
    // verileri slice'a aktarma
    return newLanguages;
  }
);

// Elimde Olan = languages
// [
//   {
//     code: 'tr',
//     name: 'Türkiye',
//   },
//   {
//     code: 'en',
//     name: 'İngilizce',
//   },
// ][
//   // Elde Etmek İstediğim =
//   {
//     value: 'tr',
//     label: 'Türkiye',
//   }
// ];
