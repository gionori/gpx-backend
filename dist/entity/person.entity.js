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
exports.Person = void 0;
var typeorm_1 = require("typeorm");
var Person = /** @class */ (function () {
    function Person() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Person.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
        __metadata("design:type", String)
    ], Person.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
        __metadata("design:type", String)
    ], Person.prototype, "paternal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
        __metadata("design:type", String)
    ], Person.prototype, "maternal", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "text" }),
        __metadata("design:type", String)
    ], Person.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
        __metadata("design:type", String)
    ], Person.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: "boolean", default: false, name: 'is_deleted' }),
        __metadata("design:type", Boolean)
    ], Person.prototype, "isDeleted", void 0);
    Person = __decorate([
        (0, typeorm_1.Entity)()
    ], Person);
    return Person;
}());
exports.Person = Person;
//# sourceMappingURL=person.entity.js.map