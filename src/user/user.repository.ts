import { InjectRepository } from "@nestjs/typeorm";
import { UsersEntity } from "src/entities/users.entity";
import { Repository } from "typeorm";
import { SignUpRequestDto } from "../auth/dto/signUp.request.dto";

export class UsersRepository {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  async createUser(signUpDto: SignUpRequestDto) {
    const { email, nickname, password, name, phoneNumber } = signUpDto;
    const newUser = await this.userRepository.insert({
      email,
      nickname,
      password,
      name,
      phoneNumber,
    });

    return newUser;
  }
}
