export type IProviderName = 'vi' | 'jio' | 'airtel';

export type IProvider = {
  name: IProviderName;
  apiUrl: string;
};

export type IPlan = {
  price: number;
  validity_in_days: number;
  data?: string;
  advantages?: string[];
  advantages_length: number;
  provider_name: IProvider['name'];
  bundle_name?: string;
};
