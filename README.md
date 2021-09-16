## Bewerber-Management-System

### Das Projekt wurde mit create-react-app initialisiert und anschließend  react-bootstrap installiert. In der index.html wurde auch ein Link für Bootstrap hinzugefügt.

#### Alle Bewerber/Candidates sind jetzt in nur einem Array angelegt. Das ermöglicht das Arbeiten mit filter(), um somit die Bewerber in verschiedene Spalten aufzuteilen. In App.js kann im phases-Object jederzeit eine neue Phase hinzugefügt werden. 

#### Ich habe viele States von App.js in andere Components verlegt, das den Code um einiges leaner gemacht hat. Wo ich vorher nur eine Nummer/String verwendet habe, hat nun Enum einen Platz gefunden. 

#### App speichert nun das Array im localstorage und läd es per useEffect. 

##### Nächste Schritte/Ideen: Form-Validation / Form in neue Component, da diese Code teilen / Responsive für mehrere Spalten / Redux
