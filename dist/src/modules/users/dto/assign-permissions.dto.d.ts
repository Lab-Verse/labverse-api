import { PermissionActionEnum } from '../../../common/enums/permission-actions.enum';
export declare enum AssignmentActionEnum {
    ADD = "add",
    REMOVE = "remove",
    REPLACE = "replace"
}
export declare class AssignPermissionsDto {
    feature: string;
    actions: PermissionActionEnum[];
    assignmentAction?: AssignmentActionEnum;
}
