package main

import (
    "github.com/gofiber/fiber/v2"
    "github.com/gofiber/fiber/v2/middleware/cors"
    "multicatalogo-backend/routes"
)

func main() {
    app := fiber.New()

    app.Use(cors.New(cors.Config{
        AllowOrigins: "http://localhost:5173", 
        AllowHeaders: "Origin, Content-Type, Accept",
    }))

    routes.SetupRoutes(app)

    app.Listen(":3000")
}