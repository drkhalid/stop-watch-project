class Component {
    notify() {
        this.callback();
    }

    register(callback) {
        this.callback = callback;
    }

    render() {}
}

class Renderer {
    constructor(component, destination) {
        this.render = component.render.bind(component);
        this.destination = destination;

        component.register(() => {
            return this.listen();
        });

        this.listen();
    }

    listen() {
        this.destination.innerHTML = '';
        this.destination.appendChild(this.render());
    }
}

class StopWatch extends Component {
    constructor() {

        super();
        var time = 0;
        this.timePrint = "00 : 00 : 00 : 000";
        var interval;
        var offSet;
        this.current;

        function update() {
            if (this.isON) {
                time += delta()
            };
            this.timePrint = timeFormatter(time)

            this.notify()
        };

        function delta() {
            var now = Date.now();
            var timePassed = now - offSet;
            offSet = now

            return timePassed
        };

        function timeFormatter(timeInMilliseconds) {
            var time = new Date(timeInMilliseconds)
            var hours = (time.getHours() - 3).toString();
            var minutes = time.getMinutes().toString();
            var seconds = time.getSeconds().toString();
            var milliseconds = time.getMilliseconds().toString();

            if (hours.length < 2) {
                hours = '0' + hours;
            }
            if (seconds.length < 2) {
                seconds = '0' + seconds;
            }
            if (minutes.length < 2) {
                minutes = '0' + minutes;
            }
            while (milliseconds.length < 3) {
                milliseconds = '0' + milliseconds;
            }
            return hours + ' : ' + minutes + ' : ' + seconds + ' : ' + milliseconds;
        };

        this.isON = false;

        this.Start = function () {
            if (!this.isON) {
                interval = setInterval(update.bind(this), 99);
                offSet = Date.now();
                this.isON = true;
                this.notify()

            }
        };

        this.Stop = function () {
            if (this.isON) {
                clearInterval(interval);
                interval = null;
                this.isON = false;
                this.notify()

            }
        };

        this.Reset = function () {
            if (!this.isON) {
                time = 0;
                this.timePrint = "00 : 00 : 00 : 000"
                this.notify()
            }
        }

    }

    render() {
        return $('<div>').addClass('watch-stop-class').append(
            [
                $('<h1>').html(`${this.timePrint}`).addClass('timeprint'),
                $('<div>').addClass('buttons').html(
                    [
                        $('<button>').html('Start').on('click', () => this.Start()).addClass('btn'),
                        $('<button>').html('Pause').on('click', () => this.Stop()).addClass('btn'),
                        $('<button>').html('Reset').on('click', () => this.Reset()).addClass('btn')
                    ]
                )
            ]
        )[0];
    }
}