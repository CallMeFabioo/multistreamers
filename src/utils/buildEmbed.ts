import type { Streamer } from 'pages';
import { urlWithoutProtocol } from './urlWithoutProtocol';

export const buildEmbed = (streamer: Streamer) => {
  const { id, channel } = streamer;

  if (!id || !channel) {
    throw new Error('Invalid arguments. Please, provide an id and a channel.');
  }

  const embed = new (window as DefaultWindow).Twitch.Embed(id, {
    channel,
    layout: 'video',
    width: '100%',
    height: '100%',
    parent: [urlWithoutProtocol, `www.${urlWithoutProtocol}`]
  });

  return embed;
};
