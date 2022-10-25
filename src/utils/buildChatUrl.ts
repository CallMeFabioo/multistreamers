import { urlWithoutProtocol } from './urlWithoutProtocol';

export const buildChatUrl = (channel = '') => {
  const params = new URLSearchParams([
    ['parent', urlWithoutProtocol],
    ['parent', `www.${urlWithoutProtocol}`]
  ]);

  return `https://www.twitch.tv/embed/${channel}/chat?${params}`;
};
