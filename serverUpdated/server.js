const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const patientRoutes = require('./routes/patient.routes');
const hospitalRoutes = require('./routes/hospital.routes');
const veterinarianRoutes = require('./routes/veterinarian.routes');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/veterinarians', veterinarianRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
