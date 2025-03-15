import { connect, disconnect, Schema, model } from 'mongoose';
import * as bcryptjs from 'bcryptjs';

// Define the User model structure
interface User {
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

async function createDefaultAdmin() {
  // Get MongoDB URI from environment or use default
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/employee-pulse';
  console.log(`Connecting to MongoDB at ${mongoUri}`);

  try {
    // Connect to MongoDB
    await connect(mongoUri);
    console.log('Connected to MongoDB');

    // Define the schema
    const UserSchema = new Schema<User>({
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, required: true, default: 'employee' },
      createdAt: { type: Date, default: Date.now }
    });

    // Register the model (using mongoose.model directly)
    // The {overwriteModels: true} option allows redefining the model if it exists
    const User = model<User>('User', UserSchema, undefined, { overwriteModels: true });

    // Check if any admin users exist
    const adminCount = await User.countDocuments({ role: 'admin' });
    
    if (adminCount === 0) {
      console.log('No admin users found. Creating default admin user...');
      
      // Hash the password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash('admin@1234', salt);
      
      // Create default admin user
      await User.create({
        email: 'admin@admin.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
        createdAt: new Date()
      });
      
      console.log('Default admin user created successfully!');
      console.log('Email: admin@admin.com');
      console.log('Password: admin@1234');
    } else {
      console.log(`${adminCount} admin users already exist. Skipping default admin creation.`);
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  } finally {
    // Disconnect from MongoDB
    await disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Execute the function
createDefaultAdmin();