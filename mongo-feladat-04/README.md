# 4. feladat - Listák közötti kapcsolatok, aggregáció gyakorlása

## Listák közötti kapcsolatok, aggregáció gyakorlása, Embed vs. Referencing

***Ha egy objektum (dokumentum) egy másik dokumentum egyik mezőjében van, akkor beszélhetünk „embed”, beágyazott dokumentumról.***

Használjuk a videoStore adatbázist!<br>

**Hozzunk létre benne egy új „cinemas” listát, amely a következő kikötésekkel rendelkezik:**

- _id: kötelező megadni és csak egész számokból (integer) állhat
- 'name' mező: string lehet, kötelező megadni. Csak számokból, betűkből (angol) és szóközből állhat
- 'movies' mező: 'array' lehet és kötelező megadni
- 'address' mező: objektum lehet és kötelező megadni (az objektumban majd elég egy „city” mezővel játszani)

```
use videoStore

db.createCollection("cinemas", {
  validator: {
    $jsonSchema: {      
      properties: {
        _id: { bsonType: "int"},
        name: { bsonType: "string", pattern: "[A-Za-z0-9 ]"},
        movies: { bsonType: "array"},
        address: {
            bsonType: "object",
            properties: {
                city: { bsonType: "string"}
            }
        }        
      },
      required: ["_id", "name", "movies", "address"]
    }
  }
})
```

**1. Ha még nem tettük meg, a cinema listánk rendelkezzen 3 cinema dokumentummal, és minden cinema dokumentum „játsszon” legalább 3 különböző filmet => adjunk hozzá legalább 3 cinema dokumentum egyes movies listájához 3 db "_id" értéket a movies listából!**

```
db.cinemas.insertMany([
    {_id: NumberInt(1), name: "Blue Cinema", movies: [
        ObjectId("60db4c9c41c25a507101189f"), ObjectId("60db4c9c41c25a50710118a0"), ObjectId("60db4c9c41c25a50710118a1")
    ], address: {city: "Israel"}},
    
    {_id: NumberInt(2), name: "Red Cinema", movies: [
            ObjectId("60db4c9c41c25a50710118a2"), ObjectId("60db4c9c41c25a50710118a3"), ObjectId("60db4c9c41c25a50710118a4")
    ], address: {city: "London"}},
    
    {_id: NumberInt(3), name: "Green Cinema", movies: [
            ObjectId("60db4c9c41c25a50710118a5"), ObjectId("60db4c9c41c25a50710118a6"), ObjectId("60db4c9c41c25a50710118a7")
    ], address: {city: "Budapest"}}    
])
```

**2. Kérdezzük le, hogy az első helyen lévő mozink milyen filmeket játszik, jelenjen meg minden film tulajdonsága!**

```
db.cinemas.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },
  { $limit: 1 }
])
```

**3. Ismételjük meg a fenti lekérdezést úgy, hogy csak a játszott film listája, adatai jelenjenek meg (tipp: „project” operator)!**

```
db.cinemas.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movies"
    }
  },
  { $limit: 1 },
  {$project: { _id: 0, movies: 1 }}  
])
```

**4. Ha még nem tettük meg, készítsünk el a videoStore-ban egy directors listát (a 2. feladat leírása alapján), és minden rendezőhöz rendeljünk 2-3 db filmet a „movies” mezőjükhöz.**

(Korábban megtörtént!)

**5. Kérdezzük le az egyik rendező által rendezett filmek adatait!**

```
db.directors.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "directedMovies"
    }
  },
  { $match: {name: "Steven Spielberg" }},
  {$project: {_id: 0, directedMovies: 1}}
])
```

**6. Kérdezzük le egy másik rendező filmjeit úgy, hogy csak a rendező neve és a filmek „title”-jei, vagyis címei jelennek meg (tipp: $project operátor)!**

<div style="text-align: center; margin: 2rem;">
    <img src="https://files.cdn.thinkific.com/file_uploads/219412/images/36d/ca4/dca/1624374539311.jpg">
</div>

```
db.directors.aggregate([
  {
    $lookup: {
      from: "movies",
      localField: "movies",
      foreignField: "_id",
      as: "movieTitles"
    }
  },
  { $match: {name: "James Cameron" }},
  {$project: {_id: 0, name: 1, "movieTitles.title": 1}}
])
```

**7. Adj pár szavazatot egy-egy filmre ("ratings"), ha még nem tetted meg. Írj egy lekérdezést az aggregáció segítségével, amely visszaadja annak a filmnek a címét, amely a legjobb átlagszavazattal rendelkezik! Két mezőt adjon vissza: "title" és egy új mező: "rateAvg" => pl.: { "title" : "E.T.", "rateAvg" : 4.5 }. Csak aggregációt használj, Cursor metódusok használata nélkül!**

```
db.movies.aggregate([    
  {$project: {_id: 0, title: 1, rateAvg: {$avg: "$ratings"}}},
  {$sort: {rateAvg: -1}},
  {$limit: 1}
])
```