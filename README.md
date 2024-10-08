# Crypto Dashboard

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Make sure you have the following installed on your machine: Node.js (>= 14.x) and npm (>= 6.x) or yarn (>= 1.x). First, clone the repository:

```bash
git clone https://github.com/your-username/crypto-dashboard.git
cd crypto-dashboard
```

Then, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

## Running the Development Server

To start the development server, run:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 with your browser to see the result. You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## Building for Production

To build the app for production, run:

```bash
npm run build
# or
yarn build
# or
pnpm build
```
This will create an optimized production build in the `out` directory.

## Running the Production Build

After building the application, you can start the production server with:

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Deploying

The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js. Check out the Next.js deployment documentation for more details.

## Project Structure


* `app/`: Contains the application's pages.
* `client/`: Contains reusable React client components.
* `styles/`: Contains CSS modules for styling components.
* `public/`: Contains static assets like images and fonts.

## Development Choices

### Next.js
We chose Next.js for its powerful features like server-side rendering, static site generation, and API routes, which are essential for building a performant and scalable web application.

### TypeScript
TypeScript was used to add static typing to the project, which helps catch errors early and improves code quality and maintainability.

### CSS Modules
CSS Modules were used for styling to ensure that styles are scoped locally by default, preventing style conflicts and making it easier to maintain the styles.

### API Integration
The application fetches trading pairs from an API endpoint (/api/trading-pairs). This allows the app to dynamically load data and update the UI accordingly.

## Learn More
To learn more about Next.js, take a look at the following resources:  
Next.js Documentation - learn about Next.js features and API.
Learn Next.js - an interactive Next.js tutorial.
You can check out the Next.js GitHub repository - your feedback and contributions are welcome!  

## License
This project is licensed under the MIT License.


