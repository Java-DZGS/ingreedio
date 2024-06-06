import { AxiosResponse } from 'axios';
import { apiUrl } from '../config/config';
import RequestUrlBuilder from '../utils/requestBuilder';
import { ObjectWithNameAndId } from '../types/objectWithNameAndId';
import api from '../config/api';

const providersApiUrl = `${apiUrl}/providers`;

export type ProviderObject = ObjectWithNameAndId

export const getProvidersApi = (query: string, count: number): Promise<
  AxiosResponse<ProviderObject[]>
> => api.get(new RequestUrlBuilder(`${providersApiUrl}`).setParam('count', count.toString()).setParam('query', query)
  .build());

// Example of the ids string: '5,21,52,10,11'
export const getProvidersByIdsStringApi = (ids: string): Promise<
  AxiosResponse<ProviderObject[]>
> => api.get(new RequestUrlBuilder(`${providersApiUrl}/get-by`).setParam('ids', ids).build());

export const getProvidersByIdsApi = (ids: string[]): Promise<
  AxiosResponse<ProviderObject[]>
> => getProvidersByIdsStringApi(ids.join(','));
