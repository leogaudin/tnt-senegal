import axios from 'axios';
import {showToast} from './showToast';

export function sendScan(data: {}) {
  return new Promise((resolve, reject) => {
    axios
      .post('https://tnt-senegal-api.vercel.app/api/scan', data, {
        headers: {'Content-Type': 'application/json'},
      })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          showToast(
            'success',
            'OK !',
            'Scan envoyé avec succès',
          );
          resolve(response.data);
        } else {
          reject(
            new Error(`Request failed with status code ${response.status}`),
          );
        }
      })
      .catch(error => {
        showToast(
          'error',
          'Erreur !',
          'Le scan n\'a pas pu être envoyé',
        );
        reject(error);
      });
  });
}
