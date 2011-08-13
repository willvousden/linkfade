(function($)
{
	var configureAnimation = function(element, property, callback)
	{
		$element = $(element);

		var normalValue = $element.data('normal-value:' + property);
		if (normalValue === undefined)
		{
			normalValue = $element.css(property);
			$element.data('normal-value:' + property, normalValue);
		}

		$element.hover(function()
		{
			var altValue = $(this).data('alt-value:' + property);
			if (altValue === undefined)
			{
				altValue = $(this).css(property);
				$(this).data('alt-value:' + property, altValue);
			}

			// Generate the animation style and set the starting colour.
			var style = { };
			style[property] = altValue;
			$(this).css(property, normalValue);

			// Trigger a new animation.
			callback(this, style);
		}, function()
		{
			var altValue = $(this).data('alt-value:' + property);

			// Generate the animation style and set the starting colour.
			var style = { };
			style[property] = normalValue;
			$(this).css(property, altValue);

			// Trigger a new animation.
			callback(this, style);
		});
	};

	$.fn.linkFade = function(options)
	{
		options = $.extend($.fn.linkFade.defaults, options);
		this.each(function()
		{
			// Define a base style to animate to for this element.
			var style = { };
			var callback = function(element, newStyle)
			{
				// Add the changes to this style and restart the animation.
				style = $.extend(style, newStyle);
				$(element).stop().animate(style, options.speed);
			}

			for (key in options.properties)
			{
				configureAnimation(this, options.properties[key], callback);
			}
		});
	};

	$.fn.linkFade.defaults =
	{
		speed: 'fast',
		properties: [ 'color' ]
	};
})(jQuery);
