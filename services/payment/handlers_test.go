package main


import (
"net/http"
"net/http/httptest"
"strings"
"testing"
"github.com/gin-gonic/gin"
)


func TestHealth(t *testing.T) {
gin.SetMode(gin.TestMode)
r := gin.Default()
r.GET("/payment/health", func(c *gin.Context) { c.JSON(200, gin.H{"ok": true}) })


req := httptest.NewRequest("GET", "/payment/health", nil)
w := httptest.NewRecorder()
r.ServeHTTP(w, req)


if w.Code != http.StatusOK { t.Fatalf("want 200, got %d", w.Code) }
}


func TestCharge(t *testing.T) {
gin.SetMode(gin.TestMode)
r := gin.Default()
r.POST("/payment/charge", func(c *gin.Context) {
var req struct{ Amount int `json:"amount"` }
if err := c.BindJSON(&req); err != nil { c.JSON(400, gin.H{"error":"bad"}); return }
if req.Amount <= 0 { c.JSON(400, gin.H{"error":"amount"}); return }
c.JSON(200, gin.H{"status":"approved","amount":req.Amount})
})


body := strings.NewReader(`{"amount": 50000}`)
req := httptest.NewRequest("POST", "/payment/charge", body)
req.Header.Set("Content-Type", "application/json")
w := httptest.NewRecorder()
r.ServeHTTP(w, req)


if w.Code != http.StatusOK { t.Fatalf("want 200, got %d", w.Code) }
}