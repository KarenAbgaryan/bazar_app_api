import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import Stripe from 'stripe';
import bodyParser from 'body-parser'
import path from 'path'

const __dirname = path.resolve();

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    origin: "https://bazaronline.onrender.com/",
    credentials: true,
    optionsSuccessStatus: 20
}))

app.use(express.static(path.join(__dirname, 'server/public/build')));

dotenv.config()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/pay", async (req, res) => {
    console.log(req.body.token.id);
    const purchaseData = await stripe.charges.create({
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
    })
    res.send(purchaseData.paid)
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})