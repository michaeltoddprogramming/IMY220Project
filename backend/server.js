import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4200;

app.use(express.static(path.join(__dirname, '../../frontend/public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
