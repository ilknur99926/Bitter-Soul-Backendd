const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const router = express.Router();

const USERS_FILE = __dirname + '/../data/users.json';
const SECRET_KEY = 'bitter_secret_2025';

// Qeydiyyat endpoint
router.post('/register', async (req, res) => {
    // Login endpoint
    router.post('/login', async (req, res) => {
        const { email, password } = req.body;

        // 1. Email və şifrə boş olmamalıdır
        if (!email || !password) {
            return res.status(400).json({ message: 'Email və şifrə tələb olunur' });
        }

        // 2. İstifadəçilər faylını oxuyuruq
        const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));

        // 3. İstifadəçini tapırıq
        const user = users.find((u) => u.email === email);

        if (!user) {
            return res.status(404).json({ message: 'İstifadəçi tapılmadı' });
        }

        // 4. Şifrəni yoxlayırıq
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Şifrə yanlışdır' });
        }


        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '7d' });

        res.status(200).json({ token, user: { email: user.email } });
    });

    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'Email və şifrə tələb olunur' });

    const users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
        return res.status(409).json({ message: 'Bu email artıq qeydiyyatdan keçib' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now(), email, password: hashedPassword };
    users.push(newUser);
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '7d' });

    res.status(201).json({ token, user: { email: newUser.email } });
});

module.exports = router;
