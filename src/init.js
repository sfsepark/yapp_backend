import app from './app';

import { sequelize } from './models';

const PORT = process.env.PORT || 4000;

const handleListening = () => {
  console.log(`✅ starting server on 🏠 http://localhost:${PORT}`);
  sequelize.sync({force: true});
};

app.listen(PORT, handleListening);
