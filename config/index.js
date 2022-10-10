const dev = process.env.NODE_DEV !=='production'
export const server = dev?'http://localhost:3000' : 'https://yoir.com'