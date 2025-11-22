export declare enum ProjectUpdateType {
    PROGRESS = "progress",
    MILESTONE = "milestone",
    ISSUE = "issue",
    COMPLETION = "completion"
}
export declare class CreateProjectUpdateDto {
    projectId: string;
    title: string;
    description: string;
    updateType: ProjectUpdateType;
    createdByEmployeeId?: string;
}
