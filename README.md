[![GitHub version](https://badge.fury.io/gh/TheSharpieOne%2Fangular-off-click.svg)](https://badge.fury.io/gh/TheSharpieOne%2Fangular-off-click) [![npm version](https://badge.fury.io/js/angular-off-click.svg)](https://badge.fury.io/js/angular-off-click) [![Bower version](https://badge.fury.io/bo/angular-off-click.svg)](https://badge.fury.io/bo/angular-off-click) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/TheSharpieOne/angular-off-click/master/LICENSE.md)
angular-off-click
=================

It's like click, but when you don't click on your element.

<h4>Installing</h4>

```
npm install angular-off-click --save
```
```html
<script src="node_modules/angular-off-click/dist/angular-off-click.js"></script>
```

-OR-
```
bower install angular-off-click --save
```
```html
<script src="bower_components/angular-off-click/dist/angular-off-click.js"></script>
```

-THEN-
```javascript
angular('yourAngularApp',['offClick']);
```

<h4>Usage/Example</h4>
Here we have a slide out navigation div that will appear when the user clicks a button. We want the div to go away when they click off of it (`off-click`).  We also want to make sure the button that triggers the div to open, also does initial close it (`off-click-filter`).
```html
<button id="nav-toggle" off-click-filter="'#slide-out-nav'" ng-click="showNav = !showNav">Show Navigation</button>
<div id="slide-out-nav" ng-show="showNav" off-click="showNav = false" off-click-if="showNav">
    ...
</div>
```

The `off-click` attribute is the expression or function that will execute each time the user doesn't click on your element (or filter)<br />

The optional `off-click-if` attribute is an expression that will determine if the `off-click` should trigger or not.<br/>

The included `off-click-filter` directive allows you to pass a comma separated list of targets whose `off-click` will not be triggered when the element `off-click-filter` was applied to is clicked (gets parsed as javascript, so remember to wrap in single quotes).
If you pass `off-click-filter="'*'"` that element will be a filter for every off-click on the page. The value is an angular expression and as such, you can also pass dynamic values like so: `off-click-filter="'#' + myIdInScope"` and `off-click-filter="myScopedVar"`.
