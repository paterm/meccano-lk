/*
  .env template
  HOST_API_DEV=https://dev.api.example.ru/v1
  HOST_API_PROD=https://api.example.ru/v1
*/

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.REACT_APP_HOST_API_DEV) {
    throw new Error('In development mode in .env requires REACT_APP_HOST_API_DEV');
  }
}

if (process.env.NODE_ENV === 'production') {
  if (!process.env.REACT_APP_HOST_API_PROD) {
    throw new Error('In production mode in .env requires REACT_APP_HOST_API_PROD');
  }
}

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const HOST_API = process.env.NODE_ENV !== 'production'
  ? process.env.REACT_APP_HOST_API_DEV
  : process.env.REACT_APP_HOST_API_PROD;
