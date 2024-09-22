import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../core/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(
    email: string,
    password: string,
  ): Promise<{ token: string } | UnauthorizedException> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user && user.isActive) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const payload = { id: user.id };
        return {
          token: await this.jwtService.signAsync(payload, {
            expiresIn: JWT_EXPIRES_IN,
            secret: JWT_SECRET,
          }),
        };
      } else throw new UnauthorizedException();
    }
    throw new UnauthorizedException();
  }
}
