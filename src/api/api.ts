import {
  TGetInfoResponse,
  TLoginResponse,
  TFetchProfileResponse,
  TFetchAuthorResponse,
  TFetchQuoteResponse,
  TLogoutResponse,
} from '../types/TRequestAnswer';

const simulateDelay = (ms: number, signal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timeout);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });

const mockUsers = [{ id: 1, email: 'user@test.com', password: '12345', name: 'Homer' }];

const mockAuthors = [
  {
    authorId: 1,
    name: 'Walt Disney',
  },
  {
    authorId: 2,
    name: 'Mark Twain',
  },
  {
    authorId: 3,
    name: 'Albert Einstein',
  },
];

const mockTokens = ['mock-token-12345', 'mock-token-67890'];

interface IQuote {
  quoteId: number;
  authorId: number;
  text: string;
}

const mockQuotes: IQuote[] = [
  {
    quoteId: 1,
    authorId: 1,
    text: 'The more you like yourself, the less you are like anyone else, which makes you unique.',
  },
  {
    quoteId: 2,
    authorId: 1,
    text: "Disneyland is a work of love. We didn't go into Disneyland just with the idea of making money.",
  },
  {
    quoteId: 3,
    authorId: 1,
    text: 'I always like to look on the optimistic side of life, but I am realistic enough to know that life is a complex matter.',
  },
  { quoteId: 4, authorId: 2, text: 'The secret of getting ahead is getting started.' },
  {
    quoteId: 5,
    authorId: 2,
    text: 'Part of the secret of a success in life is to eat what you like and let the food fight it out inside.',
  },
  {
    quoteId: 6,
    authorId: 2,
    text: "You can't depend on your eyes when your imagination is out of focus.",
  },
  {
    quoteId: 7,
    authorId: 3,
    text: 'Look deep into nature, and then you will understand everything better.',
  },
  {
    quoteId: 8,
    authorId: 3,
    text: 'Learn from yesterday, live for today, hope for tomorrow. The important thing is not to stop questioning.',
  },
  { quoteId: 9, authorId: 3, text: 'The only source of knowledge is experience.' },
];

export const getInfo = async (): Promise<TGetInfoResponse> => {
  await simulateDelay(1000);
  return {
    success: true,
    data: 'Немного информации о нас...',
  };
};

export const login = async (email: string, password: string): Promise<TLoginResponse> => {
  await simulateDelay(1500);
  const user = mockUsers.find((u) => u.email === email && u.password === password);

  if (!user) {
    return {
      success: false,
      data: {
        token: '',
      },
    };
  }

  return {
    success: true,
    data: {
      token: mockTokens[0],
    },
  };
};

export const fetchProfile = async (token: string): Promise<TFetchProfileResponse> => {
  await simulateDelay(1000);

  if (!mockTokens.includes(token)) {
    throw new Error('Недействительный токен');
  }

  return {
    success: true,
    data: {
      fullname: 'Homer',
      email: 'user@test.com',
    },
  };
};

export const fetchAuthor = async (
  token: string,
  signal?: AbortSignal,
): Promise<TFetchAuthorResponse> => {
  await simulateDelay(5000, signal);

  if (!mockTokens.includes(token)) {
    throw new Error('Недействительный токен');
  }

  const randomAuthor = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];
  return {
    success: true,
    data: {
      authorId: randomAuthor.authorId,
      name: randomAuthor.name,
    },
  };
};

export const fetchQuote = async (
  token: string,
  authorId: number,
  signal?: AbortSignal,
): Promise<TFetchQuoteResponse> => {
  await simulateDelay(5000, signal);

  if (!mockTokens.includes(token)) {
    throw new Error('Недействительный токен');
  }

  const quotes = mockQuotes.filter((quote) => quote.authorId === authorId);
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)] || {
    quoteId: 0,
    text: 'Цитата не найдена',
  };

  return {
    success: true,
    data: {
      quoteId: randomQuote.quoteId,
      authorId: authorId,
      quote: randomQuote.text,
    },
  };
};

export const logout = async (token: string): Promise<TLogoutResponse> => {
  await simulateDelay(500);

  if (!mockTokens.includes(token)) {
    throw new Error('Недействительный токен');
  }

  return {
    success: true,
    data: {},
  };
};
