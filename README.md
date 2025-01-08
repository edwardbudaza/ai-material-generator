# Learn Mate 🔥

**Learn Mate** is an innovative platform that harnesses the power of AI to revolutionize the way job seekers prepare for interviews and acquire new skills. By leveraging cutting-edge technologies, Learn Mate empowers users to generate personalized study materials tailored to their specific needs.

## Table of Contents

<details>
  <summary>Click to expand table of contents</summary>

- Technologies Used
- Getting Started
- Package.json Scripts
- Environment Variables
- Deployment Recommendations
- Contribution
- Acknowledgements
- Contact Us
- License

</details>

## Technologies Used 🚀

<details>
  <summary>Click to expand technologies used</summary>

Learn Mate is built on a robust tech stack that ensures a seamless user experience and efficient content generation:

- ✨ **Next.js**: for crafting a dynamic and responsive user interface.
- 🔐 **Clerk**: for secure user authentication and management.
- 🗄️ **Drizzle ORM**: for efficient database management, ensuring data integrity and scalability.
- 🎨 **Tailwind CSS**: for styling and creating a visually appealing interface.
- 🧠 **Google Gemini**: the brain behind AI-powered course outline generation.
- ⚡ **Inngest**: for handling complex background tasks like generating study materials.
- 💰 **Paystack**: for secure payment processing, enabling users to purchase credits.
- 🐘 **PostgreSQL**: the reliable database that stores all the platform's data.

</details>

## Getting Started

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/learn-mate.git
    ```

2.  **Install dependencies**:

    ```bash
    npm install
    ```

3.  **Set up environment variables**: Create a `.env` file in the root directory and add the following environment variables, replacing the placeholders with your actual values:

    ```
    # -------------------------------
    # Database Configuration
    # -------------------------------
    DATABASE_URL=
    # -------------------------------
    # Clerk Configuration
    # -------------------------------
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
    NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/create-course

    # -------------------------------
    # Gemini Configuration
    # -------------------------------
    GEMINI_API_KEY=

    # -------------------------------
    # Paystack Configuration
    # -------------------------------

    PAYSTACK_SECRET_KEY=
    PAYSTACK_PUBLIC_KEY=
    NEXT_PUBLIC_APP_URL=http://localhost:3000 OR Deployed APP URL
    ```

4.  **Run the development server**:

    ```bash
    npm run dev
    ```

## Package.json Scripts

The `package.json` file includes various scripts for development and deployment:

- `dev`: Starts the development server.
- `build`: Builds the production-ready application.
- `start`: Starts the production server.
- `lint`: Runs linting checks on the codebase.
- `format`: Formats the code using Prettier.

## Environment Variables

Learn Mate requires the following environment variables:

- `DATABASE_URL`: The connection URL for your PostgreSQL database.
- `GEMINI_API_KEY`: Your API key for Google Gemini.
- `PAYSTACK_SECRET_KEY`: Your secret key for Paystack.

## Deployment Recommendations

Learn Mate is optimized for deployment on Vercel, the platform created by the developers of Next.js. Vercel provides a seamless deployment experience with built-in support for serverless functions and edge caching.

Alternative deployment options include:

- Netlify: Another popular platform for deploying serverless applications.
- AWS, Azure, or Google Cloud: For more control over infrastructure and scaling.

## Contribution

Contributions to Learn Mate are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them.
4.  Push your changes to your forked repository.
5.  Create a pull request to the main repository.

## Acknowledgements

Learn Mate leverages several open-source libraries and frameworks. Special thanks to:

- **Next.js**: [https://nextjs.org/](https://nextjs.org/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **Drizzle ORM**: [https://drizzle.team/](https://drizzle.team/)

## Contact Us

For inquiries or feedback, please contact us at: edward.budaza@gmail.com

## License

This project is licensed under the [MIT License](LICENSE).
