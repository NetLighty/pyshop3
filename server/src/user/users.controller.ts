import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';
import { ProfileItem } from 'src/auth/types/user.types';
import { GetCurrentUser } from 'src/common/decorators';
import { AtGuard } from 'src/common/guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(AtGuard)
  @Post('/addProfileItem')
  @HttpCode(HttpStatus.CREATED)
  addProfileItem(
    @GetCurrentUser() user: JwtPayload,
    @Body() profileItem: ProfileItem,
  ) {
    return this.usersService.addProfileItem(user.id, profileItem);
  }

  @UseGuards(AtGuard)
  @Post('/deleteProfileItem')
  @HttpCode(HttpStatus.CREATED)
  deleteProfileItem(
    @GetCurrentUser() user: JwtPayload,
    @Body() profileItem: ProfileItem,
  ) {
    return this.usersService.deleteProfileItem(user.id, profileItem);
  }

  @UseGuards(AtGuard)
  @Post('/editProfileItem')
  @HttpCode(HttpStatus.CREATED)
  editProfileItem(
    @GetCurrentUser() user: JwtPayload,
    @Body() profileItem: ProfileItem,
  ) {
    return this.usersService.editProfileItem(user.id, profileItem);
  }

  @UseGuards(AtGuard)
  @Get('/current')
  @HttpCode(HttpStatus.OK)
  getUser(@GetCurrentUser() user: JwtPayload) {
    return this.usersService.getUserById(user.id);
  }
}
