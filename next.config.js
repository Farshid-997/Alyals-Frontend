/** @type {import('next').NextConfig} */
module.exports = {
  // images: {
  //   domains: [
  //     'img.freepik.com',
  //     'plus.unsplash.com',
  //     'images.unsplash.com',
  //     'www.freepik.com',
  //     'skincarebd.com',
  //     'cdn.shopify.com',
  //     'plugins-media.makeupar.com',
  //     'media.licdn.com',
  //     'static.nike.com',
  //     'art-furniture-3.myshopify.com',
  //     'demo2.themelexus.com',
  //     'cdn-icons-png.flaticon.com',
  //     'en.gliamicidipierrot.com',
  //     'cdn.vectorstock.com',
  //     'static.helpjuice.com',
  //     'encrypted-tbn0.gstatic.com',
  //     'www.rasluxuryoils.com',
  //   ],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};
