const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./models/User');
const Monitor = require('./models/Monitor');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
// require('dotenv').config();
const app = express();

mongoose.connect(process.env.DB_STRING)
    .then(() => {
        console.log('Connected to mongodb');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());

async function check_url(url) {
    try {
        const response = await axios.get(url);
        return response.status === 200;
    } catch (error) {
        console.error('Error checking URL:', error);
        return false;
    }
}
async function send_email(email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lens.customer@gmail.com',
            pass: 'cbagabmmwbzywmqq'
        }
    });
    const mailOptions = {
        from: 'lens.customer@gmail.com',
        to: email,
        subject: 'Your Website is Down',
        html: `
            <p>Hi ,Your website suddenly becomes down .Kindly check it  </p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        }
        else{
            console.log('Email sent to user');
        }
    });
}
async function checking_always_url() {
    const all_urls = await Monitor.find();
    const updatePromises = all_urls.map(async (url) => {
        try {
            if (await check_url(url.url)) {
                url.status = 'true';
            } else {
                console.log('This URL is down', url);
                url.status = 'false';
                send_email(url.email);
            }
            await url.save();
        } catch (error) {
            console.error('Error checking URL:', url.url, error);
        }
    });
    await Promise.all(updatePromises);
}
setInterval(() => {
    checking_always_url();
}, 3000);

app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ message: 'User already exists!' });
    }
    const verificationToken = jwt.sign({ name, email, password }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lens.customer@gmail.com',
            pass: 'cbagabmmwbzywmqq'
        }
    });
    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}`;
    const mailOptions = {
        from: 'lens.customer@gmail.com',
        to: email,
        subject: 'Welcome to Netmonitor',
        html: `
            <p>Please verify your email address by clicking the button below:</p>
            <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: black; text-align: center; text-decoration: none; border-radius: 5px;">Verify Email</a> `
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        res.send('<h1>Kindly check your inbox to verify your email</h1>');
    });
});

app.get('/verify', async (req, res) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: 'Invalid or missing token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { name, email, password } = decoded;

        const newUser = new User({ name, email, password });
        const user_id = newUser._id;

        await newUser.save();

        const authToken = jwt.sign({ id: user_id, name: name, email: email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        res.cookie('authToken', authToken, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 3600), // 1 hour
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        });

        return res.redirect('http://localhost:5173/one');
    } catch (err) {
        console.error('Error verifying token:', err);
        return res.status(500).json({ message: 'Error Signing Up!' });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid Email!' });
    }
    if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid Password!' });
    }
    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h', // Corrected to '1h'
    });
    res.cookie('authToken', token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    return res.status(200).json({
        message: 'Successfully Logged In',
        user: user,
        token,
    });
});

app.post('/addurl', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ message: 'Bad Request: URL is required' });
    }
    try {
        const authToken = req.cookies.authToken;
        if (!authToken) {
            return res.status(401).json({ message: 'Unauthorized: No authToken found' });
        }
        let decoded;
        try {
            decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        } catch (error) {
            return res.status(401).json({ message: 'Unauthorized: Invalid authToken' });
        }
        const email = decoded.email;
        const url_status = await check_url(url) ? 'true' : 'false';
        const newurl = new Monitor({
            email: email,
            url: url,
            status: url_status,
        });
        await newurl.save();
        res.status(200).send('URL added');
    } catch (error) {
        console.error('Error adding URL:', error);
        res.status(500).send('URL not added');
    }
});

app.get('/allmonitors', async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        const email = decoded.email;
        const all_data = await Monitor.find({ email: email });
        res.status(200).json(all_data);
    });
});

app.delete('/deletemonitor/:id', async (req, res) => {
    try {
        const monitor = await Monitor.findByIdAndDelete(req.params.id);
        if (!monitor) {
            return res.status(404).send({ message: 'Monitor not found' });
        }
        res.status(200).send({ message: 'Monitor deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error deleting monitor', error });
    }
})

app.get('/profile', async (req, res) => {
    const token = req.cookies.authToken;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token' });
        }
        const email = decoded.email;
        const all_data = await User.find({ email: email });
        res.status(200).json(all_data);
    });
});

app.get('/hi',async(req,res)=>{
    res.send(`<h1>Hello Ahmad</h1>`);
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
