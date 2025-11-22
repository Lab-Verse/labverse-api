"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentPlanTechnology = void 0;
const typeorm_1 = require("typeorm");
const development_plan_entity_1 = require("../../development-plans/entities/development-plan.entity");
const technology_entity_1 = require("../../../technology/entities/technology.entity");
let DevelopmentPlanTechnology = class DevelopmentPlanTechnology {
};
exports.DevelopmentPlanTechnology = DevelopmentPlanTechnology;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DevelopmentPlanTechnology.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], DevelopmentPlanTechnology.prototype, "plan_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', nullable: false }),
    __metadata("design:type", String)
], DevelopmentPlanTechnology.prototype, "technology_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => development_plan_entity_1.DevelopmentPlan, (plan) => plan.developmentPlanTechnologies, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'plan_id' }),
    __metadata("design:type", development_plan_entity_1.DevelopmentPlan)
], DevelopmentPlanTechnology.prototype, "plan", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => technology_entity_1.Technology, (technology) => technology.developmentPlanTechnologies, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'technology_id' }),
    __metadata("design:type", technology_entity_1.Technology)
], DevelopmentPlanTechnology.prototype, "technology", void 0);
exports.DevelopmentPlanTechnology = DevelopmentPlanTechnology = __decorate([
    (0, typeorm_1.Entity)('development_plan_technologies')
], DevelopmentPlanTechnology);
//# sourceMappingURL=development-plan-technology.entity.js.map