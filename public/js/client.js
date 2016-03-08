$(function() {
    var socket = io.connect("/");
    socket.on('arduino', function (data) {
        var temp = data.match(/<(\d*)C>/)[1],
            humid = data.match(/<(\d*)%>/)[1],
            pressure = data.match(/<(\d*)mbar>/)[1];

        $('.temp').text(' ' + temp + ' C');
        $('.humid').text(' ' + humid + ' %');
        $('.pressure').text(' ' + pressure + ' мбар');
    });
});
