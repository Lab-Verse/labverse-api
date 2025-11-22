export declare enum ProjectMemberRole {
    LEAD = "lead",
    DEVELOPER = "developer",
    DESIGNER = "designer",
    TESTER = "tester"
}
export declare class CreateProjectMemberDto {
    projectId: string;
    employeeId: string;
    role: ProjectMemberRole;
    responsibilities?: string;
}
