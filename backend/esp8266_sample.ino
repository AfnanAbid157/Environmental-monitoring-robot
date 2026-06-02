#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT11
#define MQ135PIN A0

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "http://YOUR_SERVER_IP:5000/api/sensors/data";

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  dht.begin();
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected!");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int airQuality = analogRead(MQ135PIN);
    
    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read from DHT sensor!");
      return;
    }
    
    WiFiClient client;
    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    String jsonPayload = "{\"temperature\":" + String(t) + ",\"humidity\":" + String(h) + ",\"airQuality\":" + String(airQuality) + ",\"deviceId\":\"ESP8266-01\"}";
    
    int httpResponseCode = http.POST(jsonPayload);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    
    http.end();
  }
  
  delay(5000); // Send data every 5 seconds
}
