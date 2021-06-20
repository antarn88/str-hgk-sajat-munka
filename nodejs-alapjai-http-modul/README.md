# Gyakorló feladat - HTTP modul

Készíts egy http szervert! A szerver a 8080-as port forgalmát figyelje! Készíts 3 html fájlt:

  - index
  - about
  - contact

Minden alkalommal, amikor beérkezik egy kérés, azt logold a konzolra az alábbi formátumban:

  - Date: a kérés pontos ideje magyar lokalizáció szerint formázva
  - Url: a kért url
  - Method: a http metódus

  Pl.: Date: 2021.04.01 Url: /about Method: GET

A logra saját függvényt írj!

A ```controller```, ```views```, ```routers``` külön mappákban/fájlokban legyenek!