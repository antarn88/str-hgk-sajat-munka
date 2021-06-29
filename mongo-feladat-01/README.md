# 1. feladat - MongoDB alapfeladatok terminálban (Mongo shell-ben)

Elsőként olvasd végig az összes pontot!

**1. Készíts egy videoStore nevű MongoDB adatbázist!**

```
use videoStore
```

**2. - 3. Hozz létre benne egy movies listát! Ments el benne 10 új filmet (save()) a következő mezőkkel:**

   - _id: legyen generált, ObjectId
   - title: egy-egy kedvenc film címe, szöveges tartalom
   - category: szöveges tartalom (3 típus lehet: fantasy, action, romantic) => legyenek vegyesen a filmek, amennyire lehet
   - director: szöveges tartalom, 3 rendező közül vegyesen szétválogatva => Steven Spielberg, Clint Eastwood, James Cameron

```
db.movies.save([
    {title: "Jákob Rabbi Kalandjai", category: "action", director: "James Cameron"},
    {title: "Hupikék Törpikék", category: "fantasy", director: "Clint Eastwood"},
    {title: "Egy roma élete", category: "romantic", director: "James Cameron"},
    {title: "Kincsvadászok", category: "romantic", director: "Steven Spielberg"},
    {title: "Álomépítők", category: "fantasy", director: "Steven Spielberg"},
    {title: "Tom és Jerry", category: "action", director: "Clint Eastwood"},
    {title: "A légy", category: "romantic", director: "Steven Spielberg"},
    {title: "Semmit a szemnek", category: "fantasy", director: "James Cameron"},
    {title: "Herkules", category: "action", director: "Clint Eastwood"},
    {title: "Banános Joe", category: "fantasy", director: "Steven Spielberg"}
])
```

**4. Frissítsd a listádat (updateMany), mindenki kapjon egy „ratings” mezőt, amely egy üres listát tartalmaz (1-5 ig lehet benne tárolni a szavazatokat)!**

```
db.movies.updateMany({}, {$set: {ratings: []}})
```

**5. Adj 3 különböző filmre legalább 2 különböző szavazatot (használd a $push operátort)!**

```
db.movies.updateOne({title: "A légy"}, {$push: {ratings: { $each: [NumberInt(5), NumberInt(4)] }}})
db.movies.updateOne({title: "Egy roma élete"}, {$push: {ratings: { $each: [NumberInt(3), NumberInt(1)] }}})
db.movies.updateOne({title: "Herkules"}, {$push: {ratings: { $each: [NumberInt(4), NumberInt(3)] }}})
```

**6. Adj hozzá minden filmhez egy „releaseYear” (megjelenés éve) mezőt: kezdetnek állíts be egy tetszőleges évet minden filmnek (pl.: 2000)!**

```
db.movies.updateMany({}, {$set: {releaseYear: NumberInt(2000)}})
```

**7. Írd át category típusonként csupa nagybetűre a kategóriákat (pl.: action ==> ACTION legyen mindenhol). Használd az updateMany parancsot!**

```
db.movies.find({}).forEach(function(movie) {
    db.movies.updateMany(
        {"_id": movie._id },
        {$set: {"category": movie.category.toUpperCase()}}
    );
});
```

**8. Kérdezd le az adatokat, hogy ellenőrizd, sikeresek lettek-e a frissítések! Most így kellene kinéznie a listának:**

<div style="text-align: center; margin: 2rem;">
    <img src="https://files.cdn.thinkific.com/file_uploads/219412/images/294/ead/258/1624356077337.jpg">
</div>

```
db.movies.find({})
```

**9. Kicsit algoritmizáljunk! Nézd meg, hogy melyik könyvtárban állsz a pwd() parancs segítségével. Hozz létre egy .js kiterjesztésű szöveges fájlt az adott könyvtárban! (Használhatsz majd abszolút elérési utat is később.) Bármilyen szerkesztő, IDEA megfelelő a szerkesztésre. Készíts el benne egy függvényt (ne felejtsd el meghívni a fájl végén), amely tartalmazzon egy listát benne a te filmjeid címeivel (figyelj a pontos címek megadására). Kiindulásként egy kis „segédkép”:**


<div style="text-align: center; margin: 2rem;">
    <img src="https://files.cdn.thinkific.com/file_uploads/219412/images/1d9/667/0c5/1624356077397.jpg">
</div>

**10. Folytasd a script írását! Cél, hogy mindegyik film különböző éveket kapjon az adatbázisban, de a filmek hármasával egy évtizedben legyenek. Törekedj a funkcionális egyszerű kódra. Futtasd le a Mongo shell-ben a scriptet a load() parancs segítségével. Utána kérdezd le az adatbázisodat ellenőrizni az eredményt. Íme egy lehetséges elvárt eredmény:**

<div style="text-align: center; margin: 2rem;">
    <img src="https://files.cdn.thinkific.com/file_uploads/219412/images/daa/820/af9/1624356077463.jpg">
</div>

A ```setMoviesYear.js``` fájl tartalma:

```javascript
const getRandomYear = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const updateMovies = (skip, firstYear, lastYear) => {
  db.movies.find({}).skip(skip).limit(3).forEach(function (movie) {
    id = movie._id
    db.movies.updateOne({_id: id }, {$set: {releaseYear: NumberInt(getRandomYear(firstYear, lastYear)) } })
  });
};

function setYearToMovies() {
  const titles = [
    'Jákob Rabbi Kalandjai',
    'Hupikék Törpikék',
    'Egy roma élete',
    'Kincsvadászok',
    'Álomépítők',
    'Tom és Jerry',
    'A légy',
    'Semmit a, szemnek',
    'Herkules',
    'Banános Joe'
  ];

  updateMovies(0, 2000, 2009);
  updateMovies(3, 1990, 1999);
  updateMovies(6, 1980, 1989);
  updateMovies(9, 1970, 1979);
}

setYearToMovies();
```

A terminálkimenet:

```javascript
{
        "_id" : ObjectId("60db4c9c41c25a507101189f"),
        "title" : "Jákob Rabbi Kalandjai",
        "category" : "ACTION",
        "director" : "James Cameron",
        "ratings" : [ ],
        "releaseYear" : 2003
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a0"),
        "title" : "Hupikék Törpikék",
        "category" : "FANTASY",
        "director" : "Clint Eastwood",
        "ratings" : [ ],
        "releaseYear" : 2000
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a1"),
        "title" : "Egy roma élete",
        "category" : "ROMANTIC",
        "director" : "James Cameron",
        "ratings" : [
                3,
                1
        ],
        "releaseYear" : 2006
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a2"),
        "title" : "Kincsvadászok",
        "category" : "ROMANTIC",
        "director" : "Steven Spielberg",
        "ratings" : [ ],
        "releaseYear" : 1998
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a3"),
        "title" : "Álomépítők",
        "category" : "FANTASY",
        "director" : "Steven Spielberg",
        "ratings" : [ ],
        "releaseYear" : 1996
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a4"),
        "title" : "Tom és Jerry",
        "category" : "ACTION",
        "director" : "Clint Eastwood",
        "ratings" : [ ],
        "releaseYear" : 1991
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a5"),
        "title" : "A légy",
        "category" : "ROMANTIC",
        "director" : "Steven Spielberg",
        "ratings" : [
                5,
                4
        ],
        "releaseYear" : 1984
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a6"),
        "title" : "Semmit a szemnek",
        "category" : "FANTASY",
        "director" : "James Cameron",
        "ratings" : [ ],
        "releaseYear" : 1981
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a7"),
        "title" : "Herkules",
        "category" : "ACTION",
        "director" : "Clint Eastwood",
        "ratings" : [
                4,
                3
        ],
        "releaseYear" : 1980
}
{
        "_id" : ObjectId("60db4c9c41c25a50710118a8"),
        "title" : "Banános Joe",
        "category" : "FANTASY",
        "director" : "Steven Spielberg",
        "ratings" : [ ],
        "releaseYear" : 1972
}
```