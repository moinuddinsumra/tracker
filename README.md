# Cyber-Luxury Laravel 12 Login & Activity Tracker

Welcome to the **AetherOS Login and User Activity Tracker**! This is a complete, full-stack, secure Laravel 12 application integrated with a gorgeous glassmorphic web frontend, live tracking system, 120-second inactivity auto-logout, and comprehensive REST APIs designed against **Stitch MCP** design systems.

---

## 🚀 Key Features

*   🔒 **Secure Multi-tier Auth**: Traditional session-based authentication for Blade views, and Sanctum token authorization for REST APIs (securely using `bcrypt`).
*   📈 **Cumulative Login Tracking**: Same-email sign-in increments database `login_count` and updates current `ip_address` & timestamps dynamically.
*   🧭 **Glassmorphic Hud**: Beautiful cyber-luxury user dashboard built directly on Tailwind CSS CDN and custom Space Grotesk/Inter fonts generated via Stitch.
*   ⏳ **120-Second Auto-Logout**: Pure JavaScript idle event listener (tracking clicks, scrolls, keys, and mouse movements) that logs the user out securely after 120s of inactivity, updates `logout_time` in database, and invalidates terminal tokens.
*   📊 **Administrative Queries (SQL JOIN)**: Optimized left database JOIN query merging user data and session activities for instant analysis.
*   🔗 **Stitch MCP Integration**: Client configuration mapping Laravel models directly to the Stitch Cloud UI designer project.
*   📬 **Postman Collection**: Pre-configured JSON collection with automated environment variables mapping to parse bearer tokens instantly.

---

## 🛠️ Environment Prerequisites

1.  **PHP**: `^8.2` or later (tested successfully on PHP `8.5`)
2.  **Composer**: Dependency manager for PHP.
3.  **MySQL Server**: Running locally on port `3306`.
4.  **NodeJS & NPM**: Required for compiling custom styles (optional, as Tailwind is integrated via dynamic CDN).

---

## ⚙️ Installation & Setup

1.  **Clone / Download the repository** into your local workspace.
2.  **Install dependencies**:
    ```bash
    composer install
    ```
3.  **Configure environment variables**:
    Copy `.env.example` to `.env` or check the pre-configured `.env`:
    ```ini
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=web_tracker
    DB_USERNAME=root
    DB_PASSWORD=
    ```
4.  **Create Database**:
    Verify the MySQL database `web_tracker` exists:
    ```bash
    mysql -u root -e "CREATE DATABASE IF NOT EXISTS web_tracker;"
    ```
5.  **Run Migrations and Seeders**:
    Deploy the tables and seed default clearance operators:
    ```bash
    php artisan migrate
    php artisan db:seed
    ```

---

## 🔑 Default Clearance Credentials

To test the application, log in with the following seeded operators (default password: `password`):

*   **Administrator**: `admin@core.sys`
*   **Elena Rostova**: `elena.r@cyberluxury.io`
*   **Marcus Vance**: `mvance@nexus.net`
*   **Sarah Chen**: `schen.ops@aether.org`
*   **David Kim**: `dkim_99@cyberluxury.io`

---

## 🖥️ Running Locally

Start the local Laravel development server:
```bash
php artisan serve
```
Open [http://127.0.0.1:8000](http://127.0.0.1:8000) in your browser. You will be redirected to the secure login terminal.

---

## 📬 API Integration & Postman Testing

All administrative tracking APIs are fully testable. We have generated a complete, pre-configured collection in the root directory: [Web_Tracker_Postman_Collection.json](./Web_Tracker_Postman_Collection.json).

### Available Endpoints
1.  **POST `/api/login`**: Authenticates user, increments login activity count, captures IP, and returns a Sanctum access token.
2.  **POST `/api/logout`** (Auth Required): Invalidates current Sanctum token, logs logout timestamp, and terminates session.
3.  **GET `/api/users`** (Auth Required): Returns registered operators directory.
4.  **GET `/api/login-activities`** (Auth Required): Returns live raw session streams.
5.  **GET `/api/dashboard-data`** (Auth Required): Performs a SQL left JOIN to export merged tracking analytics.

---

## 🎨 Stitch MCP Configuration

The project is configured for **Stitch MCP** designer tools inside the [stitch_config.json](./stitch_config.json) file.
*   **Project Ref**: `projects/15830368362532184775`
*   **Design System Ref**: `assets/1a5c248d90c343568e96885cb6a3397a`
*   **Layout Style**: Cyber-Luxury Glass
*   **Real-time sync driver**: Polling client fetches `/api/dashboard-data` every 5 seconds to update metric HUDs and data streams with smooth transitions.

---

## 📜 Code Architecture & Structures

*   **Migrations**:
    *   `database/migrations/0001_01_01_000000_create_users_table.php`
    *   `database/migrations/2026_05_23_145427_create_login_activities_table.php`
*   **Models**:
    *   `app/Models/User.php`
    *   `app/Models/LoginActivity.php`
*   **Controllers**:
    *   `app/Http/Controllers/AuthController.php` (Web sessions, increment logging, logins, logouts)
    *   `app/Http/Controllers/DashboardController.php` (Blade rendering, SQL JOIN query endpoint)
    *   `app/Http/Controllers/Api/ApiAuthController.php` (JSON Login, Sanctum access keys, logout revokes)
    *   `app/Http/Controllers/Api/ApiDashboardController.php` (JSON User query, Session query, Merged JOIN data)
*   **Views**:
    *   `resources/views/auth/login.blade.php` (Secure terminal login screen)
    *   `resources/views/dashboard.blade.php` (Admin control console, JS idle activity listeners, Stitch Client)
*   **Routes**:
    *   `routes/web.php`
    *   `routes/api.php`
