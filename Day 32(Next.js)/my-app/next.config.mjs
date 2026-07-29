/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [new URL('https://tse4.mm.bing.net/th/id/OIP.60k4JoqsHHHvQ-3CC7rKwwHaE0?r=0&rs=1&pid=ImgDetMain&o=7&rm=3')],
  },
};

export default nextConfig;
