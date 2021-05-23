const isDev = process.env.NODE_ENV !== 'production';

export const urlWithoutProtocol = isDev
  ? 'localhost'
  : (process.env.NEXT_PUBLIC_SITE_URL?.replace(/http(s)?:\/\//i, '') as string);
