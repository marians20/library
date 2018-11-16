import { DepartamentDto } from './departament.dto';
import { RolesDtos } from './role.dto';

export class UserDto {
    public id: number;
    public userName: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public department: DepartamentDto;
    public roles: RolesDtos;
}
