import express = require('express')
const app = express()
const port = 3000

app.get('/', (req: express.Request, res: express.Response) => {
    // res.send('Hello World!')
    res.status(200).json(
        {
            success: true,
            message: 'Hello World!'
        }
    )
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async(req: express.Request, res: express.Response) => {
    console.log(req.body);
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})