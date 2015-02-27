angular-off-click
=================

It's like click, but when you don't click on your element.

<h4>Installing</h4>
```
bower install angular-off-click --save
```
```javascript
angular('yourAngularApp',['offClick']);
```

<h4>Usage/Example</h4>
Here we have a slide out navigation div that will appear when the user clicks a button. We want the div to go away when they click off of it (`off-click`).  We also want to make sure the button that triggers the div to open, also does initial close it (`off-click-filter`).
```html
<button id="nav-toggle">Show Navigation</button>
<div id="slide-out-nav" ng-show="showNav" off-click="showNav = false" off-click-filter="'#nav-toggle'" off-click-if="showNav">
    ...
</div>
```

The `off-click` attribute is the expression or function that will execute each time the user doesn't click on your element (or filter)<br />
The optional `off-click-filter` attribute is a comma separated list of selectors that will not trigger `off-click` when they are clicked.<br />
The optional `off-click-if` attribute is an expression that will determine if the `off-click` should trigger or not.

<h4>Other Features</h4>
Ability to choose elements outside of your element that will not trigger the `off-click` event.<br />
Ability to pass an expression to determine of the `off-click` event should trigger.

