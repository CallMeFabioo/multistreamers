import { urlWithoutProtocol } from './urlWithoutProtocol';

export const buildChatUrl = (channel = '') => {
  const params = new URLSearchParams([
    ['parent', urlWithoutProtocol],
    ['parent', `www.${urlWithoutProtocol}`]
  ]);

  const url = `https://www.twitch.tv/embed/${channel}/chat?${params}`;

  return url;
};
