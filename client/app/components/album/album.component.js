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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var AlbumComponent = (function () {
    // Http request example
    function AlbumComponent(http) {
        var _this = this;
        this.delete = function (id) {
            var _this = this;
            this.http.put('/remove', { model: 'Albums', id: id }).subscribe(function (data) {
                alert(data._body);
                _this.http.get('/getAll', {
                    search: 'model=Albums'
                }).subscribe(function (data) {
                    // Read the result field from the JSON response.
                    _this.albumsList = JSON.parse(data._body);
                });
            });
        };
        this.http = http;
        http.get('/getAll', {
            search: 'model=Albums'
        }).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.albumsList = JSON.parse(data._body);
        });
    }
    AlbumComponent = __decorate([
        core_1.Component({
            selector: 'album',
            styleUrls: ['./app/components/album/album.component.css'],
            templateUrl: './app/components/album/album.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http])
    ], AlbumComponent);
    return AlbumComponent;
}());
exports.AlbumComponent = AlbumComponent;
//# sourceMappingURL=album.component.js.map