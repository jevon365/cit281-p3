
const fs = require("fs");
const fastify = require("fastify")();
const coinCount = require('./p3-module.js').coinCount;

fastify.get("/",(req,reply) => {
    fs.readFile(`${__dirname}/index.html`,(err,data)=>{
        if (err) {
            reply.code(500).send(err);
            return;
        }
        reply 
            .code(200)
            .header("Content-Type", "text/html; charset=utf-8")
            .send(data);
    });
});

fastify.get('/coin', (req,reply)=> {
    const { denom = 0, count = 0}=req.query;
    const coinValue = coinCount({ denom: Number(denom), count: Number(count) });
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Value of ${count} of ${denom} is ${coinValue}</h2><br /><a href="/">Home</a>`);
    
});

fastify.get('/coins', (req,reply)=> {
    const {option}=req.query;
    let coinValue = 0;
    switch(option){
        case "1":
            coinCount({ denom: 5, count: 3 }, { denom: 10, count: 2 });   // option = 1
            break;
        case "2":
            //coinCount(...coins);    // option = 2
            const coins = [
                { denom: 5, count: 3 },
                { denom: 10, count: 2 },
                { denom: 25, count: 1 },
              ];
              coinValue = coinCount(...coins);
            break;
        case "3" :
            coinCount(coins);    // Extra credit: option = 3
            break;

        default:
            break;
    }
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send(`<h2>Option ${option} value is ${coinValue}</h2><br /><a href="/">Home</a>`);
    
})


const listenIP = "localhost";
const listenPort = 8080;

fastify.listen(listenPort, listenIP, (err, address)=> {
    if (err){
        console.log(err);
        process.exit(1);
    }
    console.log(`server listening on ${address}`);
});

