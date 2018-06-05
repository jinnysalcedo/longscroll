// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// function debounce was taken from https://davidwalsh.name/javascript-debounce-function
// this is to make the image bounce
function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout; // "&&" means "and" for something to be true, both statements need to be true
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

const sliderImages = document.querySelectorAll('.slide-in');
// querySelectorAll gets all elements in the document with the class name of "slide in"
// or any name that you give the class
// constants cannot be changed but variables can

// forEach() method calls a  function once for each element in an array in order
// (e) is short for Event
// => "=" equals the input, ">" equals the output

// checkslide will run everytime the browser is scrolling


function checkSlide (e) {
	//console.count(e);
	sliderImages.forEach(sliderImage => {
		// halfway mark of image
		const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
		// bottom marking of image
		const imageBottom = sliderImage.offsetTop + sliderImage.height;
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		const isNotScrolledPast = window.scrollY < imageBottom;
		if (isHalfShown && isNotScrolledPast) {
			sliderImage.classList.add('active');
		} else {
			sliderImage.classList.remove('active');
		}
	});
}

window.addEventListener('scroll', debounce(checkSlide));
