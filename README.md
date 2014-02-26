# Equalheights

A jquery plugin for making elements equal heights.

# Example 

In your web page:

```html
<script src="jquery.js"></script>
<script src="dist/EqualHeights.min.js"></script>
<script>
	jQuery(function($) {
		$('#parent').equalHeights({
			target: '.child-selector', // a child element
			debounce: 300 // if underscore is on the page you can specify the debounce rate
		});
	});
</script>
```