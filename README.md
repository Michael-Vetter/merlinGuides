
The assignment is to detect elements on a web page that imply they are loading, detect when they
have loaded, and declare the page loaded by calling callback function.

One way would be to loop through each element on the page, looking for any innerHTML
or image reference that matches a list of test strings (such as 'loading', 'load', 'wait', etc.),
then attach an onChange event.

However, it would be impossible to have a complete list that covers any web page. Also, just
because an element is found that matches a test string, does not mean that it is used for loading
content via an AJAX call.

The callWhenReadyToGo function would need a timeout while it waits for all identified
loading events to finish loading. If non-loading elements where found, then the
callWhenReadyToGo would always return when it reaches the timeout, which would not
be a good experience for the user.

Another issue would be with timing. Between the time we identify a loading element
and the time we add an onChange event, the change could already happen, again requiring us to
wait for the entire timeout.

This solution attaches a listener to each ajax call. Each time an ajax call is made,
a counter is incremented. Each time the ajax call comes back, the counter is decremented.
When the counter reaches zero (or we reach a timeout), then we declare the page loaded.

"# merlinGuides" 
