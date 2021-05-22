type DefaultWindow = {
  Twitch: Twitch;
} & Window &
  typeof globalThis;

type EmbedParameters = {
  allowfullscreen: boolean;
  autoplay: boolean;
  channel: string;
  collection: string;
  width: string | number;
  height: string | number;
  layout: string;
  muted: boolean;
  parent: Array<string>;
  theme: string;
  time: string;
  video: string;
};

type EmbedConstructor = {
  new (id: string, parameters: Partial<EmbedParameters>): void;
  VIDEO_PLAY: string;
  VIDEO_REACY: string;
};

type Twitch = {
  Embed: EmbedConstructor;
};
