import { Body, Controller, Res, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {}

  @Post('/')
  postAuth(@Body() authDto: AuthDto, @Res({ passthrough: true }) responseReq){
    return this.authService.postAuth(authDto, responseReq);
  }

}