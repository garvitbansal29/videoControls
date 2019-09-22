document.addEventListener("DOMContentLoaded", initialiseWebPage);
function initialiseWebPage()
{
    const mmuVideo = document.querySelector("video");
    const playButton = document.getElementById("playPause");
    const muteButton = document.getElementById("muteUnmute");
    const videoScrubSlider = document.getElementById("seekBar");
    const volumeScrubSlider = document.getElementById("volumeBar");
    const currentVolumeLevelDisplay = document.getElementById("volumeLevelField");
    const durationTimeDisplay= document.getElementById("durationField");
    const currentTimeDisplay = document.getElementById("currentTimeField");
    const playbackSpeedControl = document.getElementById("playbackSpeedMenu");
    const forwardStepButton = document.getElementById("forwardStep");
    const backStepButton = document.getElementById("backStep");

    
    playButton.addEventListener("click", playPauseVideo);
    muteButton.addEventListener("click", muteUnmuteVideo);
    videoScrubSlider.addEventListener("input", scrubVideo)
    mmuVideo.addEventListener("timeupdate", movePlaySlider);
    volumeScrubSlider.addEventListener("change", scrubVolume);
    //mmuVideo.addEventListener("volumechange", changeMuteUnmuteCaption);
    mmuVideo.addEventListener("volumechange", updateOnVolumeChange);
    //mmuVideo.addEventListener("volumechange", updateVolumeLevelDisplay);
    mmuVideo.addEventListener("durationchange", displayDuration);
    mmuVideo.addEventListener("timeupdate", displayCurrentTime);    
    playbackSpeedControl.addEventListener("click", changePlaybackRate);
    forwardStepButton.addEventListener("click", skipVideoFoward);
    backStepButton.addEventListener("click", skipVideoBackward);
    backStepButton.addEventListener("dblclick", revindVideoToStart);
    mmuVideo.addEventListener("timeupdate", changePlayButtonCaption);
    document.addEventListener("visibilitychange", playPauseOnVisibility); 
    mmuVideo.addEventListener("loadeddata", initialiseStart)
    document.addEventListener("keydown", applyKeyboardShortcuts)
   

    // If video is paused, then play the video, else pause it.
    // Activates after clicking play button.
    function playPauseVideo()
    {
        if (mmuVideo.paused===true)
        {
            mmuVideo.play();
        }
        else
        {
            mmuVideo.pause();
        }
    }
    
    //If video is muted, then unmte the video, else unmute it.
    function muteUnmuteVideo()
    {
        if (mmuVideo.muted===true)
        {
            mmuVideo.muted=false;
            //intialise volume to 5 when unmuting the video.
            mmuVideo.volume=0.5;
            
        }
        else
        {
            mmuVideo.muted=true;
        }
        
    }
    
    //Triggered when scrub slider is used 
    //sets video time using slider value
    function scrubVideo()
    {   
        //scrub time is calculated by checking video duration,
        //deviding it into 100 parts and multiplying by value of scrub slider, to give us exact time of the video
        const scrubTime = mmuVideo.duration * (videoScrubSlider.value/100);
        mmuVideo.currentTime = scrubTime;
    }
    
    // Triggered when video current time changes
    //Sets value of scrub slider based on current time of video
    function movePlaySlider()
    {
        videoScrubSlider.value=(mmuVideo.currentTime/mmuVideo.duration)*100;        
    }
    
    
    /*/////////////////////////////////////////////////////////////////////////////
                            
    
    --------------------------ASSESSED TASKS-------------------------------------
    
    
    ////////////////////////////////////////////////////////////////////////////*/
    
    //initialise video properties like  current time display and volume when video is first loaded    
    function initialiseStart()
    {
        currentTimeDisplay.value = "00:00";
        mmuVideo.volume=0.5;       
    }
    
    //Change volume of video when slider is used
    function scrubVolume()
    {
        const volumeScrubSliderLevel = volumeScrubSlider.value/10;
        mmuVideo.volume = volumeScrubSliderLevel; 
    }
    
    //Triggers when volume of video changes
    //Change value of the SLIDER, MUTE BUTTON CAPTION and VOLUME LEVEL DISPLAY when volume of video changes
    function updateOnVolumeChange()
    {
        //Multiply volume by 10 as the slider levels go from 0 to 10, while volume levels go from 0 to 1. Therefore factor of 10
        volumeScrubSlider.value=mmuVideo.volume*10;
        
        //set volume display whenever volume changes
        currentVolumeLevelDisplay.value = volumeScrubSlider.value;
        
        //mutes the video if the volumes goes below to 0 and thus changes caption
        if (mmuVideo.volume<0.1)
            {
                mmuVideo.muted=true;
            }
        if (mmuVideo.muted===true)
        {
            muteButton.innerHTML="Unmute";
        }
        if (mmuVideo.muted===false)
        {
            muteButton.innerHTML="Mute";
        }
        
        //mmuVideo.muted is NOT EQUAL to volume = 0
        //change slider value and volume display level when video is muted
        if (mmuVideo.muted===true)
            {
                volumeScrubSlider.value=0;
                currentVolumeLevelDisplay.value = 0;
                muteButton.innerHTML="Unmute";
            }
    }
    
    
    //Display the length of the video in a text box
    function displayDuration()
    {
        let minutes = Math.floor (mmuVideo.duration/60);
        let seconds = Math.floor (mmuVideo.duration%60);
        //devide the "duration" by 60 to get me minutes
        //'mod' the "duration" by 60 to get remainder. Use remainders to set seconds
        if (minutes<10)
            {
                minutes = "0" + minutes;
            }
        if (seconds<10)
            {
                seconds = "0" + seconds;
            }
        durationTimeDisplay.value = minutes + ":" + seconds;     
    }
    
    //Display current time of the video in a textbox
    function displayCurrentTime()
    {
        // '.currentTime' is the current time of the video
        let minutes = Math.floor (mmuVideo.currentTime/60);
        let seconds = Math.floor (mmuVideo.currentTime%60);
        if (minutes<10)
            {
                minutes = "0" + minutes;
            }
        if (seconds<10)
            {
                seconds = "0" + seconds;
            }
        currentTimeDisplay.value = minutes + ":" + seconds;   
    }
    
    //change playback rate of the video
    function changePlaybackRate()
    {
        mmuVideo.playbackRate = playbackSpeedControl.value;
            
    }
    
    //skip video 10 seconds
    function skipVideoFoward()
    {
        //Add 10 seconds to the current time to more forward
        mmuVideo.currentTime=mmuVideo.currentTime+10;        
    }
    
    //skip video back 30 seconds
    function skipVideoBackward()
    {
        //Subtract 30 seconds from the current time to go back 30 seconds
        mmuVideo.currentTime = mmuVideo.currentTime-30;
    }
    
    //It reloads the video when back button is cliked twice.
    //video goes to the start and the initial banner shows up
    function revindVideoToStart()
    {
        mmuVideo.load();
    }  
    
    //Change play button caption based on if the video is paused or playing
    function changePlayButtonCaption()
    {
        if(mmuVideo.paused===true)
            {
                playButton.innerHTML="Play";
            }
        else
            {
                playButton.innerHTML="Pause";
            }
    }
    
    function playPauseOnVisibility()
    {
            //If the page is not visible pause the video
            if (document.visibilityState==="hidden")
            {
                mmuVideo.pause();
            }
            //If the page is visible play the video
            if (document.visibilityState==="visible")
            {
                mmuVideo.play();
            }
    }
    
    //Apply keyboard shortcuts
    function applyKeyboardShortcuts(e)
    {
        //When UP arrow is pressed and volume is LESS than 1, then INCREASE volume by 0.1
        if (e.key === "ArrowUp" && mmuVideo.volume<=0.9)
            {
                if (mmuVideo.muted===true)
                    {
                        mmuVideo.muted=false;
                        mmuVideo.volume=0.1;
                    }
                else
                    {
                        mmuVideo.volume=mmuVideo.volume+0.1;
                    }
                
            }
        //When DOWN arrow is pressed and volume is MORE than 0, then DECREASE volume by 0.1
        if (e.key === "ArrowDown" && mmuVideo.volume>=0.1)
            {
                mmuVideo.volume=mmuVideo.volume-0.1;
            }
        //When up arrow is pressed and volume is less than 1, then increase volume by 0.1
        if (e.key === "ArrowLeft")
            {
                skipVideoBackward();
            }
        //When RIGHT arrow is pressed, then move video FORWARD by 10 seconds
        if (e.key === "ArrowRight")
            {
                skipVideoFoward();
            }
        //When LEFT arrow is pressed, then move video BACK by 30 seconds
        if (e.key === "m")
            {
                muteUnmuteVideo();
            }
        //When SPACEBAR is pressed, then play or pause the video
        if (e.key === " ")
            {
              playPauseVideo();
            }
    }       
}