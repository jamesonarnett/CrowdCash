# Crowd Cash

This is a simple crowd funding app built with Laravel, React, and Inertia.js, using MySQL and AWS S3 buckets.

## Prerequisites

Before you get started, make sure you have the following software installed:

-   [PHP](https://www.php.net/downloads.php) >= 8
-   [Composer](https://getcomposer.org/download/)
-   [Node.js](https://nodejs.org/) >= 16.x
-   [NPM](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/laravel-react-inertia-mysql.git
    cd laravel-react-inertia-mysql

    composer install

    npm install   # or yarn install

    cp .env.example .env

    php artisan key:generate

    php artisan migrate --seed

    php artisan serve

    npm start
    ```

# Usage

You can start building your React components in the resources/js/Pages directory. Inertia.js allows you to create components and use server-side routing.

The Laravel API routes can be defined in the routes/api.php file.

Create and manage database models in the app/Models directory.

Views are located in the resources/views directory.

Customize the frontend as needed by modifying the React components in the resources/js directory and the Blade views in the resources/views directory.

# Contributing

Contributions are welcome. Please fork the repository and submit a pull request.

# Acknowledgments

This project was built with Laravel, React, and Inertia.js, using the power of open-source software and community contributions.
