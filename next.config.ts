module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "localhost", // Allow images from localhost
      },
      {
        protocol: "https",
        hostname: "storage.ngodat0103.live", // Thêm hostname mới vào đây
      },
    ],
  },
};
