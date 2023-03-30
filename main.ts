input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    mode += 1
    basic.showNumber(mode)
    basic.pause(1000)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    while (!(input.buttonIsPressed(Button.A))) {
        basic.clearScreen()
        basic.showNumber(minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS))
        basic.pause(1000)
        basic.showNumber(minode.LightSensorGetLevel(AnalogConnName.Analog_A2))
        basic.pause(1000)
        basic.showNumber(minode.DHTGetHumidity(ConnName.A0))
        basic.pause(1000)
    }
})
let gvocht = 0
let mode = 0
mode = 0
let timer = 1
radio.setGroup(255)
basic.forever(function () {
    if (minode.DHTGetTemperature(ConnName.A0, DHTTemStyle.MINODE_DHT_CELSIUS) >= 30) {
        music.playTone(262, music.beat(BeatFraction.Whole))
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (gvocht >= 1000) {
            for (let index = 0; index < 1; index++) {
                minode.FanControl_1(AnalogConnName.Analog_A0, 1)
                basic.pause(200)
                minode.FanControl_1(AnalogConnName.Analog_A0, 0)
            }
        } else if (gvocht < 1000) {
            for (let index = 0; index < 1; index++) {
                minode.FanControl_1(AnalogConnName.Analog_A0, -1)
                basic.pause(200)
                minode.FanControl_1(AnalogConnName.Analog_A0, 0)
            }
        }
    }
})
basic.forever(function () {
    pins.analogWritePin(AnalogPin.P1, 1023)
    gvocht = pins.analogReadPin(AnalogPin.P0)
    pins.analogWritePin(AnalogPin.P1, 1023)
})
basic.forever(function () {
    if (mode == 3) {
        if (minode.switchIsOpened(ConnName.A0)) {
            for (let index = 0; index < 1; index++) {
                minode.FanControl_1(AnalogConnName.Analog_A0, 1)
                basic.pause(200)
                minode.FanControl_1(AnalogConnName.Analog_A0, 0)
            }
        }
        if (!(minode.switchIsOpened(ConnName.A0))) {
            for (let index = 0; index < 1; index++) {
                minode.FanControl_1(AnalogConnName.Analog_A0, -1)
                basic.pause(200)
                minode.FanControl_1(AnalogConnName.Analog_A0, 0)
            }
        }
    }
})
basic.forever(function () {
    if (!((0 as any) == (3 as any))) {
        if (minode.switchIsOpened(ConnName.A0)) {
            radio.sendNumber(minode.DHTGetTemperature(ConnName.A0, DHTTemStyle.MINODE_DHT_CELSIUS))
            radio.sendNumber(minode.LightSensorGetLevel(AnalogConnName.Analog_A0))
            radio.sendNumber(minode.DHTGetHumidity(ConnName.A0))
            radio.sendNumber(gvocht)
        }
    }
})
basic.forever(function () {
    if (mode >= 4) {
        mode = 0
        basic.clearScreen()
        basic.showNumber(mode)
        basic.pause(1000)
        basic.clearScreen()
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS) >= 27) {
            minode.FanControl_1(AnalogConnName.Analog_A0, 100)
        } else {
            minode.FanControl_1(AnalogConnName.Analog_A0, 0)
        }
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (timer == 1 && minode.LightSensorGetLevel(AnalogConnName.Analog_A2) <= 3) {
            minode.RGBSetColor(
            ConnName.D14,
            0,
            0,
            100
            )
        } else {
            minode.RGBSetColor(
            ConnName.D14,
            0,
            0,
            0
            )
        }
    }
})
basic.forever(function () {
    timer = 1
    basic.pause(16000)
    timer = 0
    basic.pause(8000)
})
