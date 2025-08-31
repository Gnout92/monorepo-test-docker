import express from 'express';
import routes from './routes.js';


const app = express();
app.use(express.json());
app.use('/catalog', routes);


const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`[catalog] listening on ${port}`));


export default app; // for tests