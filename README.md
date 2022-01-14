This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The site is currently being hosted on S3: http://readme-site.s3-website-us-east-1.amazonaws.com/
Hackaton project card: https://www.notion.so/artsy/Supercharge-our-artsy-README-content-with-a-statically-built-site-navigation-and-fast-search-97bf473e540a4191a518500060a57790

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying

To build:

```
yarn build
```

Then upload static files to S3:

```
aws s3 cp out s3://readme-site/ --recursive
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

