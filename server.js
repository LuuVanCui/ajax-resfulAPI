var express = require('express');
var app = express();

var products = [
    {
        id: 1,
        name: 'Redmi',
    },
    {
        id: 2,
        name: 'Iphone',
    },
];

var currentId = 2;

var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

// using bodyparser
app.use(express.json());

app.get('/products', (req, res) => {
    res.send({ products });
});

app.post('/products', (req, res) => {
    var productName = req.body.name;
    currentId++;
    
    products.push({
        id: currentId,
        name: productName,
    });

    res.send('Successfully created product!');
});

app.put('/products/:id', (req, res) => {
    var id = req.params.id;
    var newName = req.body.newName;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            product.name = newName;
        }
    });
    res.send('Successfully updated product!');
});

app.delete('/products/:id', (req, res) => {
    var id = req.params.id;

    var found = false;

    products.forEach(function(product, index) {
        if (!found && product.id === Number(id)) {
            products.splice(index, 1);
        }
    });

    res.send('Successfully deleted product!');
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});