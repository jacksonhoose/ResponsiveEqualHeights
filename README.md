# Equalheights

A simple jquery plugin for making elements equal heights.

# Example 

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/EqualHeights.min.js"></script>
<script>
	jQuery(function($) {
		$('#parent').equalHeights({
			target: '.child-selector', // selector [optional] specify a child selector.  default is immediate jquery.children()
			debounce: 666, // int [optional] if underscore is on the page you can specify the debounce rate - http://underscorejs.org/#debounce
			breakpoints: ['> 768', '< 500'] // array [optional] if there are breakpoints defined the equal heights function will only fire on specified window widths
		});
	});
</script>
```