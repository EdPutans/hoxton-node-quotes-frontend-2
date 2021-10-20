import React from "react";

const API = `http://localhost:3001`;

const quotesEndpoint = `${API}/quotes`;

export type Reference = {
  quote: string;
  id: number;
  person: {
    first_name: string;
    last_name: string;
    image_url: string;
    age: number;
  }
};

interface UseFetchQuoteReturn<I> {
  state: State<I> | null;
  fetchState: () => void;
}

function getEndpoint<F extends FetchType>(fetchType: F, params?: { id?: number }): string | null {
  switch (fetchType) {
    case 'all':
      return quotesEndpoint
    case 'random':
      return `${quotesEndpoint}/random`
    case 'single':
    case 'delete':
    case 'update':
      return params?.id ? `${quotesEndpoint}/${params.id}` : null
    default:
      return null
  }
}

type FetchType = "random" | "all" | "single" | 'delete' | 'update';

type State<I> = I extends "all" ? Reference[] : Reference;

function useFetchQuote<I extends FetchType>(
  fetchType: I,
  params?: { id: number; body?: Partial<Reference> }
): UseFetchQuoteReturn<I> {
  const [state, setState] = React.useState<State<I> | null>(null);

  const fetchState = React.useCallback(() => {
    const endpoint = getEndpoint(fetchType, params);

    if (!endpoint) return console.error('Some params are missing to create proper endpoint');

    fetch(endpoint, { body: JSON.stringify(params?.body) })
      .then((r) => r.json())
      .then((resp: State<I>) => {
        setState(resp);
      })
      .catch((err) => {
        console.error(err);
        setState(null);
      });
    // params dep throws the hook into an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchType]);

  React.useEffect(() => {
    fetchState();
  }, [fetchState]);

  return { state, fetchState };
}

export default useFetchQuote;
