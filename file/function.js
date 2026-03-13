

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight && newWidth > 768) {
        location.replace(location);
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this);
			// Obtém todo o conteúdo, incluindo o delayed
			var fullHtml = $ele.html();
			
			// Remove temporariamente o delayed do HTML para digitação normal
			var delayedMatch = fullHtml.match(/<span class="say delayed"[\s\S]*?<\/span><br>/);
			var delayedHtml = delayedMatch ? delayedMatch[0] : '';
			var normalHtml = fullHtml.replace(delayedHtml, '');
			
			// Limpa o elemento
			$ele.html('');
			
			var progress = 0;
			var timer = setInterval(function() {
				var current = normalHtml.substr(progress, 1);
				if (current == '<') {
					progress = normalHtml.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(normalHtml.substring(0, progress) + (progress & 1 ? '_' : ''));
				
				if (progress >= normalHtml.length) {
					clearInterval(timer);
					// Termina a digitação normal
					$ele.html(normalHtml);
					
					// Após 6 segundos, adiciona e digita o texto delayed
					setTimeout(function() {
						if (delayedHtml) {
							// Adiciona o elemento delayed hidden
							$ele.append(delayedHtml);
							var $delayed = $ele.find(".delayed").hide().fadeIn(500);
							
							// Digita lentamente
							var fullText = $delayed.text();
							$delayed.text('');
							var i = 0;
							
							var slowTimer = setInterval(function() {
								$delayed.text(fullText.substring(0, i + 1));
								i++;
								if (i >= fullText.length) {
									clearInterval(slowTimer);
								}
							}, 75);
						}
					}, 1000);
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "Days <span class=\"digit\">" + days + "</span> Hours <span class=\"digit\">" + hours + "</span> Minutes <span class=\"digit\">" + minutes; 
	$("#clock").html(result);

	var text = "THE WORLD JUST GOT LUCKIER SINCE ";
	$("#message-box").html(text);

}