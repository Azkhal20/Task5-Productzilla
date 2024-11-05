import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    await mongoose.connect(mongoURI, options);

    const db = mongoose.connection;

    db.on('error', (error) => {
      console.error('Gagal terhubung ke MongoDB:', error);
    });

    db.once('open', () => {
      console.log('Koneksi ke MongoDB berhasil');
    });

    // Optional: Handle disconnection events
    db.on('disconnected', () => {
      console.log('Koneksi ke MongoDB terputus');
    });

    // Optional: Handle process termination
    process.on('SIGINT', async () => {
      await db.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });
  } catch (error) {
    console.error('Gagal terhubung ke MongoDB:', error);
    // Jangan keluar selama pengujian
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

export default connectDB;
