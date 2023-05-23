input.onButtonPressed(Button.A, function () {
    if (!(minode.switchIsOpened(ConnName.A0))) {
        if (mode >= 4) {
            basic.clearScreen()
            mode = 0
            basic.clearScreen()
            basic.showNumber(mode)
            basic.pause(1000)
            basic.clearScreen()
        } else {
            basic.clearScreen()
            mode += 1
            basic.showNumber(mode)
            basic.pause(1000)
            basic.clearScreen()
        }
    } else {
        if (mode2 >= 1) {
            mode2 = 0
            basic.clearScreen()
            basic.showNumber(mode2)
            radio.sendNumber(mode2)
            basic.pause(1000)
            basic.clearScreen()
        } else {
            basic.clearScreen()
            mode2 += 1
            basic.showNumber(mode2)
            radio.sendNumber(mode2)
            basic.pause(1000)
            basic.clearScreen()
        }
    }
})
input.onButtonPressed(Button.B, function () {
    for (let index = 0; index < 1; index++) {
        basic.clearScreen()
        basic.showNumber(minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS))
        basic.pause(1000)
        basic.showNumber(minode.LightSensorGetLevel(AnalogConnName.Analog_A2))
        basic.pause(1000)
        basic.showNumber(minode.DHTGetHumidity(ConnName.D13))
        basic.pause(1000)
        basic.showNumber(co2)
        basic.pause(1000)
    }
})
let raam = 0
let co2 = 0
let mode = 0
let mode2 = 0
pins.setPull(DigitalPin.P0, PinPullMode.PullNone)
mode2 = 0
mode = 0
let timer = 1
radio.setGroup(255)
radio.setTransmitPower(7)
basic.forever(function () {
    if (mode2 == 0) {
        radio.sendNumber(minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS))
    } else {
        radio.sendNumber(minode.DHTGetHumidity(ConnName.D13))
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS) >= 26) {
            minode.FanControl_1(AnalogConnName.Analog_A1, 100)
        } else {
            minode.FanControl_1(AnalogConnName.Analog_A1, 50)
        }
    } else if (mode != 0) {
        minode.FanControl_1(AnalogConnName.Analog_A1, 50)
    }
})
basic.forever(function () {
    if (co2 >= 800) {
        raam = 1
    } else {
        raam = 0
    }
})
basic.forever(function () {
    co2 = pins.analogReadPin(AnalogPin.P0) * 3
})
basic.forever(function () {
    timer = 1
    basic.pause(16000)
    timer = 0
    basic.pause(8000)
})
basic.forever(function () {
    if (mode == 0) {
        if (timer == 1 && minode.LightSensorGetLevel(AnalogConnName.Analog_A2) >= 3) {
            minode.RGBSetColor(
            ConnName.D14,
            90,
            0,
            10
            )
        } else {
            minode.RGBSetColor(
            ConnName.D14,
            0,
            0,
            0
            )
        }
    } else {
        minode.RGBSetColor(
        ConnName.D14,
        0,
        0,
        0
        )
    }
})
