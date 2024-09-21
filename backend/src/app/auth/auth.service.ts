import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../core/constants";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../users/users.entity";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  public constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  public async login(email: string, password: string): Promise<string | UnauthorizedException> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user && user.password === password && user.isActive) {
      const payload = { id: user.id };
      return this.jwtService.signAsync(payload, { expiresIn: JWT_EXPIRES_IN, secret: JWT_SECRET });
    }
    throw new UnauthorizedException();
  }
}
