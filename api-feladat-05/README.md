Módosítsuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást úgy, hogy MongoDB-t használjon az adatok tárolására.

1.  Hozz létre egy új MongoDB adatbázist! (használhatsz Atlas-t vagy akár lokális MongoDB példányt is)
2.  Telepítsd a szükséges csomagokat, készítsd el a `Person` sémát!
3.  Módosítsd a tanult módon az alkalmazást, hogy az a MongoDB-hez csatlakozzon, töröld a JSON adatbázist!
4.  Módosítsd a végpontokat, hogy az adatbázissal dolgozzanak!
    -   Tipp 1: [countDocuments()](https://docs.mongodb.com/manual/reference/method/db.collection.countDocuments/) elemek számolásához
    -   Tipp 2: [$exists](https://docs.mongodb.com/manual/reference/operator/query/exists/) operátor