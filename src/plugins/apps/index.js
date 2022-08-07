const apps = require('./data.json');

module.exports = async function appsPlugin() {
  return {
    name: 'apps-plugin',
    async loadContent() {
      const FAVS = new Set([
        '1password',
        'asana',
        'discord',
        'figma',
        'flat',
        'github-desktop',
        'hyper',
        'itchio',
        'loom',
        'microsoft-teams',
        'notion',
        'obsidian',
        'polypane',
        'postman',
        'signal',
        'slack',
        'skype',
        'splice',
        'tidal',
        'trello',
        'twitch',
        'whatsapp',
        'wordpress',
      ]);

      return {
        apps: apps.map((app) => ({
          ...app,
          isFavorite: FAVS.has(app.slug),
        })),
        favs: apps.filter((app) => FAVS.has(app.slug)),
      };
    },
    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      // Create friends global data
      setGlobalData(content);
    },
  };
};
