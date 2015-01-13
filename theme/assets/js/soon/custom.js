

/******************************************************************************************************************************
COMING SOON PAGE
*******************************************************************************************************************************/
(function($) {


    /******************************************************************************************************************************
    WEBSOCKET
    *******************************************************************************************************************************/

    var launch = new Date();

    var ws = new WebSocket("ws://127.0.0.1:1880/ws/tweets")

    ws.onopen = function (event) {
//      var now = new Date()
//      setDate(now)
      setCount(0,0);
      setTweets([],0,15)
      ws.send("connected")
    };
    

    ws.onmessage = function(event) { 
        data = JSON.parse(event.data); 
        if (data.payload == "connected") return true;
        console.log(data)
        if (!data.pour) {
            launch = new Date(data.cycle.end);
            setDate();
            setCount(data.count, data.cycle.threshold)
            if (data.tweets.length !=0) {
                setTweets(data.tweets, data.count, data.cycle.tweet_window);
            }
        } else if (data.reset) {
            console.log('reset')
            launch = new Date()
            setDate()
            setCount(0,0);
            setTweets([],0,15)
        }
    };

    function setCount(count, threshold) {
        $("#count").html(count);
        $("#threshold").html(threshold);
    }

    function setTweets(tweets, count, tweet_window) {
        $("#tweets li").each(function(idx, el) {
            index = count - tweet_window + idx;
            if (index < 0) {
                $(el).html('&nbsp;');
            } else if (count < 15) {
                var tweet = tweets[index];
                $(el).css('opacity', (idx+1)/tweet_window);
                $(el).html(index+1 + '. @' + tweet.user.screen_name + ':' + tweet.text);
            } else {
                var tweet = tweets[idx];
                $(el).css('opacity', (idx+1)/tweet_window);
                $(el).html(index+1 + '. @' + tweet.user.screen_name + ':' + tweet.text);
            }
        });
    }

    /**
    * Set your date here  (YEAR, MONTH (0 for January/11 for December), DAY, HOUR, MINUTE, SECOND)
    * according to the GMT+0 Timezone
    **/
    /**
    * The script
    **/
    var message = $('#message');
    var days = $('#days');
    var hours = $('#hours');
    var minutes = $('#minutes');
    var seconds = $('#seconds');
    
    function pad(n, width, z) {
            z = z || '0';
            n = n + '';
            return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
            }
    function setDate(){
        var now = new Date();
        if( launch <= now ){
            //days.html('<h1>0</H1><p>Day</p>');
            //hours.html('<h1>0</h1><p>Hour</p>');
            minutes.html('<h1>00:</h1>');
            seconds.html('<h1>00</h1>');
            //message.html('OUR SITE IS NOT READY YET...');
            ws.send("connected")
        }
        else{
            var s = -now.getTimezoneOffset()*60 + (launch.getTime() - now.getTime())/1000;
            var d = Math.floor(s/86400);
            days.html('<h1>'+d+'</h1><p>Day'+(d>1?'s':''),'</p>');
            s -= d*86400;

            var h = Math.floor(s/3600);
            hours.html('<h1>'+h+'</h1><p>Hour'+(h>1?'s':''),'</p>');
            s -= h*3600;

            var m = Math.floor(s/60);
            minutes.html('<h1>'+pad(m,2)+':</h1>');

            s = Math.floor(s-m*60);
            seconds.html('<h1>'+pad(s,2)+'</h1>');
            setTimeout(setDate, 1000);

            message.html('OUR SITE IS NOT READY YET, BUT WE ARE COMING SOON');
        }
    }
})(jQuery);
/******************************************************************************************************************************
ANIMATIONS
*******************************************************************************************************************************/
(function($) {
    "use strict";
    var isMobile = false;
    if (navigator.userAgent.match(/Android/i) || 
        navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/iPhone/i) || 
        navigator.userAgent.match(/iPad/i)|| 
        navigator.userAgent.match(/iPod/i) || 
        navigator.userAgent.match(/BlackBerry/i)) {                 
        isMobile = true;            
    }
    if (isMobile == true) {
        $('body').removeClass('nomobile');
        $('.animated').removeClass('animated');
    }
    $(function() {
        if (isMobile == false) {
            $('*[data-animated]').addClass('animated');
        }
        function animated_contents() {
            $(".animated:appeared").each(function (i) {
                var $this    = $(this),
                    animated = $(this).data('animated');

                setTimeout(function () {
                    $this.addClass(animated);
                }, 50 * i);
            });
        }
        animated_contents();
        $(window).scroll(function () {
            animated_contents();
        });
    });
})(jQuery);
