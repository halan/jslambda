# jslambda
An experimental parser of calculus lambda made for study purpose

To see it running you should compile the parser first:
```
npm run compile
```

Then you can try things like that:
```
cat example.lambda | ./index.js
# false
```

That dialect of calculus lambda is strongly based on the book "An Introduction to Functional Programming Through Lambda Calculus". So I added support to "def" statements and I also want implement a way to import external files where I'll put common functions like numbers, booleans and basic logic.
