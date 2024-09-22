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
exports.CreatePersonDto = void 0;
const class_validator_1 = require("class-validator");
class CreatePersonDto {
    constructor(data) {
        this.name = data.name;
        this.paternal = data.paternal;
        this.maternal = data.maternal;
        this.address = data.address;
        this.phone = data.phone;
    }
}
exports.CreatePersonDto = CreatePersonDto;
__decorate([
    (0, class_validator_1.Length)(2, 200, { message: 'El nombre debe tener entre 2 y 200 caracteres de  longitud' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 200, { message: 'El apellido paterno debe tener entre 2 y 200 caracteres de  longitud' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "paternal", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 200, { message: 'El apellido materno debe tener entre 2 y 200 caracteres de  longitud' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "maternal", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'La dirección es requerida' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.Matches)(/^\d{10}$/, { message: 'El número telefónico debe ser de 10 dígitos sin separadores' }),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "phone", void 0);
//# sourceMappingURL=create-person.dto.js.map