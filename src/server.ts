import express from 'express';
import { Pool } from 'pg';

const app = express()
const port = 3000



const pool = new Pool({
    connectionString:"postgresql://neondb_owner:npg_W4OEwic1KqCT@ep-fragrant-tree-az4mg0y2.c-3.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
});

console.log(pool);




// app.get('/', (req: express.Request, res: express.Response) => {
//     // res.send('Hello World!')
//     res.status(200).json(
//         {
//             success: true,
//             message: 'Hello World!'
//         }
//     )
// })

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async(req: express.Request, res: express.Response) => {
    // console.log(req.body);

    const { name, age, pass } = req.body;
    console.log(pass);
    res.status(200).json(
        {
            success: true,
            message: 'Hello World!',
            data: { name, age },
        }
    )
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})