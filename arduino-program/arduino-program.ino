#include <DHT.h>
#include <troyka-imu.h>
#include <Wire.h>
#include <LiquidCrystal.h>

#define LOUDNESS_SENSOR_PIN A0
#define MEASURE_FREQUENCE 5
#define MEASURE_TIME 50

DHT dht(7, DHT11);
Barometer barometer;

// Инициализируем объект-экран, передаём использованные 
// для подключения контакты на Arduino в порядке:
// RS, E, DB4, DB5, DB6, DB7
LiquidCrystal lcd(4, 5, 10, 11, 12, 13);

String temp;
String humidity;
String pressure;

struct Measurments {
  String temp;
  String humid;
  String pressure;
  String noise;
};

void setup() 
{
    lcd.begin(20, 4);
    dht.begin();
    barometer.begin();
    Serial.begin(9600);
}
 
void loop() 
{
  Measurments m = printTempAndHumid();
  m.pressure = printPressure();
  m.noise = printNoise();

  Serial.println("<" + m.temp + "C><" + m.humid + "%><" + m.pressure + "mbar><" + m.noise + "noise>");
  
  delay(10000);
}

String printNoise() {
  unsigned int sum = 0;

  for (int i = 0; i < MEASURE_FREQUENCE; i++) {
    sum += getMinMaxLevels();
  }

  return String(sum / MEASURE_FREQUENCE);
}

unsigned long getMinMaxLevels() {
  unsigned long sample;
  unsigned long max_val = 0;
  unsigned long min_val = 1024;
  unsigned long startMillis = millis();
  
  while(millis() - startMillis < MEASURE_TIME) {
      sample = analogRead(LOUDNESS_SENSOR_PIN);
      
      if (sample > 1024) {
        continue;
      }

      if (max_val < sample) {
        max_val = sample;
      }

      if (min_val > sample) {
        min_val = sample;
      }
  }

  return max_val - min_val;
}

String printPressure() {
  String pressure = String((int)barometer.readPressureMillibars());
  
  lcd.setCursor(0, 2);
  lcd.print(String("Pressure = " + pressure + " mbar"));

  lcd.setCursor(0, 3);
  lcd.print("normal 999-1013 mbar");

  return pressure;
}

struct Measurments printTempAndHumid() {
  struct Measurments m;
  
    m.temp = String(int(dht.readTemperature()));
    m.humid = String(int(dht.readHumidity()));

    if (m.temp == '\0' || m.humid == '\0') {
        lcd.setCursor(0, 0);
        lcd.print("DHT11 error");
        return m;
    }
  
    // выводим показания влажности и температуры
    temp = String("Temperature = " + m.temp + "C");
    lcd.setCursor(0, 0);
    lcd.print(temp);

    humidity = String("Humidity = " + m.humid + "%");
    lcd.setCursor(0, 1);
    lcd.print(humidity);

  return m;
  
}

