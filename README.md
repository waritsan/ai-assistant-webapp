# Azure Static Web App: Next.js + Tailwind CSS

This project is a Next.js app styled with Tailwind CSS, designed to be deployed as an Azure Static Web App. It interacts with an Azure Function backend via HTTP API calls.

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run locally:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Interacting with Azure Function
- The frontend sends a POST request to your Azure Function endpoint (e.g., `/api/openai-assistant`) with a prompt and displays the response.

## Deployment
- Deploy this app as an Azure Static Web App and configure the backend API route to point to your Azure Function.

## Customization
- Edit the sample page in `src/app/page.tsx` to change the UI or API logic.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
