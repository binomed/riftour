/* Senseur Hall Effect
Le circuit:
* Le senseur Effet Hall est connecte comme suit:
Pin 1: +5v
Pin 2: Masse/GND
Pin 3: +5V via une resistance pull-up de 10 KOhms
MAIS AUSSI
sur la PIN 2 d'Arduino (pour lecture du senseur)
Pin 11 : led verte
Pin 12 : led jaune
*/
//Declaration des pins utilisees :

const int PinLedVerte = 11;
const int PinLedJaune = 12;
const int hallPin = 2;

int sensorValue;

void setup(){
  Serial.begin(9600); // initialise connexion série à 9600 bauds
  pinMode( PinLedVerte, OUTPUT );
  pinMode( PinLedJaune, OUTPUT );  
  pinMode( hallPin, INPUT );
  Serial.println("ENTREE SETUP");
  digitalWrite(PinLedJaune,HIGH);  
}

void loop() 
{
  // lecture du capteur a Effet Hall
  sensorValue = digitalRead( hallPin );
  
  // senseurValue = HIGH sans aimant
  // senseurValue = LOW quand POLE SUD aimant
 
  if (sensorValue == HIGH)
  { 
    //Pas d'aimant devant le capteur
    digitalWrite(PinLedVerte,LOW);
    //Serial.println("0");
    //Pour eviter d'avoir une autre lecture trop rapprochee
    delay(10);
  }
  else
  {
    //L'aimant passe devant le capteur
    digitalWrite(PinLedJaune,LOW);
    digitalWrite(PinLedVerte,HIGH);
    Serial.println("1");
    //Pour eviter d'avoir une autre lecture trop rapprochee
    delay(10);
    digitalWrite(PinLedVerte,LOW);
    digitalWrite(PinLedJaune,HIGH);
  }  
}
