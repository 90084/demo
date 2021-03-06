bso.slide.audio = function(config, sectionType){

    var clone = bso.clone(document.querySelector('[data-slide=audio]'));
    
    var progressTime = config.start;
    var currentTime = config.start;
    var player = bso.player();
                           
    clone.querySelector('.text').innerHTML = config.text;    
    clone.querySelector('.slide-inner').setAttribute('class', 'slide-inner ' + sectionType);      
           
    function play(){          
        player.play();
        actionBtn.setAttribute('class', 'btn sprite action pause');         
    }
    
    function pause(){              
        player.pause();
        actionBtn.setAttribute('class', 'btn sprite action play');        
    }
         
    function action(){
        var cls = actionBtn.getAttribute('class');
        if (cls.indexOf('play') !== -1) play()
        else if (cls.indexOf('pause') !== -1) pause()
    }
              
    var actionBtn = clone.querySelector('.action');
    actionBtn.addEventListener('click', action);
    
    var volumeGrip = clone.querySelector('.vol-grip');
    function setVolumeGrip(){        
        volumeGrip.style.height = Math.round(30 * player.volume) + 'px';
        volumeGrip.style.top = Math.round(30 * (1 - player.volume)) + 'px';
    }
       
    clone.querySelector('.vol-plus').addEventListener('click', function(){
        if (player.volume > 0.9) player.volume = 1
        else player.volume+=0.1;
        setVolumeGrip();
    });
    clone.querySelector('.vol-minus').addEventListener('click', function(){        
        if (player.volume < 0.1) player.volume = 0
        else player.volume-=0.1;
        setVolumeGrip();
    });
    setVolumeGrip();
              
    var grip = clone.querySelector('.grip');
    var progress = clone.querySelector('.progress');
    
    var timeupdate = function(){        
        if (player.currentTime >= config.end) {
            pause();
            player.currentTime = config.start;          
            this.complete = true;
            this.emit('complete');
        }
        var position = Math.round(300*(player.currentTime - config.start)/(config.end - config.start));
        if (position < 0) position = 0
        else if (position > 300) position = 300
        
        grip.style.left = (position - 2.5) + 'px';
        
        if (progressTime < player.currentTime){
            progressTime = player.currentTime;
            progress.style.width = position + 'px';            
        }
    }.bind(this);
       
    var isPlaying;
    var gripDragPosition;
    var dragstart = function(evt){
        isPlaying = !player.paused;
        player.pause();
        gripDragPosition = {
            left: parseInt(grip.style.left.replace('px', '')),
            client: bso.getClientX(evt)
        }
        document.addEventListener('mouseup', dragend);
        document.addEventListener('mousemove', dragmove);    
        document.addEventListener('touchend', dragend);
        document.addEventListener('touchmove', dragmove);     
    };
    
    var dragend = function(){        
        document.removeEventListener('mousemove', dragmove);        
        document.removeEventListener('mouseup', dragend);
        document.removeEventListener('touchmove', dragmove);        
        document.removeEventListener('touchend', dragend);  
        var currentTime = config.start + (gripDragPosition.left + 2.5) * (config.end - config.start) / 300;
        if (currentTime < config.start) currentTime = config.start
        else if (currentTime > config.end) currentTime = config.end
    
        player.currentTime = currentTime;        
        if (isPlaying) player.play();
    };
    
    var dragmove = function(evt){
        var clientX = bso.getClientX(evt);        
        var newLeft = gripDragPosition.left + clientX - gripDragPosition.client;

        if (newLeft < -2.5){
            newLeft = -2.5;
        } else if (newLeft > progress.style.width.replace('px', '') - 2.5){
            newLeft = progress.style.width.replace('px', '') - 2.5;
        }
        
        grip.style.left = newLeft + 'px';        
        gripDragPosition.left = newLeft;
        gripDragPosition.client = clientX;
    }
      
    grip.addEventListener('mousedown', dragstart);
    grip.addEventListener('touchstart', dragstart);        
    
    progress.addEventListener('click', function(event){
        var currentTime = config.start + (event.clientX - progress.getBoundingClientRect().left) * (config.end - config.start) / 300;
        if (currentTime < config.start) currentTime = config.start
        else if (currentTime > config.end) currentTime = config.end
        player.currentTime = currentTime; 
    })
    
    document.body.appendChild(clone);
    this.node = document.body.lastElementChild;   
    
    this.enter = function(){       
        player.currentTime = currentTime;
        player.addEventListener('timeupdate', timeupdate); 
        
        //TODO remove these two lines
        //they make audio skippable for demo purposes only
        this.complete = true;
        this.emit('complete');        
    }
    
    this.exit = function(){
        player.removeEventListener('timeupdate', timeupdate);        
        if (actionBtn.getAttribute('class').indexOf('pause') !== -1) pause();
        currentTime = player.currentTime;
    }
    
    bso.evented(this);
}
