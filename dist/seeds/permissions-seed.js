"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPermissions = seedPermissions;
require("reflect-metadata");
const data_source_1 = require("../src/config/data-source");
const role_entity_1 = require("../src/modules/roles/entities/role.entity");
const permission_entity_1 = require("../src/modules/permissions/entities/permission.entity");
const role_permission_entity_1 = require("../src/modules/role-permissions/entities/role-permission.entity");
const role_enum_1 = require("../src/modules/roles/role.enum");
const permission_actions_enum_1 = require("../src/common/enums/permission-actions.enum");
const FEATURE_PERMISSIONS = {
    users: {
        description: 'User management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.IMPORT,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.RESTORE,
        ],
    },
    roles: {
        description: 'Role management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    permissions: {
        description: 'Permission management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    clients: {
        description: 'Client management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.IMPORT,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.RESTORE,
        ],
    },
    employees: {
        description: 'Employee management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
        ],
    },
    skills: {
        description: 'Skills management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'employee-skills': {
        description: 'Employee skills assignment',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
        ],
    },
    projects: {
        description: 'Project management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.RESTORE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
        ],
    },
    'project-members': {
        description: 'Project team member management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.UNASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'project-milestones': {
        description: 'Project milestone management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
        ],
    },
    'project-updates': {
        description: 'Project updates management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
        ],
    },
    tasks: {
        description: 'Task management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.UNASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    messaging: {
        description: 'Messaging system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    'blog-comments': {
        description: 'Blog comments management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'project-technologies': {
        description: 'Project technologies management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'invoice-items': {
        description: 'Invoice items management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
        ],
    },
    'employee-profiles': {
        description: 'Employee profile management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.RESTORE,
        ],
    },
    'task-comments': {
        description: 'Task comments system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
        ],
    },
    'time-entries': {
        description: 'Time tracking system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
        ],
    },
    services: {
        description: 'Service management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    'development-plans': {
        description: 'Development plans management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    'plan-features': {
        description: 'Plan features management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'development-plan-features': {
        description: 'Development plan features assignment',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'development-plan-services': {
        description: 'Development plan services assignment',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'development-plan-technologies': {
        description: 'Development plan technologies assignment',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    technologies: {
        description: 'Technology management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
        ],
    },
    'client-notes': {
        description: 'Client notes management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    'client-approvals': {
        description: 'Client approval management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    leads: {
        description: 'Lead management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.IMPORT,
            permission_actions_enum_1.PermissionActionEnum.CONVERT,
        ],
    },
    'contact-inquiries': {
        description: 'Contact inquiry management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.RESPOND,
        ],
    },
    invoices: {
        description: 'Invoice management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
        ],
    },
    payments: {
        description: 'Payment management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
        ],
    },
    'client-plan-quotations': {
        description: 'Client plan quotation management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    'support-tickets': {
        description: 'Support ticket system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.ASSIGN,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.RESOLVE,
            permission_actions_enum_1.PermissionActionEnum.CLOSE,
            permission_actions_enum_1.PermissionActionEnum.ESCALATE,
        ],
    },
    categories: {
        description: 'Category management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    questions: {
        description: 'Question management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
        ],
    },
    answers: {
        description: 'Answer management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
        ],
    },
    'blog-posts': {
        description: 'Blog post management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    testimonials: {
        description: 'Testimonial management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
        ],
    },
    'case-studies': {
        description: 'Case study management system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.UPDATE,
            permission_actions_enum_1.PermissionActionEnum.DELETE,
            permission_actions_enum_1.PermissionActionEnum.APPROVE,
            permission_actions_enum_1.PermissionActionEnum.REJECT,
            permission_actions_enum_1.PermissionActionEnum.PUBLISH,
            permission_actions_enum_1.PermissionActionEnum.ARCHIVE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
        ],
    },
    system: {
        description: 'System administration',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.CONFIGURE,
            permission_actions_enum_1.PermissionActionEnum.BACKUP,
            permission_actions_enum_1.PermissionActionEnum.RESTORE_BACKUP,
            permission_actions_enum_1.PermissionActionEnum.MANAGE,
            permission_actions_enum_1.PermissionActionEnum.MONITOR,
            permission_actions_enum_1.PermissionActionEnum.AUDIT,
        ],
    },
    reports: {
        description: 'Reporting and analytics system',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.CREATE,
            permission_actions_enum_1.PermissionActionEnum.EXPORT,
            permission_actions_enum_1.PermissionActionEnum.REPORT,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.CONFIGURE,
        ],
    },
    dashboard: {
        description: 'Dashboard access and management',
        actions: [
            permission_actions_enum_1.PermissionActionEnum.READ,
            permission_actions_enum_1.PermissionActionEnum.CONFIGURE,
            permission_actions_enum_1.PermissionActionEnum.VIEW_ALL,
            permission_actions_enum_1.PermissionActionEnum.VIEW_TEAM,
            permission_actions_enum_1.PermissionActionEnum.VIEW_OWN,
            permission_actions_enum_1.PermissionActionEnum.ANALYZE,
        ],
    },
};
async function seedPermissions() {
    try {
        console.log('Starting permissions seeding...');
        const roleRepo = data_source_1.AppDataSource.getRepository(role_entity_1.Role);
        const permissionRepo = data_source_1.AppDataSource.getRepository(permission_entity_1.Permission);
        const rolePermissionRepo = data_source_1.AppDataSource.getRepository(role_permission_entity_1.RolePermission);
        console.log('🧹 Clearing existing permissions and role-permissions...');
        await rolePermissionRepo.query('TRUNCATE TABLE role_permissions CASCADE;');
        await permissionRepo.query('TRUNCATE TABLE permissions CASCADE;');
        console.log('🔍 Fetching roles...');
        const adminRole = await roleRepo.findOneBy({ name: role_enum_1.RoleEnum.ADMIN });
        const clientRole = await roleRepo.findOneBy({ name: role_enum_1.RoleEnum.CLIENT });
        const employeeRole = await roleRepo.findOneBy({ name: role_enum_1.RoleEnum.EMPLOYEE });
        const supportRole = await roleRepo.findOneBy({ name: role_enum_1.RoleEnum.SUPPORT });
        const managerRole = await roleRepo.findOneBy({
            name: role_enum_1.RoleEnum.PROJECT_MANAGER,
        });
        if (!adminRole ||
            !clientRole ||
            !employeeRole ||
            !supportRole ||
            !managerRole) {
            throw new Error('❌ One or more roles not found. Please ensure the main seed script runs correctly first.');
        }
        console.log('📜 Defining permissions...');
        const allPermissions = [];
        for (const resourceName in FEATURE_PERMISSIONS) {
            if (Object.prototype.hasOwnProperty.call(FEATURE_PERMISSIONS, resourceName)) {
                const feature = FEATURE_PERMISSIONS[resourceName];
                for (const action of feature.actions) {
                    const permission = new permission_entity_1.Permission();
                    permission.name = `${resourceName}.${action}`;
                    permission.description = `${feature.description} - ${action}`;
                    permission.resource = resourceName;
                    permission.action = action;
                    allPermissions.push(permission);
                }
            }
        }
        console.log('💾 Saving permissions...');
        const savedPermissions = await permissionRepo.save(allPermissions);
        console.log('🔗 Linking permissions to roles...');
        const rolePermissions = [
            ...savedPermissions.map((perm) => ({
                roleId: adminRole.id,
                permissionId: perm.id,
            })),
            ...savedPermissions
                .filter((perm) => perm.resource === 'projects' &&
                perm.action === permission_actions_enum_1.PermissionActionEnum.READ)
                .map((perm) => ({
                roleId: clientRole.id,
                permissionId: perm.id,
            })),
            ...savedPermissions
                .filter((perm) => (perm.resource === 'tasks' &&
                (perm.action === permission_actions_enum_1.PermissionActionEnum.READ ||
                    perm.action === permission_actions_enum_1.PermissionActionEnum.VIEW_OWN)) ||
                (perm.resource === 'time-entries' &&
                    perm.action === permission_actions_enum_1.PermissionActionEnum.CREATE))
                .map((perm) => ({
                roleId: employeeRole.id,
                permissionId: perm.id,
            })),
        ];
        await rolePermissionRepo.save(rolePermissionRepo.create(rolePermissions));
        console.log('✅ Permissions and role-permissions seeded successfully!');
    }
    catch (err) {
        throw new Error(`❌ Error seeding permissions: ${err.message}`);
    }
}
//# sourceMappingURL=permissions-seed.js.map