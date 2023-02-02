import { urlWithoutProtocol } from './urlWithoutProtocol';

import type { Streamer } from '@src/types';

export const buildEmbed = (streamer: Streamer) => {
  const { id, channel } = streamer;

  if (!id || !channel) {
    throw new Error('Invalid arguments. Please, provide an id and a channel.');
  }

  const twitch = window as DefaultWindow;

  if (!twitch.Twitch) {
    throw new Error('Failed to load Twitch embed video.');
  }

  const iframeWrapper = document.getElementById(id);

  if (iframeWrapper && iframeWrapper.childElementCount >= 1) return;

  const embed = new twitch.Twitch.Embed(id, {
    channel,
    layout: 'video',
    width: '100%',
    height: '100%',
    parent: [urlWithoutProtocol, `www.${urlWithoutProtocol}`],
  });

  return embed;
};
