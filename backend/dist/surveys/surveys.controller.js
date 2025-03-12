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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveysController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const surveys_service_1 = require("./surveys.service");
let SurveysController = class SurveysController {
    surveysService;
    constructor(surveysService) {
        this.surveysService = surveysService;
    }
    async getSurveyQuestion() {
        return {
            question: await this.surveysService.getDefaultQuestion(),
        };
    }
    async submitResponse(req, responseDto) {
        const survey = await this.surveysService.create({
            userId: req.user.userId,
            response: responseDto.response,
            question: await this.surveysService.getDefaultQuestion(),
        });
        return survey;
    }
    async getSurveyHistory(req) {
        return this.surveysService.findByUserId(req.user.userId);
    }
    async getAllResponses(req) {
        if (req.user.role !== 'admin') {
            throw new common_1.UnauthorizedException('Admin access required');
        }
        return this.surveysService.findAll();
    }
};
exports.SurveysController = SurveysController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SurveysController.prototype, "getSurveyQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('response'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SurveysController.prototype, "submitResponse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('history'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SurveysController.prototype, "getSurveyHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('admin/responses'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SurveysController.prototype, "getAllResponses", null);
exports.SurveysController = SurveysController = __decorate([
    (0, common_1.Controller)('surveys'),
    __metadata("design:paramtypes", [surveys_service_1.SurveysService])
], SurveysController);
//# sourceMappingURL=surveys.controller.js.map