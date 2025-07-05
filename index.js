import express from 'express';
import cors from 'cors';

import productsRouter from './src/routes/productsRouter.js';
import usersRouter from './src/routes/usersRouter.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api", (req, res) => {
    res.json({ message: "API Rest en Node.js" });
});


app.use('/api', productsRouter);
app.use('/users',usersRouter)



const PORT =3000;
app.listen(PORT, () => console.log('http://localhost:' + PORT));
