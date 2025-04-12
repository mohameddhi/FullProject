import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  Put,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { userTypes } from 'src/shared/schema/users';  
import { Roles } from 'src/shared/middleware/role.decorators';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginUser: { organisation: string; email: string; password: string },
    @Res({ passthrough: true }) response: Response,
  ) {
    const loginRes = await this.usersService.login(
      loginUser.organisation,
      loginUser.email,
      loginUser.password,
    );
    if (loginRes.success) {
      response.cookie('_valomnia_auth_token', loginRes.result?.token, {
        httpOnly: true,
      });
    }
    if (loginRes.result && typeof loginRes.result === 'object') {
      delete (loginRes.result as Record<string, any>).token;
    }
    
    return loginRes;
  } 
/*
  @Get('/verify-email/:otp/:email')
  async verifyEmail(@Param('otp') otp: string, @Param('email') email: string) {
    return await this.usersService.verifyEmail(otp, email);
  }

  @Get('send-otp-email/:email')
  async sendOtpEmail(@Param('email') email: string) {
    return await this.usersService.sendOtpEmail(email);
  }

  @Put('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('_digi_auth_token');
    return res.status(HttpStatus.OK).json({
      success: true, 
      message: 'Logout successfully',
    });
  }
 
  @Get('forgot-password/:email') 
  async forgotPassword(@Param('email') email: string) { 
    return await this.usersService.forgotPassword(email); 
  }

  @Get() 
  @Roles(userTypes.ADMIN)
  async findAll(@Query('type') type: string) {
    return await this.usersService.findAll(type); 
  }

  @Patch('/update-name-password/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updatePasswordOrName(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }*/
}