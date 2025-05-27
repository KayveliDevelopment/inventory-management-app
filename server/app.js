
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { sequelize } = require('./models');

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

const app = express();
app.use('/uploads', express.static('uploads')); // Serve image URLs
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/test', (req, res) => res.send('Server is alive'));

sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Database error:', err));

console.log("Registered routes:");

if (process.env.NODE_ENV !== 'test') {
  sequelize.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Database error:', err));

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;