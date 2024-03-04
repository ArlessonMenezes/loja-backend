import { User } from "../../user/model/user.entity";

export class LoginPayloadDto {
  idUser: string;
  typeUser: string;
  email: string;

  constructor(user: User) {
    this.idUser = user.idUser;
    this.typeUser = user.typeUser;
    this.email = user.email;
  }
}