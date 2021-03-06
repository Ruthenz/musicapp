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
var d3 = require("d3-selection");
var d3Scale = require("d3-scale");
var d3Shape = require("d3-shape");
var d3Axis = require("d3-axis");
var d3Array = require("d3-array");
var StatisticsComponent = (function () {
    function StatisticsComponent(http, container) {
        this.http = http;
        this.container = container;
        this.statisticsData = [];
        this.allGenres = [];
    }
    StatisticsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get('/getAllGenres', {}).subscribe(function (data) {
            _this.allGenres = data.json().map(function (g) {
                return ({ "name": g, "count": 0 });
            });
        });
        this.http.get('/getAllAlbumsWithSongs', {}).subscribe(function (data) {
            // Read the result field from the JSON response.
            _this.statisticsData = data.json().map(function (a) {
                var d = { Album: a.name };
                a.songs.forEach(function (element) {
                    _this.allGenres.forEach(function (g) {
                        if (element.genre == g.name) {
                            g.count++;
                            d[g.name] = g.count;
                        }
                    });
                });
                return d;
            });
            _this.initMargins();
            _this.initSvg();
            _this.drawChart(_this.statisticsData);
            console.log(data.json());
        });
    };
    StatisticsComponent.prototype.initMargins = function () {
        this.margin = { top: 20, right: 20, bottom: 30, left: 40 };
    };
    StatisticsComponent.prototype.initSvg = function () {
        this.svg = d3.select(this.container.nativeElement).select('svg');
        this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
        this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
        this.g = this.svg.append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
        this.x = d3Scale.scaleBand()
            .rangeRound([0, this.width])
            .paddingInner(0.05)
            .align(0.1);
        this.y = d3Scale.scaleLinear()
            .rangeRound([this.height, 0]);
        this.z = d3Scale.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    };
    StatisticsComponent.prototype.drawChart = function (data) {
        var _this = this;
        var keys = Object.getOwnPropertyNames(data[0]).slice(1);
        data = data.map(function (v) {
            v.total = keys.map(function (key) { return v[key]; }).reduce(function (a, b) { return a + b; }, 0);
            return v;
        });
        data.sort(function (a, b) { return b.total - a.total; });
        this.x.domain(data.map(function (d) { return d.Album; }));
        this.y.domain([0, d3Array.max(data, function (d) { return d.total; })]).nice();
        this.z.domain(keys);
        this.g.append("g")
            .selectAll("g")
            .data(d3Shape.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function (d) { return _this.z(d.key); })
            .selectAll("rect")
            .data(function (d) { return d; })
            .enter().append("rect")
            .attr("x", function (d) { return _this.x(d.Album); })
            .attr("y", function (d) { return _this.y(d[1]); })
            .attr("height", function (d) { return _this.y(d[0]) - _this.y(d[1]); })
            .attr("width", this.x.bandwidth());
        this.g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));
        this.g.append("g")
            .attr("class", "axis")
            .call(d3Axis.axisLeft(this.y).ticks(null, "s"))
            .append("text")
            .attr("x", 2)
            .attr("y", this.y(this.y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text("Songs");
        var legend = this.g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });
        legend.append("rect")
            .attr("x", this.width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", this.z);
        legend.append("text")
            .attr("x", this.width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) { return d; });
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'statistics',
            styleUrls: ['./app/components/statistics/statistics.component.css'],
            templateUrl: './app/components/statistics/statistics.component.html'
        }),
        __metadata("design:paramtypes", [http_1.Http, core_1.ElementRef])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=statistics.component.js.map