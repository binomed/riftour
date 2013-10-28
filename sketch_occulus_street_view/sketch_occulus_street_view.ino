/* Senseur � Hall Effect 
  Le circuit:
 * Le senseur Effet Hall est connect� comme suit:
     Pin 1: +5v
     Pin 2: Masse/GND
     Pin 3: +5V via une r�sistance pull-up de 10 KOhms
            MAIS AUSSI
            sur la PIN 2 d'Arduino (pour lecture du senseur)
 */

const int ledPin = 11; 
const int hallPin = 2;

int sensorValue; 

void setup(){
  Serial.begin(9600); // initialise connexion série à 115200 bauds
  pinMode( ledPin, OUTPUT ); 
  pinMode( hallPin, INPUT );
  Serial.println("ENTREE SETUP");
    
}

void loop() {
  // lecture du capteur a Effet Hall
  sensorValue = digitalRead( hallPin );
  
  // senseurValue = HIGH sans aimant
  // senseurValue = LOW  quand POLE SUD aimant
  //sensorValue = not( sensorValue );
  
  // Allumer eteindre la LED
  digitalWrite( ledPin, sensorValue );
  
  if (sensorValue == HIGH)
  {//On a fait un tour :
  //Pas d'aimant
    digitalWrite(ledPin,LOW);
//	Serial.println("0");
	//Pour eviter d'avoir une autre lecture trop rapproch�e
	delay(10);
  }
  else
  {
  digitalWrite(ledPin,HIGH);
  Serial.println("1");
	//Pour eviter d'avoir une autre lecture trop rapproch�e
	delay(10);
  digitalWrite(ledPin,LOW);

}
  
  
}
