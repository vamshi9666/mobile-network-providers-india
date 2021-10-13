import axios from 'axios';
import {airtelParser, ideaParser, jioParser} from './parsers';
import {IProvider} from './types';

const providers: IProvider[] = [
  {
    name: 'jio',
    apiUrl: 'https://www.jio.com/en-in/4g-plans',
  },
  {
    name: 'airtel',
    apiUrl: 'https://www.airtel.in/recharge-online',
  },
  {
    name: 'vi',
    apiUrl: 'https://www.airtel.in/recharge-online',
  },
];

const getData = async () => {
  const promises = providers.map(async (p) => {
    const {data} = await axios.get(p.apiUrl);
    if (p.name === 'jio') {
      return jioParser(data, p);
    } else if (p.name === 'airtel') {
      return airtelParser(data, p);
    } else if (p.name === 'vi') {
      return ideaParser(data, p);
    }
  });

  // @ts-ignore
  return Promise.all(promises).then((r) => r.flat());
};

export default getData;
