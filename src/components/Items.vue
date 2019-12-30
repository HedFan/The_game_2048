<template>
    <div>
        <div class="block-area">
            <transition-group
                    tag="p"
                    name="nameList"
            >
            <span
                    :key="element.x + element.y"
                    :class="element.x + ' ' + element.y + ' ' + classTitle(element.title)"
                    v-for="element in elements">{{element.title}}</span>
            </transition-group>
            <div class="bg start-game" v-if="startGame">
                <p @click="createFirstEl()">Click for start</p>
            </div>
            <div class="bg finish-game" v-if="finishGame">
                <p @click="restartGame()">Game over <br> Do you wont to try again?</p>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Items",
        data() {
            return {
                x: ['x-first', 'x-second', 'x-third', 'x-fourth'],
                y: ['y-first', 'y-second', 'y-third', 'y-fourth'],
                matrix: [],
                rand: [2, 4],
                elements: [],
                i: 0,
                index: 0,
                activeDir: '',
                activeVal: '',
                startGame: true,
                finishGame: false,

            }
        },
        mounted() {
            document.addEventListener('keydown', () => {
                this.startG(event)
            });
            this.matrixCreate();
        },

        methods: {
            restartGame() {
                this.finishGame = false;
                this.elements = [];
                this.matrixCreate();
                this.createFirstEl();
            },
            matrixCreate() {
                for (let x = 0; x < this.x.length; x++) {
                    for (let y = 0; y < this.y.length; y++) {
                        this.matrix.push([this.x[x], this.y[y]])
                    }
                }
            },
            createFirstEl() {
                this.startGame = false;
                let matrix = this.matrix.length - 1,
                    randomNum = this.random(0, matrix);
                let xres = this.matrix[randomNum][0],
                    yres = this.matrix[randomNum][1],
                    title = this.rand[this.random(0, this.rand.length)];

                this.elements.push({x: xres, y: yres, title: title})
                this.createEl(randomNum);
            },

            createEl(numMatrix) {
                this.matrix.splice(numMatrix, 1);
            },
            createNewEl() {
                let title = this.rand[this.random(0, this.rand.length)];

                let xfirst, yfirst, matrix, randomNum;

                let newArrTry = () => {
                    matrix = this.matrix.length - 1;
                    randomNum = this.random(0, matrix);
                    xfirst = this.matrix[randomNum][0];
                    yfirst = this.matrix[randomNum][1];
                    this.elements.push({x: xfirst, y: yfirst, title: title});
                    this.createEl(randomNum);
                };
                newArrTry()
            },

            startG(event) {
                if (this.finishGame !== true && this.startGame !== true) {
                    switch (event.key) {
                        case 'ArrowRight':
                            this.funcForStart(event.key);
                            this.activeDir = 'X(';
                            break;
                        case 'ArrowLeft':
                            this.funcForStart(event.key);
                            this.activeDir = 'X(-';
                            break;
                        case 'ArrowUp':
                            this.funcForStart(event.key);
                            this.activeDir = 'Y(-';
                            break;
                        case 'ArrowDown':
                            this.funcForStart(event.key);
                            this.activeDir = 'Y(';
                            break;
                    }
                }
            },
            funcForStart(event) {
                console.log(event);
                this.moveTile(event);

            },

            // move
            toMove(val, arr, dir) {
                for (let v = 0; v < 4; v++) {
                    let elInd;
                    if (val === 'ArrowDown' || val === 'ArrowRight') {
                        elInd = '' + (4 - v);
                    } else if (val === 'ArrowLeft' || val === 'ArrowUp') {
                        elInd = '' + (1 + v);
                    }
                    if (arr[v]) {
                        this.matrix.push([arr[v].x, arr[v].y]);
                        arr[v][dir] = dir + '-' + this.translationRev(elInd);
                        let indexOld = this.matrix.findIndex(el => el[0] === arr[v].x && el[1] === arr[v].y);
                        this.matrix.splice(indexOld, 1);


                    }
                }
            },
            // merge
            toMerge(rar, arrVal) {
                for (let v = 0; v <= 4; v++) {
                    if (rar[v] && rar[v + 1]) {
                        if (rar[v].title === rar[v + 1].title) {
                            rar[v].title = rar[v].title * 2;
                            let indexElements = this.elements.findIndex(el => el.x === rar[v + 1].x && el.y === rar[v + 1].y);
                            this.elements.splice(indexElements, 1);
                            this.matrix.push([rar[v + 1].x, rar[v + 1].y]);
                            rar.splice(v + 1, 1);
                            arrVal.push(true);
                        }
                    }
                }
            },

            moveTile(val) {
                let fistVal = val === 'ArrowLeft' || val === 'ArrowRight' ? 'y' : 'x';
                let secondVal = val === 'ArrowDown' || val === 'ArrowUp' ? 'y' : 'x';
                let stepY = 0, stepX = 0, permitForMove = false, arrVal = [];

                switch (val) {
                    case 'ArrowLeft':
                        stepX = -1;
                        break;
                    case 'ArrowRight':
                        stepX = 1;
                        break;
                    case 'ArrowDown':
                        stepY = 1;
                        break;
                    case 'ArrowUp':
                        stepY = -1;
                        break;
                }

                for (let q = 0; q < 4; q++) {
                    let rar = [];
                    this.elements.forEach((item) => {
                        if (this.translation(item[fistVal]) === q + 1) rar.push(item)
                    });

                    rar.sort((a, b) => {
                        if (val === 'ArrowDown' || val === 'ArrowRight') {
                            return this.translation(b[secondVal]) - this.translation(a[secondVal])
                        } else if (val === 'ArrowLeft' || val === 'ArrowUp') {
                            return this.translation(a[secondVal]) - this.translation(b[secondVal])
                        }
                    });

                    this.toMerge(rar, arrVal);
                        for (let v = 0; v < 4; v++) {
                            let elInd;
                            if (val === 'ArrowDown' || val === 'ArrowRight') {
                                elInd = '' + (4 - v);
                            } else if (val === 'ArrowLeft' || val === 'ArrowUp') {
                                elInd = '' + (1 + v);
                            }
                            if (rar[v]) {
                                permitForMove = this.matrix.some((item) => {
                                    return this.translation(item[0]) === this.translation(rar[v].x) + stepX &&
                                        this.translation(item[1]) === this.translation(rar[v].y) + stepY
                                });
                                if (permitForMove) arrVal.push(true)

                            }
                        }
                    if (arrVal.length) this.toMove(val, rar, secondVal);

                }
                if (this.matrix.length === 0) this.finishGame = true;
                if (arrVal.length) this.createNewEl();
            },

            translation(el) {
                let res;
                if (el.indexOf('first') >= 0) res = 1;
                if (el.indexOf('second') >= 0) res = 2;
                if (el.indexOf('third') >= 0) res = 3;
                if (el.indexOf('fourth') >= 0) res = 4;

                return res;
            },
            translationRev(el) {
                let res;
                if (el.indexOf("1") >= 0) res = 'first';
                if (el.indexOf("2") >= 0) res = 'second';
                if (el.indexOf("3") >= 0) res = 'third';
                if (el.indexOf("4") >= 0) res = 'fourth';
                return res;
            },
            random(max, min) {
                return Math.floor((Math.random() * (max - min)) + min);
            },
            classTitle(title) {
                let res;
                switch (title) {
                    case 2:
                        res = 'two';
                        break;
                    case 4:
                        res = 'four';
                        break;
                    case 8:
                        res = 'eight';
                        break;
                    case 16:
                        res = 'sixteen';
                        break;
                    case 32:
                        res = 'thtwo';
                        break;
                    case 64:
                        res = 'sixfour';
                        break;
                    case 128:
                        res = 'onetwoeigth';
                        break;
                    case 256:
                        res = 'twofivesix';
                        break;
                    case 512:
                        res = 'fiveonetwo';
                        break;
                    case 1024:
                        res = 'onezerotwofour';
                        break;
                    case 2048:
                        res = 'twozerofoureight';
                        break;
                }

                return res;
            },
        }
    }
</script>

<style lang="scss">
    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #808080b0;
        z-index: 5;
        text-align: center;

        p {
            width: 100%;
            font-size: 42px;
            font-weight: 700;
            color: #fff4c8;
            position: absolute;
            cursor: pointer;
        }

        &.start-game p {
            top: calc(50% - 30px);
        }

        &.finish-game p {
            top: calc(50% - 95px);
        }
    }

    .block-area {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        span {
            width: 110px;
            height: 110px;
            display: inline-block;
            border-radius: 8px;
            position: absolute;
            text-align: center;
            line-height: 110px;
            font-size: 45px;
            font-weight: 700;
            z-index: 1;

            &.x-first {
                left: 10px;
            }

            &.x-second {
                left: 130px;
            }

            &.x-third {
                left: 250px;
            }

            &.x-fourth {
                left: 370px;
            }

            &.y-first {
                top: 10px;
            }

            &.y-second {
                top: 130px;
            }

            &.y-third {
                top: 250px;
            }

            &.y-fourth {
                top: 370px;
            }

            &.two {
                background-color: #f9f9f9;
            }

            &.four {
                background-color: #fffea5;
            }

            &.eight {

                &.onetwoeigth {
                    background-color: #ec7;
                }

                &.twofivesix {
                    background-color: #ec6;
                }

                &.fiveonetwo {
                    background-color: #ec5;
                }

                &.onezerotwofour {
                    background-color: #ec3;
                }

                &.twozerofoureight {
                    background-color: #ec2;
                }

                background-color: #ffe6b3;
            }

            &.sixteen {
                background-color: #ff8e71;
            }

            &.thtwo {
                background-color: #ff5654;
            }

            &.sixfour {
                background-color: #ff5654;
            }
        }
    }


</style>

