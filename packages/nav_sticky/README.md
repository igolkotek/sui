###NavSticky usage

__class__: class name

__fixed__ - is top menu fixed in the layout already; _false_ by default, that is one can add menu to a regular layout

__duration__ = 300; transision in ms

__tolerance__ = 0; - scroll tolerance in px before state changes

__offset__ = 0;  vertical offset in px before element is first unpinned (hidden)

For a 60-70 height menu I found offset=100 tolerance=2 good values.