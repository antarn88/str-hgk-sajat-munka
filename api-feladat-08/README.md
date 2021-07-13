Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1.  Készítsd el a `Vaccine` sémát, rendelkezzen a következő mezőkkel:
    -   `id`: egyedi azonosító (ObjectId)
    -   `name`: oltás neve (string)
    -   `efficiency`: oltás hatékonysága, 1-100 közötti szám (number)
2.  Módosítsd a `Person` sémát: a `vaccine` mező egy nested objektum legyen egy `vaccine` és `count` property-vel:
    -   `count`: egy szám, hogy az adott személy hány dózist kapott meg
    -   `vaccine`: referencia (id) egy `Vaccine` típusú dokumentumra
3.  Módosítsd a `PersonService` (és szükség esetén a `PersonController`) osztályt, hogy továbbra is megfelelően működjön!