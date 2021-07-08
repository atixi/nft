module.exports = {
  webpack5: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    HEROKU_BASE_URL: process.env.HEROKU_BASE_URL,
  },
};
