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
exports.SurveysService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const survey_schema_1 = require("./survey.schema");
let SurveysService = class SurveysService {
    surveyModel;
    constructor(surveyModel) {
        this.surveyModel = surveyModel;
    }
    async create(createSurveyDto) {
        const createdSurvey = new this.surveyModel(createSurveyDto);
        return createdSurvey.save();
    }
    async findAll() {
        return this.surveyModel.find().exec();
    }
    async findByUserId(userId) {
        return this.surveyModel.find({ userId }).exec();
    }
    async getDefaultQuestion() {
        return "How are you feeling about work today? Please share your thoughts and experiences.";
    }
};
exports.SurveysService = SurveysService;
exports.SurveysService = SurveysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(survey_schema_1.Survey.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SurveysService);
//# sourceMappingURL=surveys.service.js.map