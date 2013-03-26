/**
 * Parallax Scrolling Tutorial
 * For Smashing Magazine
 * July 2011
 *   
 * Author: Richard Shepherd
 * 		   www.richardshepherd.com
 * 		   @richardshepherd   
 */

// On your marks, get set...
$(document).ready(function(){
						
	// Cache the Window object
	$window = $(window);
	
	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {	
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('Xposition', parseInt($(this).attr('data-Xposition')));
		$(this).data('speedY', parseFloat($(this).attr('data-speedY')));
		$(this).data('speedX', parseFloat($(this).attr('data-speedX')));
	});
	
	// For each element that has a data-type attribute
	$('section[data-type="background"]').each(function(){
	
	
		// Store some variables based on where we are
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		
		// When the window is scrolled...
	    $(window).scroll(function() {
	
			// If this section is in view
			if ( ($window.scrollTop() + $window.height()) > (topOffset) &&
				 ( (topOffset + $self.height()) > $window.scrollTop() ) ) {
	
				// Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speedY'));
				var xPos = ($window.scrollTop() * $self.data('speedX'));
			
				// If this element has a Y offset then add it on
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				}
				
				if ($self.data('Xposition')) {
					xPos += $self.data('Xposition');
				}
				
				// Put together our final background position
				var coords = xPos + '% ' + yPos + 'px';

				// Move the background
				$self.css({ backgroundPosition: coords });
				
				
				// Check for other sprites in this section	
				$('[data-type="sprite"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					
					
					// Use the same calculation to work out how far to scroll the sprite
					var yPos = -($window.scrollTop() / $sprite.data('speedY'));	
					
					//Because we might want speedX to be zero, we adjust the code to use * instead
					var xPos = ($window.scrollTop() * $sprite.data('speedX'));
					
					var coords = (xPos + $sprite.data('Xposition')) + '% ' + (yPos + $sprite.data('offsetY')) + 'px';
					$sprite.css({ backgroundPosition: coords });													
				}); // sprites
				
				// Check for other sprites in this section	
				$('[data-type="spriteQuad"]', $self).each(function() {
					
					// Cache the sprite
					var $sprite = $(this);
					
					// Use the same calculation to work out how far to scroll the sprite
					var curScroll = $window.scrollTop() / 4;
					var yPos = (curScroll / $sprite.data('speedY'));
					var xPos = (curScroll * $sprite.data('speedX'));
									
					var coords = (xPos + $sprite.data('Xposition')) + '% ' + (yPos + $sprite.data('offsetY')) + 'px';
					$sprite.css({ backgroundPosition: coords });
					
				}); // sprites
				
				
			
				// Check for any Videos that need scrolling
				$('[data-type="video"]', $self).each(function() {
					
					// Cache the video
					var $video = $(this);
					
					// There's some repetition going on here, so 
					// feel free to tidy this section up. 
					var yPos = -($window.scrollTop() / $video.data('speedY'));					
					var coords = (yPos + $video.data('offsetY')) + 'px';
	
					$video.css({ top: coords });													
					
				}); // video	
			
			}; // in view
	
		}); // window scroll
			
	});	// each data-type

}); // document ready
