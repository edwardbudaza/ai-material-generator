import { resolve } from 'path';

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias['@'] = resolve(process.cwd(), 'src');
    return config;
  },
};

export default nextConfig;
