# **Cryptocompare micro-service**

## **Description**

Micro-service collect data from cryptocompare using its API:

`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD,EUR​`

Available values for query:

```
"fsyms" => ["BTC", "XRP", "ETH", "BCH", "EOS", "LTC", "XMR", "DASH"],
"tsyms" => ["USD", "EUR", "GBP", "JPY", "RUR"]
```

Service store data to PostgreSQL by scheduler in background.
You can set up period of update info inside **src** -> **config** -> **cron**.

This app has API for fetch fresh data from database:

```
GET http://{server-ip}:{port}/service/price?fsyms=BTC&tsyms=USD
```

Also you can connect via web-socket and receive up-to-date information immediately after it is entered in the database.

```
ws://{server-ip}:{socketPort}

```

Example of response:

````{
    "RAW": {
        "BTC": {
            "USD": {
                "CHANGE24HOUR": 2993.1500000000015,
                "CHANGEPCT24HOUR": 6.277504652314353,
                "OPEN24HOUR": 47680.57,
                "VOLUME24HOUR": 24474.792547389996,
                "VOLUME24HOURTO": 1203771568.210516,
                "LOW24HOUR": 47184.82,
                "HIGH24HOUR": 51195.69,
                "PRICE": 50673.72,
                "LASTUPDATE": 1615120625,
                "SUPPLY": 18647206,
                "MKTCAP": 944923295626.32
            }
        }
    },
    "DISPLAY": {
        "BTC": {
            "USD": {
                "CHANGE24HOUR": "$ 2,993.15",
                "CHANGEPCT24HOUR": "6.28",
                "OPEN24HOUR": "$ 47,680.6",
                "VOLUME24HOUR": "Ƀ 24,474.8",
                "VOLUME24HOURTO": "$ 1,203,771,568.2",
                "HIGH24HOUR": "$ 51,195.7",
                "PRICE": "$ 50,673.7",
                "FROMSYMBOL": "Ƀ",
                "TOSYMBOL": "$",
                "LASTUPDATE": "Just now",
                "SUPPLY": "Ƀ 18,647,206.0",
                "MKTCAP": "$ 944.92 B"
            }
        }
    }
}```
````

## **Quick Start**

1. Copy repo to local machine and go to root folder.
2. Run command: `nvm use`
3. Run command: `npm install`
4. Run command for launch database. You must replace `{DB_PORT}`, `{DB_USER}`, `{DB_PASSWORD}`, `{DB_NAME}` with you own values.

`docker run -p {DB_PORT}:5432 -e POSTGRES_USER={DB_USER} -e POSTGRES_PASSWORD={DB_PASSWORD} -e POSTGRES_DB={DB_NAME} -d postgres`

5. Change info for db migration inside `config/config.json` and run command:

`npx sequelize-client db:migrate`

6. Run command. You must replace `{DB_PORT}`, `{DB_USER}`, `{DB_PASSWORD}`, `{DB_NAME}` with you own values.

`NODE_ENV=dev DB_HOST={DB_HOST} DB_PORT={DB_PORT} DB_USER={DB_USER} DB_PASSWORD={DB_PASSWORD} DB_DATABASE={DB_NAME} node .`

7. Congratulations! :smiley: It must work! :pray:

## **How to check that it works?**

After **Quick Start** section let's test it!

### **GET request**

Open you favorite browser and go to URL:

`http://{server-ip}:8080/service/price?fsyms=BTC&tsyms=USD`

### **WebSocket connection**

If you are using Google Chrome, then you can install extension **WebSocket King**.
After installed click to extension and inside of it connect to url:

`ws://{server-ip}:8000`

**Note:** if you launch project in local machine, then you can replace `{server-ip}` to `localhost`

## **Additional settings**

You can launch project with `NODE_ENV=dev` or `NODE_ENV=prod`. In `dev`mode app will be logging overabundant logs.

Inside `src/config/index.js` you can change settings.

## **Further visions**

Need to write tests.
