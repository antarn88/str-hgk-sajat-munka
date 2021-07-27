Gyakorlófeladat
---------------

Készíts egy egyszerű, Angular alapú alkalmazást. Az alkalmazás célja, hogy ki- és bejelentkezést nyújtson a felhasználóknak.

1.  Oldalak:
    -   home: a felhasználók bejelentkezés nélkül is elérhetik
    -   editor: a felhasználók csak editor vagy magasabb jogosultsággal érhetik el
    -   admin: a felhasználók csak admin jogosultsággal érhetik el
    -   login: minden felhasználó elérheti, a bejelentkezést valósítja meg. Sikeres belépés esetén a home oldalra irányít át.

2.  Autentikáció és autorizáció megvalósítása: 
    -   Az autentikációhoz a json-server-auth NodeJS modult használd.
    -   Az azonosítás json-webtoken segítségével történjen.
    -   A tokenek ellenőrzésére és a kérésekhez csatolására használj interceptor-t.
    -   Hozz létre egy forbidden oldalt, ahol üzenetben tájékoztatod a felhasználót arról, hogy nincs joga megtekinteni a kért oldalt.
    -   Az egyes url-ek védelmét guard-okkal oldd meg, ezek irányítsák át a felhasználót a forbidden oldalra megfelelő jogosultság hiányában.
    -   A fejlécben a belépett felhasználóknak jelenjen meg egy logout gomb, amelyre kattintva a rendszer kijelentkezteti őket.

3.  Az alkalmazás felépítése:
    -   Egyszerű felépítést használj, a fejlécben legyenek a kattintható linkek a navigációhoz, szintén innen legyen elérhető a login-oldal is.
    -   Használj natív Bootstrap layout-ot, a hangsúly nem a megjelenésen, hanem a login/logout helyes működésén van.
    -   Az egyes oldalak tartalma nem lényeges, csak a tesztelés segítik. Kivétel a login oldal, természetesen itt egy belépő űrlapot kell megjeleníteni.

Segítség
--------

-   Az autentikációt és autorizációt a következő osztályok segítik: AuthService, JwtInterceptorService, EditorGuard, AdminGuard.
-   Az egyes guard-okat, ha készen vannak, akkor az AppRoutingModule-ban vedd fel, a videókban bemutatott módon, a canActivate tömbben.
-   Ebben a sorrendben dolgozz: komponensek -> routing -> authService -> jwtInterceptorService -> guard-ok.