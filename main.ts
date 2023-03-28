input.onButtonPressed(Button.A, function () {
    basic.clearScreen()
    mode += 1
    basic.showNumber(mode)
    basic.pause(1000)
    basic.clearScreen()
})
input.onButtonPressed(Button.B, function () {
    while (true) {
        basic.clearScreen()
        basic.showNumber(minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS))
        basic.pause(1000)
        basic.showNumber(minode.LightSensorGetLevel(AnalogConnName.Analog_A2))
        basic.pause(1000)
    }
})
let mode = 0
mode = 0
let timer = 1
basic.forever(function () {
    if (mode >= 3) {
        mode = 0
        basic.clearScreen()
        basic.showNumber(mode)
    }
})
basic.forever(function () {
    if (mode == 0) {
        if (minode.DHTGetTemperature(ConnName.D13, DHTTemStyle.MINODE_DHT_CELSIUS) >= 28) {
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
