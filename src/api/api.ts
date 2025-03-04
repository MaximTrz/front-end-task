import TRequestAnswer from '../types/TRequestAnswer';

const simulateDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers = [{ id: 1, email: 'user@test.com', password: '12345', name: 'Test User' }];

const mockAuthors = [
  { id: 1, name: 'Александр Пушкин' },
  { id: 2, name: 'Лев Толстой' },
  { id: 3, name: 'Фёдор Достоевский' },
];

interface IQuote {
  id: number;
  text: string;
}

const mockQuotes: Record<number, IQuote[]> = {
  1: [
    { id: 101, text: 'Я вас любил...' },
    { id: 102, text: 'Чем меньше женщину мы любим...' },
  ],
  2: [
    { id: 201, text: 'Все счастливые семьи похожи...' },
    { id: 202, text: 'Сила есть — ума не надо...' },
  ],
  3: [
    { id: 301, text: 'Красота спасёт мир...' },
    { id: 302, text: 'Человек есть тайна...' },
  ],
};

interface IUser {
  id: number;
  email: string;
  password: string;
}

export const getInfo = async (): Promise<TRequestAnswer> => {
  await simulateDelay(1000);
  return {
    success: true,
    data: 'Немного информации о нас...',
  };
};

export const login = async (
  email: string,
  password: string,
): Promise<TRequestAnswer<{ token: string }>> => {
  await simulateDelay(1500);
  const user = mockUsers.find((u: IUser) => u.email === email && u.password === password);

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
      token: 'mock-token-12345',
    },
  };
};

export const fetchProfile = async (token: string) => {
  await simulateDelay(1000);

  if (token !== 'mock-token-12345') {
    throw new Error('Недействительный токен');
  }

  return {
    success: true,
    data: {
      fullname: 'Test User',
      email: 'user@test.com',
    },
  };
};

export const fetchAuthor = async (token: string) => {
  await simulateDelay(5000);

  if (token !== 'mock-token-12345') {
    throw new Error('Недействительный токен');
  }

  const randomAuthor = mockAuthors[Math.floor(Math.random() * mockAuthors.length)];

  return {
    success: true,
    data: {
      authorId: randomAuthor.id,
      name: randomAuthor.name,
    },
  };
};

export const fetchQuote = async (token: string, authorId: number) => {
  await simulateDelay(5000);

  if (token !== 'mock-token-12345') {
    throw new Error('Недействительный токен');
  }

  const quotes = mockQuotes[authorId] || [
    {
      id: 0,
      text: 'Цитата не найдена',
    },
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return {
    success: true,
    data: {
      quoteId: randomQuote.id,
      authorId: authorId,
      quote: randomQuote.text,
    },
  };
};

export const logout = async (token: string) => {
  await simulateDelay(500);
  return {
    success: true,
    data: {},
  };
};
