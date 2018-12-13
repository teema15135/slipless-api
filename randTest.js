function randMinMax(min, max) {
    return Math.floor((Math.random() * (max-min+1)) + min);
}

for (var i = 0; i < 10; i++)
     console.log(randMinMax(0, 10))
    console.log(Math.random());