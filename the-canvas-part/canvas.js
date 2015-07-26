document.addEventListener('DOMContentLoaded', domloaded, false);
function domloaded() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.textAlign = 'left';
    ctx.font = '20px Titillium Web';



    setInterval(showClock, 1000);
    var currentSeconds = -1;
    var score = 50;
    function showClock() {
        var angle;
        var secHandLength = 60;
        var howMuchTime = 120; //in seconds, gentlemen
        var positionForY = 100;

        // CLEAR EVERYTHING ON THE CANVAS. RE-DRAW NEW ELEMENTS EVERY SECOND.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Draw clock inside shits
        OUTER_DIAL1();
        OUTER_DIAL2();
        CENTER_DIAL();
        MARK_THE_SECONDS();
        //Action goes here
        SHOW_SECONDS(currentSeconds);
        DRAW_SCORE(score);

        function DRAW_SCORE(score) {
            ctx.fillStyle = '#000000';
            var scoreText = "Score: " + score + " points";
            ctx.fillText(scoreText, canvas.width / 2 - ((scoreText.length + 1) * 4), positionForY + 300);
        }

        function OUTER_DIAL1() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, positionForY, secHandLength + 10, 0, Math.PI * 2);
            ctx.strokeStyle = '#92949C';
            ctx.stroke();
        }
        function OUTER_DIAL2() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, positionForY, secHandLength + 7, 0, Math.PI * 2);
            ctx.strokeStyle = '#929BAC';
            ctx.stroke();
        }
        function CENTER_DIAL() {
            ctx.beginPath();
            ctx.arc(canvas.width / 2, positionForY, 2, 0, Math.PI * 2);
            ctx.lineWidth = 3;
            ctx.fillStyle = '#353535';
            ctx.strokeStyle = '#0C3D4A';
            ctx.stroke();
        }

        function MARK_THE_SECONDS() {

            for (var i = 0; i < howMuchTime; i++) {
                angle = (i - 3) * (Math.PI * 2) / howMuchTime;       // THE ANGLE TO MARK.
                ctx.lineWidth = 1;            // HAND WIDTH.
                ctx.beginPath();

                var x1 = (canvas.width / 2) + Math.cos(angle) * (secHandLength);
                var y1 = (positionForY) + Math.sin(angle) * (secHandLength);
                var x2 = (canvas.width / 2) + Math.cos(angle) * (secHandLength - (secHandLength / 30));
                var y2 = (positionForY) + Math.sin(angle) * (secHandLength - (secHandLength / 30));

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);

                ctx.strokeStyle = '#C4D1D5';
                ctx.stroke();
            }
        }

        function SHOW_SECONDS(startSeconds) {

            var sec = startSeconds + 1;
            angle = ((Math.PI * 2) * (sec / howMuchTime)) - ((Math.PI * 2) / 4);



            ctx.lineWidth = 1.5;              // HAND WIDTH.

            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, positionForY);                    // START FROM CENTER OF THE CLOCK.
            ctx.lineTo((canvas.width / 2 + Math.cos(angle) * secHandLength),    // DRAW THE LENGTH.
                positionForY + Math.sin(angle) * secHandLength);

            // DRAW THE TAIL OF THE SECONDS HAND.
            ctx.moveTo(canvas.width / 2, positionForY);       // START FROM CENTER OF THE CLOCK.
            ctx.lineTo((canvas.width / 2 - Math.cos(angle) * 20),      // DRAW THE LENGTH.
                positionForY - Math.sin(angle) * 20);

            ctx.strokeStyle = '#586A73';        // COLOR OF THE HAND.
            if (sec >= howMuchTime - (3 / 9 * howMuchTime)) {
                ctx.strokeStyle = '#FF6600';        // COLOR OF THE HAND.
            }
            if (sec >= howMuchTime - (1 / 9 * howMuchTime)) {
                ctx.strokeStyle = '#FF0000';        // COLOR OF THE HAND.
            }

            ctx.stroke();
            if (currentSeconds < howMuchTime - 1) {
                score += 10;
                currentSeconds += 1;
            }
        }
    }
}