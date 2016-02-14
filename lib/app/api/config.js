export default function getConfig(callback) {
  //  Setup the application configuration object
  //  These properties determine configuration for social widgets,
  //  analytics, ads A/B Testing and WP themes
  setTimeout(() => {
    callback({
      apiVersion: '0.0.0',
      social: {},
      ads: {},
      analytics: {},
      theme: {},
      abTesting: {}
    });
  }, 500);
}
