# Marc vs. Neon Swarm

Ein farbenfrohes, browserbasiertes Arcade-Spiel im Stil von Space Invaders.
Du steuerst das Raumschiff **„Marc“**, weichst gegnerischem Feuer aus und räumst Welle für Welle den Neon-Schwarm ab.

---

## Kurzbeschreibung des Spiels

- Genre: Arcade / Shooter
- Ziel: So viele Gegner wie möglich treffen und einen hohen Score erreichen
- Besonderheiten:
  - Moderner, farbenfroher Look
  - Startscreen und Game-Over-Screen
  - Mehrere Gegner-Wellen
  - Neustart jederzeit nach Game Over

---

## Voraussetzungen

Du brauchst nur:

1. Einen aktuellen Browser (empfohlen: **Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, **Safari**)
2. Die Projektdateien lokal auf deinem Rechner

Optional (empfohlen):
- Python 3 für einen kleinen lokalen Webserver (ist bei vielen Systemen bereits vorhanden)

---

## Startanleitung für Windows

### Variante A (einfach, ohne Installation)

1. Öffne den Ordner `MarcsGame`.
2. Doppelklicke auf `index.html`.
3. Das Spiel öffnet sich im Standard-Browser.

### Variante B (empfohlen für stabile lokale Ausführung)

1. Öffne den Ordner `MarcsGame`.
2. Klicke in die Adresszeile des Ordners, tippe `cmd` und drücke Enter.
3. Starte im Terminal folgenden Befehl:

   ```bash
   python -m http.server 8000
   ```

4. Öffne im Browser:

   ```
   http://localhost:8000
   ```

5. Zum Beenden des Servers im Terminal `Strg + C` drücken.

---

## Startanleitung für macOS

### Variante A (einfach)

1. Öffne den Ordner `MarcsGame` im Finder.
2. Öffne `index.html` per Doppelklick.

### Variante B (empfohlen für stabile lokale Ausführung)

1. Öffne das Terminal.
2. Wechsle in den Projektordner, z. B.:

   ```bash
   cd /Pfad/zu/MarcsGame
   ```

3. Starte den lokalen Server:

   ```bash
   python3 -m http.server 8000
   ```

4. Öffne im Browser:

   ```
   http://localhost:8000
   ```

5. Zum Stoppen des Servers `Ctrl + C` drücken.

---

## Steuerung

- **Links bewegen:** `←` oder `A`
- **Rechts bewegen:** `→` oder `D`
- **Schießen:** `Leertaste`
- **Start/Neustart per Tastatur:** `Enter`

---

## Neustart des Spiels

Wenn du verloren hast:

1. Klicke auf den Button **„Neustart“**
   **oder**
2. Drücke die Taste **Enter**

Dann startet sofort eine neue Runde.

---

## Projektstruktur

```text
MarcsGame/
├─ index.html
├─ styles.css
├─ README.md
└─ src/
   ├─ constants.js   # Spielkonstanten und Balancing-Werte
   ├─ input.js       # Tastatur-Eingaben
   ├─ entities.js    # Spielobjekte (Spieler, Gegner, Schüsse, Sterne)
   ├─ state.js       # Spielzustand, Kollisionen, Wellen, Score
   ├─ renderer.js    # Rendering auf dem Canvas
   └─ game.js        # Initialisierung, UI-Logik, Haupt-Game-Loop
```

---

## Fehlerbehebung

### 1) Das Spiel startet nicht
- Prüfe, ob du wirklich `index.html` im Browser geöffnet hast.
- Teste einen anderen Browser (z. B. Chrome oder Edge).

### 2) Schwarzer Bildschirm / nichts passiert
- Lade die Seite neu (`F5` bzw. `Cmd + R`).
- Öffne die Browser-Konsole (F12) und prüfe auf Fehlermeldungen.

### 3) Steuerung reagiert nicht
- Klicke einmal in das Browserfenster und versuche es erneut.
- Prüfe, ob eine andere App Tastatureingaben blockiert.

### 4) Port 8000 ist schon belegt
Starte den Server mit einem anderen Port:

```bash
python -m http.server 8080
```
oder unter macOS:
```bash
python3 -m http.server 8080
```

Dann im Browser `http://localhost:8080` aufrufen.

---

Viel Spaß beim Spielen! 🚀
