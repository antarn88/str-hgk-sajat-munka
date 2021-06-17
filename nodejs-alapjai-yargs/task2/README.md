# Gyakorló feladat - yargs modul

Egy parancssoros alkalmazást kell készítened a yargs harmadik féltől származó package segítségével! Az alkalmazás egy webshop termékeiről készít kimutatásokat. A ```products.json``` file tartalmazza a termékek adatait. Az alábbi adatok vannak a termékekről megadva:

  - ```id```: a termék azonosítója
  - ```name```: a termék neve
  - ```price```: a termék ára
  - ```count```: a termék darabszáma

Az alkalmazás az alábbi parancssoros parancsokat fogadja:

  - ```sum``` : A parancs kimenete az összes termék összes ára. Tehát mindegyik terméknél az árat és a darabszámot össze kell szorozni, majd termékenként összeadni.
  - ```avg```: A parancs kimenete az összes termék árának átlaga egy darabra számolva.
  - ```lessthan``` : A parancs kilistázza a konzolra azokat a termékeket, amelyekből a paraméterként megadott darabszámnál kevesebb elérhető. Egy paramétert vár kötelezően:
  
    - paraméter neve: count
    - paraméter rövidítés: c
    - kötelező: igen
    - típusa: szám

A fájl beolvasása aszinkron legyen!