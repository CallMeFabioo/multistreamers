import '../src/styles/globals.css';

import { AnalyticsWrapper } from '../src/components/Analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <title>
          Multistreamers - Watch your favorites streamers all at once!
        </title>
        <script
          async
          type="text/javascript"
          src="https://embed.twitch.tv/embed/v1.js"
        />
      </head>
      <body className="antialiased bg-[#18181b]">
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
