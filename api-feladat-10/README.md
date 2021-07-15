Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1.  Implementálj JWT autentikációt az alkalmazáshoz a szükséges végpontokkal (login, refresh, logout), egy access token 1 óráig legyen érvényes!
    -   Készíts egy `User` sémát `username`, `password` és `role` mezőkkel, vegyél fel az adatbázisba 1-1 usert `user` és `admin` jogosultsággal!
    -   A végpontok az adatbázisban szereplő felhasználókkal dolgozzanak!
2.  Védd le a `PersonController` által definiált végpontokat, hogy csak autentikált felhasználók hívhassák meg, mindenki más kapjon hibaüzenetet 401-es hibakóddal!
3.  Módosítsd a védelmet úgy, hogy az adatbázisban módosítást végző végpontokat (PUT, POST, DELETE hívások) csak admin felhasználók hívhassák meg!

Opcionális feladat: Jelszót sima szövegként (plain text) tárolni az adatbázisban nagyon rossz ötlet. Módosítsd a jelszó tárolását a [link](https://coderrocketfuel.com/article/store-passwords-in-mongodb-with-node-js-mongoose-and-bcrypt) alapján, hogy biztonságosabbá váljon a tárolás!