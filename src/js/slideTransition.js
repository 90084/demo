var activeSlide;

bso.slideTransition = function(newSlide, direction){

  if (!activeSlide){
    activeSlide = new bso.slide.loading();
  }
  
  var activeNode = activeSlide.node;
  var newNode = newSlide.node;

  activeNode.addEventListener('transitionend', bso.slideTransitionEnd);

  //position slide ready for transiton
  newNode.setAttribute('class', 'slide ' + direction);

  activeSlide.exit();
  newSlide.enter();
  
  //wait for repaint
  setTimeout(function(){
    //now apply the transitions
    var outDirection = direction === 'left' ? 'right' : direction === 'right' ? 'left' : direction === 'up' ? 'down' : 'up';

    activeNode.setAttribute('class', 'slide ' + outDirection);
    newNode.setAttribute('class', 'slide active');
    activeSlide = newSlide;
  }, 50);
}

bso.slideTransitionEnd = function(evt){
  evt.target.removeEventListener('transitionend', bso.slideTransitionEnd);
  evt.target.setAttribute('class', 'slide');
}