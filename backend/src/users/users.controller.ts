import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';

@Controller('admin/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllAdmins(@Request() req) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.usersService.findAllAdmins();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createAdmin(
    @Request() req,
    @Body() adminData: CreateUserDto,
  ) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    return this.usersService.createAdmin(adminData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeAdmin(@Request() req, @Param('id') userId: string) {
    if (req.user.role !== 'admin') {
      throw new UnauthorizedException('Admin access required');
    }
    
    // Prevent admin from deleting themselves
    if (req.user.userId === userId) {
      throw new UnauthorizedException('Cannot delete your own admin account');
    }
    
    await this.usersService.removeAdmin(userId);
    return { message: 'Admin user removed successfully' };
  }
} 