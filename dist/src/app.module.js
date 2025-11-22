"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const auth_module_1 = require("./modules/auth/auth.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const database_config_1 = require("./config/database.config");
const services_module_1 = require("./modules/services/services.module");
const development_plans_module_1 = require("./modules/development/development-plans/development-plans.module");
const plan_features_module_1 = require("./modules/plan-features/plan-features.module");
const development_plan_features_module_1 = require("./modules/development/development-plan-features/development-plan-features.module");
const development_plan_services_module_1 = require("./modules/development/development-plan-services/development-plan-services.module");
const development_plan_technologies_module_1 = require("./modules/development/development-plan-technologies/development-plan-technologies.module");
const client_plan_quotations_module_1 = require("./modules/client-plan-quotations/client-plan-quotations.module");
const invoices_module_1 = require("./modules/billing/invoices/invoices.module");
const invoice_items_module_1 = require("./modules/billing/invoice-items/invoice-items.module");
const payments_module_1 = require("./modules/billing/payments/payments.module");
const employee_module_1 = require("./modules/hr/employees/employee.module");
const technology_module_1 = require("./modules/technology/technology.module");
const project_member_module_1 = require("./modules/project-management/project-members/project-member.module");
const projects_module_1 = require("./modules/project-management/projects/projects.module");
const project_technology_module_1 = require("./modules/project-management/project-technologies/project-technology.module");
const skills_module_1 = require("./modules/hr/skills/skills.module");
const employee_skills_module_1 = require("./modules/hr/employee-skills/employee-skills.module");
const project_milestones_module_1 = require("./modules/project-management/project-milestones/project-milestones.module");
const project_updates_module_1 = require("./modules/project-management/project-updates/project-updates.module");
const task_comments_module_1 = require("./modules/project-management/tasks/task-comments.module");
const tasks_module_1 = require("./modules/project-management/tasks/tasks.module");
const time_entries_module_1 = require("./modules/project-management/time-entries/time-entries.module");
const clients_module_1 = require("./modules/crm/clients/clients.module");
const client_approvals_module_1 = require("./modules/crm/client-approvals/client-approvals.module");
const support_tickets_module_1 = require("./modules/support-tickets/support-tickets.module");
const messaging_module_1 = require("./modules/messaging/messaging.module");
const categories_module_1 = require("./modules/content/categories/categories.module");
const client_notes_module_1 = require("./modules/crm/client-notes/client-notes.module");
const client_interactions_module_1 = require("./modules/crm/client-interactions/client-interactions.module");
const leads_module_1 = require("./modules/crm/leads/leads.module");
const blog_posts_module_1 = require("./modules/content/blog-posts/blog-posts.module");
const blog_comments_module_1 = require("./modules/content/blog-comments/blog-comments.module");
const questions_module_1 = require("./modules/content/questions/questions.module");
const answers_module_1 = require("./modules/content/answers/answers.module");
const case_studies_module_1 = require("./modules/content/case-studies/case-studies.module");
const testimonials_module_1 = require("./modules/content/testimonials/testimonials.module");
const contact_inquiries_module_1 = require("./modules/crm/contact-inquiries/contact-inquiries.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const validation_exception_filter_1 = require("./common/filters/validation-exception.filter");
const http_exception_filter_1 = require("./common/filters/http-exception.filter");
const core_1 = require("@nestjs/core");
const response_interceptor_1 = require("./common/interceptor/response.interceptor");
const throttler_1 = require("@nestjs/throttler");
const shared_module_1 = require("./modules/shared/shared.module");
const role_permissions_module_1 = require("./modules/role-permissions/role-permissions.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: ['.env.local', '.env'],
                cache: true,
                expandVariables: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: database_config_1.default,
                inject: [config_1.ConfigService],
            }),
            throttler_1.ThrottlerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => ({
                    throttlers: [
                        {
                            ttl: config.get('THROTTLE_TTL', 60000),
                            limit: config.get('THROTTLE_LIMIT', 100),
                        },
                    ],
                }),
            }),
            shared_module_1.SharedModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            employee_module_1.EmployeeProfilesModule,
            clients_module_1.ClientsModule,
            skills_module_1.SkillsModule,
            employee_skills_module_1.EmployeeSkillsModule,
            technology_module_1.TechnologiesModule,
            project_milestones_module_1.ProjectMilestoneModule,
            project_updates_module_1.ProjectUpdatesModule,
            task_comments_module_1.TaskCommentModule,
            tasks_module_1.TaskModule,
            time_entries_module_1.TimeEntryModule,
            project_member_module_1.ProjectMembersModule,
            projects_module_1.ProjectsModule,
            project_technology_module_1.ProjectTechnologiesModule,
            services_module_1.ServicesModule,
            development_plans_module_1.DevelopmentPlansModule,
            plan_features_module_1.PlanFeaturesModule,
            development_plan_features_module_1.DevelopmentPlanFeaturesModule,
            development_plan_services_module_1.DevelopmentPlanServicesModule,
            development_plan_technologies_module_1.DevelopmentPlanTechnologiesModule,
            client_plan_quotations_module_1.ClientPlanQuotationsModule,
            invoices_module_1.InvoicesModule,
            invoice_items_module_1.InvoiceItemsModule,
            payments_module_1.PaymentsModule,
            support_tickets_module_1.SupportTicketsModule,
            messaging_module_1.MessagingModule,
            client_approvals_module_1.ClientApprovalsModule,
            categories_module_1.CategoriesModule,
            client_notes_module_1.ClientNotesModule,
            client_interactions_module_1.ClientInteractionsModule,
            leads_module_1.LeadsModule,
            blog_posts_module_1.BlogPostsModule,
            blog_comments_module_1.BlogCommentsModule,
            questions_module_1.QuestionsModule,
            answers_module_1.AnswersModule,
            case_studies_module_1.CaseStudiesModule,
            testimonials_module_1.TestimonialsModule,
            contact_inquiries_module_1.ContactInquiriesModule,
            permissions_module_1.PermissionsModule,
            role_permissions_module_1.RolePermissionsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: response_interceptor_1.ResponseInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: validation_exception_filter_1.ValidationExceptionFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: http_exception_filter_1.HttpExceptionFilter,
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map