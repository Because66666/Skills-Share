"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const upload_controller_1 = require("./upload.controller");
const upload_service_1 = require("./upload.service");
const multer_1 = require("multer");
const path_1 = require("path");
const crypto_1 = require("crypto");
const prisma_module_1 = require("../prisma/prisma.module");
const fs = require("fs");
const uploadDir = './uploads/skills';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        if (!fs.existsSync(uploadDir)) {
                            fs.mkdirSync(uploadDir, { recursive: true });
                        }
                        cb(null, uploadDir);
                    },
                    filename: (req, file, cb) => {
                        const randomName = (0, crypto_1.randomUUID)();
                        cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
                    },
                }),
                limits: {
                    fileSize: 10 * 1024 * 1024,
                },
            }),
        ],
        controllers: [upload_controller_1.UploadController],
        providers: [upload_service_1.UploadService],
        exports: [upload_service_1.UploadService],
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map