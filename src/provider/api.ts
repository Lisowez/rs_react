import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Item {
  id: number;
  name: string;
  actor: string;
  yearOfBirth: number;
  house: string;
  image: string;
}

export const api = createApi({
  reducerPath: 'potterApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://hp-api.onrender.com/api' }),
  endpoints: (builder) => ({
    getCharacters: builder.query<Item[], void>({
      query: () => '/characters',
    }),
    getCharacterByID: builder.query<Item[], string>({
      query: (id: string) => `/character/${id}`,
    }),
  }),
});

export const { useGetCharactersQuery, useGetCharacterByIDQuery } = api;
