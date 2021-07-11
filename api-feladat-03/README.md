Folytassuk az egyszerű, működő ESZT (Egészségügyi Szuri Tár) API alkalmazást!

1.  Implementálj egy hibakezelő middleware függvényt, amely kilogolja a valódi hibát a konzolra, majd a kliens számára valamilyen - a hibától független - átlátszó kifogást küld vissza üzenetben. Ha nincs más státuszkód definiálva, akkor adjon 500-as hibakódot.
2.  Végezd el az eddig elkészült végpontok `id` path paramétereinek a validációját. Amennyiben hibásak ezek a paraméterek, a tanult módon add át a hibát a hibakezelő middleware-nek.

A hibakezeléshez használd a `http-errors` csomagot! Teszteld a végpontokat hibás bemenettel, böngésző segítségével!