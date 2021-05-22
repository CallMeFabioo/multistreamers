export const loadTwitchScrit = (): void => {
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
  document.body.append(script);
};
