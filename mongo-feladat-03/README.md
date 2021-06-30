# 3. feladat - Cursor függvényeinek gyakorlása videoStore adatbázissal

## Cursor függvényeinek gyakorlása videoStore adatbázissal

1\. feladat:

```
use videoStore
```

2\. feladat:

```
db.getCollection('movies').find({
    $or: [
       {category: "ACTION"},
       {category: "ROMANTIC"},
    ]
}).count()
```

3\. feladat:

```
fantasyFilms = db.movies.find({
    category: "FANTASY"
}, {title: 1, category: 1, _id: 0})
```

4\. feladat:

```
db.movies.find({}).forEach(function(movie) {
    line = movie.title + ": " + movie.category
    print(line)
})
```

5\. feladat:

```
db.movies.find({}, {title: 1, _id: 0}).sort({_id: -1})
```

6\. feladat:

```
db.movies.find({}, {title: 1, category: 1, releaseYear: 1, _id: 0})
    .sort({category: 1, releaseYear: -1})
```

7\. feladat:

```
db.movies.find({category: "ACTION"}).sort({releaseYear: -1}).limit(1)
```

8\. feladat:

```
db.movies.find({}, {title: 1, releaseYear: 1, _id: 0}).sort({releaseYear: 1}).limit(2)
```

9\. feladat:

```
db.movies.find({category: "ROMANTIC"}, {title: 1, releaseYear: 1, _id: 0}).skip(1).limit(1)
```

10\. feladat:

A ```paging.js``` fájl tartalma:

```javascript
function countFilms() {
  const filmsCount = db.movies.find({}).count();

  for (let i = 0; i < filmsCount; i += 3) {
    try {
      const film1 = db.movies.find({}, { title: 1, category: 1, _id: 0 }).limit(1).skip(i);
      const film2 = db.movies.find({}, { title: 1, category: 1, _id: 0 }).limit(1).skip(i + 1);
      const film3 = db.movies.find({}, { title: 1, category: 1, _id: 0 }).limit(1).skip(i + 2);
      print(film1[0].title, ":", film1[0].category.toLowerCase(), "movie");
      print(film2[0].title, ":", film1[0].category.toLowerCase(), "movie");
      print(film3[0].title, ":", film1[0].category.toLowerCase(), "movie");
      print("--page over--")
    }
    catch (e) {
    }
  }
}

countFilms();
```

## Gyakorlás a „restaurants” listán

2\. feladat:

```
db.restaurants.find({borough: "Queens"}, {name: 1, _id: 0}).sort({name: -1})
```

3\. feladat:

```
db.restaurants.find({
    $and: [
        {borough: "Brooklyn"},
        {cuisine: "Mexican"}
    ]
}, {name: 1, address: 1, _id: 0}).sort({name: 1})
```

4\. feladat:

```
db.restaurants.find({
    $and: [
        {borough: "Queens"},
        {cuisine: {$regex: /italian/i}},
        {"address.street": {$regex: /Boulevard/i}},
    ]
}, {name: 1, _id: 0})
```

5\. feladat:

```
db.restaurants.find({
    $and: [
        {cuisine: "Italian"},
        {borough: "Manhattan"}
    ]
}).count()
```

6\. feladat:

```
db.restaurants.find({
    $and: [
        {borough: "Bronx"},
        {cuisine: "Irish"}
    ]
}, {name: 1, cuisine: 1, _id: 0}).sort({name: -1})
```

7\. feladat:

```
db.restaurants.find({
    $and: [
        {borough: "Queens"},
        {"address.street": "Queens Boulevard"},
        {"address.building": {$not: {$regex: /-/}}},
    ]
}, {name: 1, address: 1, _id: 0}).sort({"address.building": 1})
```

8\. feladat:

```
db.restaurants.find({
    borough: "Bronx",    
    $and: [
        {cuisine: {$not: {$regex: /chinese/i}}},
        {cuisine: {$not: {$regex: /italian/i}}}
    ]
})
```

9\. feladat:

```
db.restaurants.find({
    borough: "Queens",
}, {name: 1, cuisine: 1, address: 1, _id: 0}).sort({"address.zipcode": -1}).limit(1)
```

10\. feladat:

```
db.restaurants.find({},
    {name: 1, address: 1, _id: 0}).sort({"address.zipcode": -1}).skip(5).limit(1)
```

11\. feladat:

```
db.restaurants.distinct("cuisine", {borough: "Manhattan"})
```

```
db.restaurants.aggregate([      
    {$match: {borough: "Bronx", cuisine: "American" }},
    {$project: {_id: 1, borough: 1, cuisine: 1, name: 1, grades: 1, countOfGrades: {$size : "$grades"}}},
    {$unset: "grades"}
])
```