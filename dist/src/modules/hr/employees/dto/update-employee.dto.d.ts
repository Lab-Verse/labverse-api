import { CreateEmployeeProfileDto } from './create-employee.dto';
declare const UpdateEmployeeProfileDto_base: import("@nestjs/common").Type<Partial<CreateEmployeeProfileDto>>;
export declare class UpdateEmployeeProfileDto extends UpdateEmployeeProfileDto_base {
    profileImage?: string;
}
export {};
