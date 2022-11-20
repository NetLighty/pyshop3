import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './users.model';
import { ProfileItem } from 'src/auth/types/user.types';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      include: { all: true },
    });
    return user;
  }

  async setProfileInfo(userId: number, profileInfo: string[]) {
    await this.userRepository.update(
      { profileInfo },
      { where: { id: userId } },
    );
  }

  async addProfileItem(userId: number, profileItem: ProfileItem) {
    const user = await this.getUserById(userId);
    const profileItemJSON = JSON.stringify(profileItem);
    console.log(user.profileInfo);
    console.log(profileItem);
    user.update({ profileInfo: [...user.profileInfo, profileItemJSON] });
    return user.profileInfo;
  }

  async deleteProfileItem(
    userId: number,
    profileItem: ProfileItem,
  ): Promise<ProfileItem[]> {
    const user = await this.getUserById(userId);
    const profileItems: ProfileItem[] = user.profileInfo.map((el) =>
      JSON.parse(el),
    );
    const updatedProfileInfo = profileItems.filter(
      (el) => el.key !== profileItem.key,
    );
    const updatedProfileInfoJSON = updatedProfileInfo.map((el) =>
      JSON.stringify(el),
    );
    this.setProfileInfo(userId, updatedProfileInfoJSON);
    return updatedProfileInfo;
  }

  async editProfileItem(
    userId: number,
    profileItem: ProfileItem,
  ): Promise<ProfileItem[]> {
    const user = await this.getUserById(userId);
    const profileItems: ProfileItem[] = user.profileInfo.map((el) =>
      JSON.parse(el),
    );
    const updatedProfileInfo = profileItems.map((el) => {
      if (el.key === profileItem.key) {
        return { key: el.key, value: profileItem.value };
      } else {
        return el;
      }
    });
    const updatedProfileInfoJSON = updatedProfileInfo.map((el) =>
      JSON.stringify(el),
    );
    this.setProfileInfo(userId, updatedProfileInfoJSON);
    return updatedProfileInfo;
  }

  async updateRtHash(email: string, rt: string) {
    const hash = await bcrypt.hash(rt, 6);
    await this.userRepository.update({ hashedRt: hash }, { where: { email } });
  }

  async cleanRtHash(userId: number) {
    await this.userRepository.update(
      { hashedRt: null },
      { where: { id: userId } },
    );
  }
}
