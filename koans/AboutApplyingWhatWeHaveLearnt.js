var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      
      var noMush = function (x)
      {
        return x !== "mushrooms"; 
      };
      var noMush1 = function (x)
      {
        return _(x.ingredients).all(noMush) === true; 
      };
      var noNuts = function (x)
      {
        return x.containsNuts === false; 
      };

      productsICanEat = _(products).filter(noNuts);
      productsICanEat = _(productsICanEat).filter(noMush1);
      /* solve using filter() & all() / any() */

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    
    var arr = _.range(1000);
    
    
    var func = function(x) 
    { 
      if (x % 3 === 0 || x % 5 === 0) 
        return x;  
      return 0;
    }

    var sum = _(arr).chain().map( func ).reduce(function (sum, x) { return sum + x }).value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

  var funcSetIngred = function(ingr)
  {
    ingredientCount[ingr]= (ingredientCount[ingr] || 0) + 1;
  }

  var funcMap = function(prod) 
    { 
      return prod.ingredients;     
    }

  _(products).chain().map(funcMap).flatten().forEach(funcSetIngred);

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  var isPrime = function(nr)
    {
      
      for(var i = 2; i <= Math.sqrt(nr); i+=1)
      {
        if(nr%i === 0)
          return false;
      }

      return true;
    }


  it("should find the largest prime factor of a composite number", function () 
  {
    var input = 660;
    var output = 0;
    
    for(var i = 2; i < input; i+=1)
    {
      if(input%i === 0)
      {
        if(isPrime(i))
        {
          output = i;
        }
      }  
    }

    expect(output).toBe(11);
  });

 it("should find the 10001st prime", function () {

    var output = 2;
    var i = 0;
    while(i!=10001)
    {
      if(isPrime(output))
      {
        i+=1;
      }
      output+=1;
    }
    expect(output-1).toBe(104743);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      var max = 20;
      var arr = _.range(2, max+1);
      var f1 = function (x) 
      {
        var res = x;
        var pow = 1;
        while(res < max)
        {
          res = Math.pow(x, pow);  
          pow +=1;
        }
        
        return Math.pow(x, pow-2);
      };

      var output = _(arr).filter(isPrime).map(f1).reduce(function(x, y){return x * y}, 1);
    
      expect(output).toBe(232792560);    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var a = 2;
    var b = 3;
    expect(2*a*b).toBe((a+b)*(a+b) - a*a - b*b);
  });
/*
  it("should find the largest palindrome made from the product of two 3 digit numbers", function () 
  {
    var input = 77;
    var output = undefined;
    expect(output).toBe(997799);    
  });
 */
  
});
