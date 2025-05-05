Aplikace – výměna služeb za kredity

Tato aplikace umožňuje lidem nabízet a vykonávat služby výměnou za kredity, nikoli peníze. Kredity získané za jednu službu lze využít na zaplacení jiné.

Technologie 
Frontend: JavaScript (spouští se pomocí ```npm run dev```)
Backend: Bun + SQLite (better-sqlite3, spouští se pomocí ```bun run server.js```)



Jak to funguje

* Uživatel přidá nabídku služby (např. oprava kola za 30 kreditů).

* Jiný uživatel ji přijme a kredity se dočasně uloží do escrowu.

* Po dokončení služby obě strany potvrdí splnění.

* Kredity se převedou poskytovateli služby.

* Pokud vznikne spor, vývojářský tým rozhodne na základě důkazů.
  

Klíčové vlastnosti

Přihlášení a registrace s JWT + cookies

Kreditní systém s escrowem a potvrzením úkolů
