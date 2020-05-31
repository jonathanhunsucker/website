import Func from '/js/func.js';
import Color from '/js/color.js';

/**
 * Draws a project using Chart.js, graphing work completed over time.
 */
export class ChartJsIllustrator {
    constructor(containerElement) {
        if (!window.hasOwnProperty("Chart")) {
            throw new Error("`" + this.constructor.name + "` requires Chart.js library available in `window.Chart`");
        }

        this.canvasElement = document.createElement("canvas");
        while (containerElement.hasChildNodes()) {
            containerElement.removeChild(containerElement.lastChild);
        }
        containerElement.appendChild(this.canvasElement);
    }
    draw(project, worstCase) {
        var days = project.days;

        var labels = days.map((day) => day.label);
        var datasets = [
            this.buildDataset('Baseline', Color.BLUE, project.withVariance({additionalStaff: 0})),
            this.buildDataset('With ' + project.config.additionalStaff + ' additional staff', Color.RED, project),
        ];

        var maxDays = worstCase.timeToComplete;

        var context = this.canvasElement.getContext("2d");
        var chart = new Chart(context, {
            type: 'line',
            data: {
                labels: labels,
                datasets: datasets,
            },
            options: {
                animation: false,
                legend: {
                    onClick: null,
                },
                tooltips: {
                    intersect: false,
                },
                scales: {
                    xAxes: [{
                        labels: Func.range(1, maxDays).map((value) => new Day(value)).map((day) => day.label),
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0,
                            max: project.config.remainingWork,
                        },
                    }],
                },
            },
        });
    }
    buildDataset(label, color, project) {
        return {
            label: label,
            backgroundColor: Color.TRANSPARENT,
            borderColor: color,
            lineTension: 0,
            data: project.days.map((day, index) => {
                return project.days.slice(0, index + 1).map((day) => day.workDone).reduce(Func.add, 0);
            }),
            pointRadius: 0,
        };
    }
}

class Phase {
    constructor(duration, velocity) {
        this.duration = duration;
        this.velocity = velocity;
    }
    get workDone() {
        return this.duration * this.velocity;
    }
}

class Day {
    constructor(number, velocity) {
        this.number = number;
        this.duration = 1;
        this.velocity = velocity;
    }
    get label() {
        return "Day " + this.number;
    }
    get workDone() {
        return this.duration * this.velocity;
    }
}

export class Project {
    constructor(config) {
        this.config = [
            {
                remainingWork: 1000,
                existingStaff: 10,
                additionalStaff: 4,
                productivity: 1,
                assimilationTime: 30,
                assimilationEffort: 0.5,
            },
            config,
            {
                daysUntilAssimilation: 5
            }
        ].reduce(Func.merge, {});
    }
    velocityFor(numberOfStaff) {
        return this.config.productivity * numberOfStaff;
    }
    withVariance(config) {
        return new Project(Func.merge(this.config, config));
    }
    get timeToComplete() {
        return this.days.length;
    }
    get phases() {
        return [
             new Phase(
                this.config.daysUntilAssimilation,
                this.velocityFor(this.config.existingStaff)
            ),
            new Phase(
                this.config.assimilationTime,
                this.velocityFor(this.config.existingStaff - this.config.assimilationEffort * this.config.additionalStaff)
            ),
            new Phase(
                Infinity,
                this.velocityFor(this.config.existingStaff + this.config.additionalStaff)
            ),
        ];
    }
    get days() {
        var remainingWork = this.config.remainingWork;
        var phases = this.phases;

        var days = [];
        var daysRemainingInPhase = 0;
        var number = 1;
        while (remainingWork > 0) {
            while (daysRemainingInPhase === 0) {
                var phase = phases.shift();
                daysRemainingInPhase = phase.duration;
            }

            var day = new Day(number, phase.velocity);
            days.push(day);

            remainingWork -= day.workDone;
            daysRemainingInPhase -= day.duration;
            number += 1;
        }

        return days;
    }
}

