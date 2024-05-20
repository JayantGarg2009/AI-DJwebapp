song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist=0;
scoreRightWrist=0;



function preload()
{
    song=loadSound('music.mp3');

}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video , modalLoaded);
    poseNet.on('pose' , gotPoses);

    

}
function modalLoaded()
{
    console.log('posenet is initialized');
}
function gotPoses(result)
{
    if(result.length>0)
        {
            console.log(result);
            scoreLeftWrist = result[0].pose.keypoints[9].score;
            leftWristx = result[0].pose.leftWrist.x;
            leftWristy = result[0].pose.leftWrist.y;
            console.log("Left Wristx = " +leftWristx+ "Left Wristy=  " +leftWristy);

            scoreRightWrist = result[0].pose.keypoints[10].score;
            rightWristx = result[0].pose.rightWrist.x;
            rightWristy = result[0].pose.rightWrist.y;
            console.log("right wrist x =" +rightWristx+ "right wrist y = " + rightWristy);

        }
}

function draw()
{

    image(video , 0 , 0 , 600 , 500  );
    fill('red');
    stroke('black');

    if(scoreLeftWrist>0.2)
        {
    circle(leftWristx , leftWristy , 20);

    leftwristy_innumber = Number(leftWristy);
    leftwristy_withoutdecimal = floor(leftwristy_innumber);
    volume = leftwristy_withoutdecimal/1000;
    song.setVolume(volume);
     document.getElementById("volume").innerHTML = "Volume="+volume;
    }


    
    if(scoreRightWrist>0.2){ 
        circle(rightWristx , rightWristy , 20); 
    
    if(rightWristy >0 && rightWristy <= 100)
    {
        document.getElementById("speed").innerHTML = "Speed = 0.5x";		
        song.rate(0.5);
    }

   else if(rightWristy >100 && rightWristy <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";		
            song.rate(1);
        }
        else if(rightWristy >200 && rightWristy <= 300)
            {
                document.getElementById("speed").innerHTML = "Speed = 1.5x";		
                song.rate(1.5);
            }

            else if(rightWristy >300 && rightWristy <= 400)
                {
                    document.getElementById("speed").innerHTML = "Speed = 2x";		
                    song.rate(2);
                }
                else if(rightWristy >400 && rightWristy <= 500)
                    {
                        document.getElementById("speed").innerHTML = "Speed = 2.5x";		
                        song.rate(2.5);
                    }
    
    }
}
    







function play()
{
    
    song.setVolume(1);
    song.rate(1);
    song.play();
}
function stop()
{
    song.stop();
}
