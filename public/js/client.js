/* global io, MG */
$(function() {
    var socket = io.connect('/');
    socket.on('arduino', function (state) {

        $('.presence').text(' ' + (state.presence === 1 ? 'Да!' : 'Нет'));
        // var temp = data.match(/<(\d*)C>/)[1],
        //     humid = data.match(/<(\d*)%>/)[1],
        //     pressure = data.match(/<(\d*)mbar>/)[1],
        //     noise = data.match(/<(\d*)noise>/)[1];
        //
        // $('.temp').text(' ' + temp + ' C');
        // $('.humid').text(' ' + humid + ' %');
        // $('.pressure').text(' ' + pressure + ' мбар');
        // $('.noise').text(' ' + noise);
    });

    $
        .getJSON('/graph', function(data) {
            for (var i = 0; i < data.length; i++) {
                data[i].date = new Date(data[i].timestamp);
            }

            data.push({
                date: Date.now(),
                presence: data[data.length - 1].presence
            });

            MG.data_graphic({
                title: 'Presence graph',
                data: data, // an array of objects, such as [{value:100,date:...},...]
                width: 600,
                height: 250,
                target: '.graphic', // the html element that the graphic is inserted in
                x_accessor: 'date',  // the key that accesses the x value
                y_accessor: 'presence', // the key that accesses the y value
                interpolate: 'step'
            });
        });


});
