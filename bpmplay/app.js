/*
 * app.js
 * 
 * Запуск приложения.
 * 
 */
var BITS = [],
    VALUE = 120;

function calculation() {
    var bit = (new Date()).getTime(),
        L = [],
        len = BITS.length;
    BITS.splice(0, 0, bit);
    for (var i=0;i<len;i++) {
        var x = BITS[i];
        if (i > 0) {
            var v = (BITS[i-1] - x) / 1000; // /1000 - as python diff time
            v = +(Math.round(v + "e+2") + "e-2");
            if (v >= 2) {
                // Restart capture
                BITS = BITS.slice(0, 1);
                return
            }
            L.push(v)
        }
    }

    if (L.length) {
        var sum = 0;
        for (var i=L.length; i--;) {
            sum += L[i];
        }
        var avg = sum / L.length,
            bps = +(Math.round((1/ avg) + "e+1") + "e-1"),
            bpm = bps * 60;
        VALUE = parseInt(+(Math.round(bpm + "e+0") + "e-0"));
        $('.tempo span').text(VALUE)
    }

    BITS = BITS.slice(0, 12)
}

function mainApp() {
    $('body').on('keydown', function(e) {
        e.preventDefault();
        calculation()
    })
    $('button.drum').on('click', function(e) {
        e.preventDefault();
        calculation()
    })
}

$(document).ready(function($) {
    mainApp()
})
