import { createClient } from '@sanity/client';
import imageUrlBuilder from  '@sanity/image-url';

export const client = createClient({
    projectId: "3jtdwsrx",
    dataset: 'production',
    apiVersion: '2023-03-29',
    useCdn: true,
    token: "skLA1CoNqpgMQIsfjpLycTaLMeVT0k0WeIATX2z51Vc6s7jUvuoRXbfPodM9xhfx9hrPOncHOvBLRmu2EDjGudJ1bvyiYfgc3bHMlXmjQNVp7lnDTibIjKls4BxI6FOyJxytiW3KAaA40gciyTBHa5RpPaZMglmFthFpJjsxO0HZcWVjnG94"
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);