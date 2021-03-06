/*
 * app.js
 * 
 * Запуск приложения.
 * 
 */
var BITS = [],
    VALUE = 0,
    EXCLUDE_KEYS = [112,113,114,115,116,117,118,119,120,121,122,123];

function calculation() {
    var bit = (new Date()).getTime(),
        L = [];
    BITS.splice(0, 0, bit);
    for (var i=0;i<BITS.length;i++) {
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
        if (EXCLUDE_KEYS.indexOf(e.which) < 0) {
            e.preventDefault();
            calculation()
        }
    })
    $('button.drum').on('click', function(e) {
        e.preventDefault();
        calculation()
    })
}

$(document).ready(function($) {
    mainApp()
})
