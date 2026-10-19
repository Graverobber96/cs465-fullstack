Travlr Getaways — Full Stack Web Application
Project Overview
Travlr Getaways is a full-stack travel application developed for SNHU's CS 465 course. It includes a customer-facing website built with Express and Handlebars, an Angular single-page application (SPA) for administration, a Node.js/Express REST API, and a MongoDB database accessed through Mongoose. The administrative interface supports authenticated trip management.
Architecture
How did the frontend approaches compare?

The customer-facing portion of Travlr Getaways uses Express to serve HTML pages rendered with Handlebars templates. This approach is useful for presenting travel information because the server assembles the page before sending it to the browser. JavaScript adds behavior and supports communication between application components. The administrative side uses an Angular single-page application (SPA), which updates views without requiring a full page reload for every interaction. Angular components and services organize the administrative interface, while the Express/Handlebars site focuses on straightforward customer-facing pages. Working with both approaches helped me understand the trade-off between server-rendered pages and a more interactive client-side application.

Why use a NoSQL MongoDB database?

MongoDB stores information as flexible, document-oriented records that map naturally to the JSON data exchanged through the REST API. For Travlr Getaways, trip records include fields such as the trip name, description, and price. Using MongoDB with Mongoose allowed me to define a schema for those records, query the database, and support changes to travel listings without building a relational table structure. Mongoose also provided a consistent way to work with the stored data from the Node.js backend.
Functionality
How are JSON and JavaScript different, and how does JSON connect the frontend and backend?

JavaScript is a programming language used to implement application logic; JSON (JavaScript Object Notation) is a text-based format for representing and exchanging data. JSON does not execute application logic. In Travlr Getaways, the REST API returns trip data in JSON format. The customer-facing application can retrieve those records for display, and the Angular administration application uses API responses to show and update trip information. JSON provides a common data format between the browser-facing applications, Express API, and database layer.

What did I refactor, and what are the benefits of reusable UI components?

During development, I moved customer-facing pages toward an Express MVC structure and used Handlebars templates instead of relying solely on static HTML. I also moved trip information into MongoDB and exposed it through API endpoints rather than maintaining the same content manually in separate pages. On the administrative side, Angular components and services separated interface behavior from data access. Reusable UI components reduce duplicated code, make layouts more consistent, simplify maintenance, and allow changes to be applied in one place rather than across many pages.
Testing
What did I learn about methods, endpoints, and security?

An endpoint is a URL through which a client interacts with a particular API resource, while an HTTP method specifies the requested operation. For example, GET retrieves trip records, POST creates records, PUT updates them, and DELETE removes them. Testing must confirm not only that the expected data is returned or changed, but also that the API handles invalid or unauthorized requests correctly. In this project, I tested trip retrieval and administrative editing, including verifying that an edited trip price persisted in MongoDB. Adding JSON Web Token (JWT) authentication required testing both successful authorized requests and rejected requests without valid credentials. The protected endpoints returned HTTP 401 for unauthorized requests, demonstrating why security testing is an essential part of full-stack development.
Reflection
How did this course support my professional goals?

CS 465 strengthened my ability to develop and troubleshoot a complete web application rather than working on isolated frontend or backend exercises. I gained practical experience with the MEAN stack, Express MVC, Handlebars, Angular, REST APIs, MongoDB, Mongoose, Git, and authentication. I also improved my ability to trace how information moves from a user interface through an API to a database and back. These skills support my goal of moving into a technology career, particularly roles involving user experience, accessibility-minded design, and collaborative software development. The project gives me a concrete example of technical problem-solving and full-stack work to discuss with future employers.
Running the Project
This repository contains the source code for the Travlr Getaways application. To run it locally, install the project dependencies, configure the required environment variables (including a JWT secret), start MongoDB, and run the Express backend and Angular administrative application according to their respective project configurations. Do not commit a real .env file or credentials to the repository.
