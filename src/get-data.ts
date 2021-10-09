import axios from 'axios';
import {jioParser} from './parsers/jio';
import {IProvider} from './types';

const providers: IProvider[] = [
  {
    name: 'jio',
    apiUrl: 'https://www.jio.com/en-in/4g-plans',
  },
];

const getData = async () => {
  const promises = providers.map(async (p) => {
    const {data} = await axios.get(p.apiUrl);
    if (p.name === 'jio') {
      return jioParser(data, p);
    } else if (p.name === 'airtel') {
      return jioParser(data, p);
    } else if (p.name === 'vi') {
      return jioParser(data, p);
    }
  });

  // @ts-ignore
  return Promise.all(promises).then((r) => r.flat());
};

export default getData;
