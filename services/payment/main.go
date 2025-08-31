package main

import (
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.GET("/payment/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"ok": true})
	})

	type ChargeReq struct{ Amount int `json:"amount"` }

	r.POST("/payment/charge", func(c *gin.Context) {
		var body ChargeReq
		if err := c.BindJSON(&body); err != nil || body.Amount <= 0 {
			c.JSON(400, gin.H{"error": "invalid amount"})
			return
		}
		c.JSON(200, gin.H{"status": "approved", "amount": body.Amount})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}
	_ = r.Run(":" + port)
}
