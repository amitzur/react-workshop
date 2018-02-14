import smurfs from '../data/smurfs.json';

const delay = (func, timeout = 1000) => new Promise(resolve => setTimeout(() => func(resolve), timeout));

export const getSmurfs = () => delay(resolve => resolve(smurfs), 3000);

export const deleteSmurfs = (smurfs) => delay(resolve => resolve());