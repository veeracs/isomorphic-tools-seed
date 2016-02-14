module.exports = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 8080,
  apiHost: process.env.FUSION_API_HOST,
  app: {
    title: 'Fusion Vertical Seed',
    description: 'A universal seed project for Fusion verticals'
  }
};
