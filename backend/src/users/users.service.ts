import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: any): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  // New methods for managing admin users
  async findAllAdmins(): Promise<UserDocument[]> {
    return this.userModel.find({ role: 'admin' }).exec();
  }

  async createAdmin(adminData: { email: string; password: string; name: string }): Promise<UserDocument> {
    // Check if user already exists
    const existingUser = await this.findByEmail(adminData.email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash the password
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(adminData.password, salt);

    // Create the admin user
    const adminUser = new this.userModel({
      ...adminData,
      password: hashedPassword,
      role: 'admin',
    });

    return adminUser.save();
  }

  async removeAdmin(userId: string): Promise<void> {
    const user = await this.findById(userId);
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    if (user.role !== 'admin') {
      throw new ConflictException('User is not an admin');
    }
    
    await this.userModel.findByIdAndDelete(userId).exec();
  }
} 