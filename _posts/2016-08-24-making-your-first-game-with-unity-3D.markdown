---
layout: post
title: "Making Your First Game with Unity 3D"
date: 2016-08-24 22:52:00 +0500
categories: games
---

## Overview


So you're in your first semester of university, taking Programming 101 and thinking of what to build for your first project. Obviously, building a game is on of the top items on your list of ideas. It's a way of seeing solid, graphical result of your programming skills. But wait, you've no idea where to begin. All those graphics libraries seem cumbersome; all that effort and lines of code just to load one image or one clip of audio?! 

Luckily, one of the options available to you is to use a game engine. It renders images and audio clips easily, gives you an easy-to-use and an easy-to-learn interface. So, let's get started with the process.

In the following post, we'll cover the general aesthetics of making a game, while ignoring some of the minor details on how to use Unity. If you're a beginner and are using Unity for the first time, some of it may seem alien to you. I would suggest doing one of the basic tutorials found [here](https://unity3d.com/learn/tutorials). Personally, I followed the 'Roll a Ball' one.


## Things You'll Need

1. Unity 3D version 4 or higher (duh)
2. Your creative skills
3. A pen and paper


## Designing Your Game

It's a good idea to start by writing down details about your game and what it's going to be like. This will help you later on with the programming, as you'll break this description down into subprocesses or goals you need to achieve.

For the sake of this post, we'll start off by designing a simple game. Since i absolutely looooove cats, I've decided that my main character is going to be a cat. :3

Cats love to eat, so we'll start off with our main character trying to eat things. Among the food it tries to eat will be good food (that increases its score or health) and bad food (that decreases its health). 

To sum it up, here's our idea: You're a fat cat, strolling down the streets of a city, with random food coming at you. You can jump or duck. Your goal is to have maximum score, while avoiding the bad food.

You can now get started with the artwork. It's a good idea to design any characters with complex animations for a character rig. In our case, our main character will have complex animations - it'll have to walk, jump, crouch. Therefore we'll design a character rig for a cat, like so:

{% include image.html
            img="cat.png"
            title="title for image"
            caption="Cat Rig" %}

The rest of our items i.e. the food, background (sky, buildings, clouds. etc), will be drawn simply. Don't worry if your drawing skills are not that great. 

Keep in mind that you'll probably need some UI elements as well, so go ahead and draw a pause and play button, and a start screen.

It's a good idea to keep the background of your elements transparent and export a png file. 

Here's a mockup of what our game would look like:

{% include image.html
            img="gameMockup.jpg"
            title="title for image"
            caption="Game Mockup" %}

## Moving on to the Unity Part

Now, go ahead and install Unity 3D. Create a new project, name it whatever you want and select 3D (even though we're creating a 2D project). Click create project.

You'll notice that you're currently sititng in the assets folder. Just to help yourself be more organized, create an images folder and move all the images you made here.

## Creating the Start Screen

Firsty, create your start screen in a separate scene, ideally in the UI canvas. Add a button to go to the next scene i.e. the game itself. Create a C# script, with a function as follows:

{% highlight ruby %}
	public void StartGame(){
		Application.LoadLevel ("Game");
	}
#=> code for UI button in main menu
{% endhighlight %}

"Game" is the name of your scene which will contain the rest of your game. 

Simply associate this function with the button under Button(Script) section. 

## Creating the Main Game Scene

Now, moving on to the hard part. Before you start, break your game into small subtasks:

1. Assembling the character rig
2. Adding animations to the main character
	* Running animation
	* Jump animation
	* Crouch animation
3. Adding jump to the main character
4. Adding crouch to the main character
5. Adding food
	* Moving the food towards the player
	* Generating food randomly and automatically
6. Adding player health and score
7. Adding functionality to the UI elements
8. Adding background elements

A thing to note is that for our game, we won't be moving the player in any horizontal direction. Instead, we'll move every other element towards the player to give the illusion that the player is moving.


### 1. Assembling the character rig
Using the character image we created. we will split it up in Unity using Unity's sprite editor. This way, the arms, legs, torso and head of the character will get split into separate images itself. Assemble them on the scene, while maintaining the hierarchy.

### 2. Adding animations to the main character

*Running animation*

Since all the limbs of your character are separate images, it's going to be easier to position and control them in the animator. Add an animator to the player, and create animation for running. This is going to be your default state. 

*Jumping animation*

For this animation, we're going to create 3 states, two of which are going to be the transition states (run-to-jump, and jump-to-run). Create them as such, so that in run-to-jump the character positions itself for the jump position, and reverse for the jump-to-run. 

A thing to note here is that we need to program the rigidbody and box collider as well, as we'll use purely animations to make the player crouch. So when you're positioning the player in the crouch position, resize the box collider as well.

*Crouching animation*

The idea is same as above. Two transition states and one continous one. For the crouch and jump animtaion itself, check the 'Loop time' box. 
Note: For better response, you may want to transition jump-to-run to go directly to run-to-crouch, in case the player presses the crouch button while in air. More on this later on. 

Your final state diagram should look like this:

{% include image.html
            img="stateDiagram.jpg"
            title="title for image"
            caption="Animation State Diagram" %}


### 3. Adding jump to the main character
Firstly, we need the character to be on a ground. Unity's physics engine will help us with this. Simply create an empty GameObject and name it 'Player', and a second empty GameObject and name it 'Ground'. We need to follow the rules of physics and make gravity act on the player, while applying a force to make it jump. Again, the physics engine will handle the details and move the player back down to the ground. 

To the player object, add a 2D Box Collider, as well as a 2D Rigidbody. Make sure 'Is Trigger' is unchecked in the Box Collider, and 'Is Kinematic' is unchecked in the Rigidbody. To the ground object. again add a rigidbody and a box collider. This time, check the 'Is Kinematic' box for the rigidbody, while leaving the 'Is Trigger' box for the box collider unchecked.

All of this will add gravity to your player, while keeping gravity from acting on the ground object. This is due to the 'Is Kinematic' box for the Rigidbody.

Now that your player is grounded, we move towards programming the jump. For this game, we want the cat to jump higher based on how long the spacebar is pressed. Before we get started, here's the code:

{% highlight ruby %}

#=> if player is on ground and jump is pressed initially
if (onGround) {

	if (Input.GetButtonDown ("Jump")) {
		onGround = false;
		jumpPressed = true;
	}

}

#=> if player is in air and spacebar is kept pressed
if (!onGround) {
	if(Input.GetButton("Jump") && newCatPosY<=10f && jumpPressed==true)
	{
		newCatPosY+=0.3f;
		cat.transform.position = new Vector3 (-9.3f,newCatPosY,0f);

	}
#=> spacebar is let go of
	if (Input.GetButtonUp ("Jump")) {
		jumpPressed = false;
	}
}
		

#=> code for UI button in main menu
{% endhighlight %}

Firstly, we want to detect the case where the player is on the ground, and the jump key is pressed for the first time. For this case, we use *GetButtonDown*, which simply detect when a button is pressed, and doesn't detect if it's held. We also need to know if the player is actually on the ground, for which we use a boolean called onGround. We will set this bool as we go along and with collision detection. This case is used mainly to set the bools, and doesn't modify the position of the player.

Next case is where we want to move the player upwards, and at the same time detect if the spacebar is held pressed. For this case, we use the *GetButton* function. We want to make sure that the player just doesn't keep on going higher, so we modify the *newCatPosY* variable, which we've created ourself. We simply apply this variable to the player's position using the *transform* function. 

Third case is where the player is in the air, and spacebar is let go of. For this case we use the *GetButtonUp* function, which simply detects when a button is unpressed. We use this to set the jumpPressed variable, which is a kind of boolean we use to detect the jump.

Now that the jump has been programmed, we move on to the next part. 

### 4. Adding crouch to the player

This one is kind of similar to the functionality we added above, except we're going to handle this purely with animations. 

Remember those animations we made earlier and added transitions between them? Now it's time to activate those. The following code will help you understand this better:

{% highlight ruby %}
if (Input.GetKeyDown (KeyCode.DownArrow)) {
	catAnim.SetBool ("hasCrouched", true);
	catAnim.Play ("RunningToCrouch");
}

if (Input.GetKeyUp (KeyCode.DownArrow)) {
	catAnim.SetBool ("hasCrouched", false);
}
{% endhighlight %}

In the animation transitions, particularly the one that connect running with run-to-crouch and vice versa, we add parameters. A single boolean variable 'hasCrouched' is used, and a condition is added. In run-to-crouch, the condition is that 'hasCrouched' is true and false from crouch-to-run to run.

The *SetBool* function will alter these variables, and Unity will take care of the rest. 

### 5. Adding food

Now, create separate GameObjects and their respective Prefabs for all the food items. Add a box collider and rigidbody to these. where 'Is trigger' is checked and 'Is kinematic' is unchecked, We will use these for collision detection later on when updating the player health and score.

*Moving the food towards the player*

In order to move these towards the player, we will add a force to the objects. Create a script and add the following code to it, while associating it with the food objects. Use the following lines of code:

{% highlight ruby %}
void Start () {
	burger = GetComponent<Rigidbody2D> ();
	Player = GameObject.FindWithTag ("Player");
	score = Player.GetComponent<playerc> ().score;

	
	move += score;
	burger.AddForce (Vector2.left * move, ForceMode2D.Force);
	
}
{% endhighlight %}

This code simply initializes the gameobjects, and adds a force to the food object to make it move towards the player.

*Spawning food randomly and automatically*

Remember those prefabs we created for food earlier? Those will help us generate the food automatically. Add this line to your start function for each of the foods separately:

{% highlight ruby %}
#=> spawnTimeB is an int variable
InvokeRepeating ("PlaceBurgers", spawnTimeB1, spawnTimeB2);
{% endhighlight %}

This function will call the PlaceBurgers function at an interval of spawnTimeB1 from the start of the function, with an interval of spawnTimeB2 consecutively. 

The PlaceBurgers function contains the following lines of code:

{% highlight ruby %}
void PlaceBurgers()
{
	cloneB=Instantiate (burger, GeneratedPosition(), Quaternion.identity) as GameObject;
	cloneB.SetActive (true);
}
{% endhighlight %}

Instantiate function is going to create an instance of that prefab as a GameObject. This will show as a clone in your hierarchy when the game is being run. 

### 6. Adding player health and score

Most of this part mainly has to do with the collisions of the player with the objects. The following lines of code are needed in the playercontroller script for each of the objects:

{% highlight ruby %}
void OnCollisionEnter2D(Collision2D other){
{
	if (other.CompareTag ("Burger")) {
		other.gameObject.SetActive (false);

		score += 2;
		Destroy(other.gameObject);
	}
}
{% endhighlight %}

The Destroy function will destroy the other object (food) upon collision with the player. You can maintain a score or health variable and update it consequently. 

### 7. Adding functionality to the UI elements
*Health bar*

For the health bar, simply create a slider UI element and remove the knob. Add it to the playercontroller script, and update its value upon every collision. Remember to update the variable value of health upon collision with every 'bad' food, and equate this variable to the value of the slider like so:

{% highlight ruby %}
healthSlider.value = currentHealth;
{% endhighlight %}

*Pause and play button*
Firstly, create a pause button using the UI button element. You can add to it the image of the pause button you made earlier. Upon clicking this, the following code should run (add it to the UI controller script)

{% highlight ruby %}
void hidePaused(){
	foreach (GameObject g in pausedObjects) {
		g.SetActive (false);
	}
	pauseButton.SetActive (true);
}
void showPaused(){
	foreach (GameObject g in pausedObjects) {
		g.SetActive (true);
	}
	pauseButton.SetActive (false);
}
void handlePause(){
	
	if (Time.timeScale == 1) {
		Time.timeScale = 0;
		showPaused ();
	} 
	else if (Time.timeScale == 0) {
		Time.timeScale = 1;
		hidePaused ();
	}

}
{% endhighlight %}

pausedObjects contains the elements that show when the game is paused i.e. the 'Paused' text as well as the play button. Set these to active so that they show when the pause button is pressed (in the showPaused function) and hide the pause button itself by setting it's active to fault. Vice versa for when the play button is pressed while the game is paused. 

The timeScale value is used to pause and freeze the game itself. when it's set to 0, the game will freeze and when it's value is 1, the game will go on. Set these accordingly.

### 8. Adding background elements

Now that you have some idea on how to generate objects and move them automatically, add similar code as to the one you added for the 'food' elements to the background elements i.e. the buildings, clouds, and streetlamps. These will have no box collider but a rigidbody with 'is kinematic' unchecked. Add an image the ground object you created earlier and you're all set to go!

## Summary

Most of the details regarding how to use unity have been left out, whlie only covering the theoretics of creating a game. The code to the game can be found [here](https://1drv.ms/f/s!AqWQ56ZDOk9vliQTo1PlLE4f-bgg), while the game can be played [here](nashmia-riaz.github.io/FatCat).