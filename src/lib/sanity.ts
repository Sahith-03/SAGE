import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'qobq7ogn', 
  dataset: 'production',
  useCdn: true, // `false` if you want to ensure fresh data
  apiVersion: '2023-05-03', // use a current date
});

// Create a separate client for write operations (needs token)
export const sanityWriteClient = createClient({
  projectId: 'qobq7ogn', 
  dataset: 'production',
  useCdn: false, // Write operations shouldn't use CDN
  apiVersion: '2023-05-03',
  token: import.meta.env.VITE_SANITY_API_TOKEN, // Read from .env
});

// Helper function to easily generate image URLs from Sanity image records
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: any) => builder.image(source);
