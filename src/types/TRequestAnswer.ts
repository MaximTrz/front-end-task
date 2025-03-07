export type TRequestAnswer<T = unknown> = {
  success: boolean;
  data: T;
};

export type TGetInfoResponse = TRequestAnswer<string>;

export type TLoginResponse = TRequestAnswer<{ token: string }>;

export type TFetchProfileResponse = TRequestAnswer<{
  fullname: string;
  email: string;
}>;

export type TFetchAuthorResponse = TRequestAnswer<{
  authorId: number;
  name: string;
}>;

export type TFetchQuoteResponse = TRequestAnswer<{
  quoteId: number;
  authorId: number;
  quote: string;
}>;

export type TLogoutResponse = TRequestAnswer<{}>;
