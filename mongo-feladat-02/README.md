# 2. feladat - A videoStore feladat folytatása (update, find, projection)

1-2. feladat:

```
use videoStore
db.directors.insertOne({_id: NumberInt(1), name: "Steven Spielberg", birthYear: NumberInt(1970), movies: []})
db.directors.insertOne({_id: NumberInt(2), name: "Clint Eastwood", birthYear: NumberInt(1952), movies: []})
db.directors.insertOne({_id: NumberInt(3), name: "James Cameron", birthYear: NumberInt(1940), movies: []})
```

4\. feladat:

```
db.directors.find({}).forEach(function(director) { 
    directorID = director._id;
    directorName = director.name;
    directedMovies = db.movies.find({director: directorName}, {_id: 1})
    directedMovies.forEach(function(id) {
        db.directors.updateOne({_id: directorID}, {$push: {movies: id._id}})
    })
})
db.movies.find({}, {director: 1})
```

5\. feladat:

```
db.directors.find().pretty()
```

6\. feladat:

```
db.movies.updateMany({}, {$unset: {director: 0}})
```


7\. feladat:

```
db.movies.find({releaseYear: {$lt: 1990}})
db.movies.find({releaseYear: {$gt: 1999}})
```

8\. feladat:

```
db.movies.find({releaseYear: {$gte: 1980}, releaseYear: {$lt: 1990}})
db.movies.find({$and: [{releaseYear: {$gte: 1980}}, {releaseYear: {$lt: 1990}}]})
```

9\. feladat:

```
db.movies.find({$and: [
  {releaseYear: {$gte: 1980}},
  {releaseYear: {$lt: 1999}},
  {category: "ACTION"}
]})
```

10\. feladat:

```
db.movies.find({category: {$ne: "FANTASY"}})
```


11\. feladat:

```
db.movies.find({
    releaseYear: {$lt: 2000},
    $or: [
        {category: "ROMANTIC"},
        {category: "ACTION"}
    ]},
    {title: 1, category: 1, _id: 0}
)
```

12\. feladat:

```
db.directors.find({}, {name: 1, movies: 1, _id: 0})
```

13\. feladat:

```
db.directors.find({name: "Steven Spielberg"}, {movies: 1, _id: 0})[0].movies.forEach(function(id) {
    db.movies.find({_id: id}, {ratings: 0}).forEach(function(film) {
        print(film)
    })
})
```

## Gyakorlás nagyobb tömegű adatokon

1\. feladat:

```
db.restaurants.find({borough: "Brooklyn"}, {name: 1, address: 1, borough: 1, _id: 0}).pretty()
```

2\. feladat:

```
db.restaurants.find({name: {$regex: /Kitchen/}}, {name: 1, borough: 1, grades: 1, _id: 0}).pretty()
```


3\. feladat:

```
db.restaurants.find({name: {$regex: /Kitchen/}}, {name: 1, borough: 1, grades: 1, _id: 0}).count()
```

4\. feladat:

```
db.restaurants.find({cuisine: {$ne: "American"}, "address.street": "Astoria Boulevard"}, {cuisine: 1, address: 1, _id: 0})
```

5\. feladat:

```
db.restaurants.find({
    cuisine: {$regex: /pizza/i},
    $and: [
        {borough: {$ne: "Brooklyn"}},
        {borough: {$ne: "Queens"}},
        {borough: {$ne: "Manhattan"}}
    ]
})
```

6\. feladat:

```
db.restaurants.find({
    $and: [
        {name: {$regex: /Pizza/}},
        {"address.zipcode": "11369"}
    ]}, {address: 1, name: 1, _id: 0}
)
```

7\. feladat:

```
db.restaurants.find({name: {$regex: /^Tony/}}).count()
```