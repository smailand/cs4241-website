For the technical achievement portion of this project I worked to make a canvas that could be drawn on.

While it might appear that there is only one event handler action type of "clicked", this is not
the case for this website, although all of my actions revolve around the mouse. I wanted to play around with
the difference between "clicked", "mousedown", "mouseup", and the other actions that happen when you you press
the mouse button down.

I also added the ability to change the color that is drawn using two different methods, depending on whether
bubbling is turned on or off (which can be set by the user).

While bubbling is technically on at all times, when the bubbling setting is off, it means that I stop the
propagation of the event before it has time to "bubble" up past the lower level DOM object.

When bubbling is "off" then only clicking the div above the red line will change the color, but clicking
inside the drawing canvas to draw does not change the pen color (as would be expected). However, when I
turn bubbling on, the color changes when any location above the red line is clicked, even inside the canvas
when the user clicks to draw (not good behavior).



Found at:

https://sfmailand-cs4241.herokuapp.com/assignment6
