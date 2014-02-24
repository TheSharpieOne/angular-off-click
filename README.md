angular-off-click
=================

Its like click, but when you don't click on your element.

For now, it requires jQuery beause angular.element doesn't have all of the things and I just wiped it together.  Eventually I will replace the jQuery things (`parents`, `filter`, `add`).

<h4>Usage/Example</h4>
Here we have a slide out navigation div that will appear when the user clicks a button. We want the div to go away when they click off of it (`off-click`).  We also want to make sure the button that triggers the div to open, also does initial close it (`off-click-filter`).
```html
<button id="nav-toggle">Show Navigation</button>
<div id="slide-out-nav" ng-show='showNav' off-click='showNav = false' off-click-filter='#nav-toggle' off-click-if='showNav'>
    ...
</div>
```

The `off-click` attribute is the expression or function that will execute each time the user doesn't click on your element (or filter)<br />
The opitonal `off-click-filter` attribute is a comma separated list of selectors that will not trigger `off-click` when they are clicked.<br />
Thr optional `off-click-if` attribute is an expression that will determine if the `off-click` should trigger or not.
