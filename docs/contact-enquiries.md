# Contact enquiry delivery

The `/contact` form posts to `/api/contact`. The server validates the fields and forwards them to `CONTACT_ENQUIRY_WEBHOOK_URL` using a JSON POST. Configure this server-only environment variable in `.env.local` for local development and in the deployment environment for production.

The receiving service must deliver enquiries to the organizing team or store them in a monitored inbox. It receives `event`, `name`, `organization`, `phone`, `email`, `topic`, `subject`, and `message` as strings. It must return a 2xx response only after accepting the enquiry. Keep any credential in the server environment; never use a `NEXT_PUBLIC_` variable for the URL.

The exact supplied success message appears only after acceptance. Missing configuration, delivery failures, and timeouts show an error with direct contact alternatives, preserve the entered fields, and never claim receipt. Delivery is not active until the environment variable points to a working receiving service.
