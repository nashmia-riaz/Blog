---
layout: post
title: "5 Things To Know Before Starting Unity"
date: 2018-07-27 22:52:00 +0500
categories: games, Unity
---

Here is a list of things that I wish I had known formally (some I did) before diving headfirst into Unity3D. If you stumbled on this post (somehow) while starting up with Unity, please know that I'm just going to go through these quickly and I encourage you, oh dear reader *eyeroll*, to research and read about this in detail.

## 1. Basic Programming
Unity is an amazing tool that simplifies a lot of things, making it very easy for just about anyone to pick it up and make all kinds of softwares (not just games) with it. If you do plan on moving on to Unity, and have not done any programming before, it's a good idea to start off by learning how coding works.

When starting off, pick a programming language that Unity supports (either C# or JavaScript) and roll with it. Learn its fundamentals, and in the process, learn the fundamentals of programming as well. Figure out how a code flow works, what functions are, what variables are, what object-oriented programming is (which is very useful when it comes to game development & Unity) and what polymorphism is (polymorphism is not a weird alien that morphs into different objects, although that would be fun).

If you plan on developing a slightly complex game, then learning state machines and how they work is a good idea as well. It will also help you with the #3 on this list.

## 2. Object Space & World Space
Now when I say coordinate system, I'm not talking about those x-axis, y-axis coordinates you did in your middle-school math class. These coordinates are a little different and have their roots in how graphics work.

You see, when you create an object in Unity, it will have a World-Space coordinate and an Object-space coordinate. The world-space coordinate refers to that object position in the /world/, i.e. the world you've created in Unity. Whereas, the model space coordinate will be it's local coordinate system, i.e. coordinates that are in reference to the objects position. This specifically comes into play when you have an object in Unity, and it's child. Setting position of the child object via the inspector will move it around w.r.t the parent's object space. Such positions will be relative to the parent, and not the world-space directly.

I know this can end up sounding confusing, so here's a neat little diagram.

{% include image.html
            img="World-Space-Object-Space.png"
            title="Outlast Courtyard"
            caption="" %}

## 3. The Mecanim System
Unity provides a very neat little system called Mecanim that can handle the states your character is in, and also animate it accordingly. With Mecanim, you can animate your character in Unity, apply those animations through script or even transition through animations specifying tiny little details. Back in the old days, all of this had to be done through code; which limb moves where and when, how the entire animation cycle subsequently works. It was either this, or rather animating your character through sprites. Mecanim will help you bring your character to life, and even the objects around it.

## 4. Navmesh and AI
Again, if you plan on moving onto a complex game where there are NPCs with certain behaviour, then learning basic Ai might help. As mentioned before, state machines will help you give some behaviour to your NPCs. In addition to this, Unity provides it's developers with Navmesh.

Think about this for a second. Suppose you had one of your NPCs in a maze. You wanted to move him from the start to the end. How will you do this? Will you write a script to tell the NPC to move forward x times, then turn right, and so on? That sounds awfully tiresome. With Unity, you can simply set the walkable area and tell your NPC to move from point A to point B, and it'll figure out its path on its own.

## 5. Baked Lighting
In order to make good games on Unity, you'd have to optimize them so they can run on a wider range of PCs, thus covering more of your audience. With that in mind, one of that most intensive computation your CPU and GPU might have to do is to create light.

The basic sense in which light is simulated on our machines is this: there's an equation that summarizes the behaviour of light. Which direction will it go in, what's its strength, how does it bounce off of objects (which also depends on it's shape and material). This equation, and computation in turn, can be a burden on your PC, especially when a whole scene is to be rendered.

With Unity, what you can do is bake light into your scene. You know which objects are not going to move, so you mark them as static. Unity does the rest and sort of integrates how the object will look under certain light into its texture. Meaning that it renders that scene, computes the texture for each object under that light, and integrates that as an image into that object. Therefore, it doesn't have to dynamically render light at runtime, and hence save computation power by not having to do those nasty calculations.

## Bonus: UNet
In addition to this, once you've moved on to making complex games, you might want to consider having a look at UNet, short for Unity Networking. Unity provides its developers with an API to make multiplayer games.

Now, UNet is not perfect. In fact, it's regarded to as one of the frustrating things one can learn when it comes to multiplayer and Unity. Many consider using Photon Unity Networking, which is a third-party API that gets the job done. If you're reading this, and you aren't already standing neck-deep in problems that are direct result of UNet and its limitations, then I highly encourage you to learn Photon and go with it.

The problem with UNet is that its tailored for a very specific type of game: shooters. This can result in problems when you're making unconventional games that aren't FPS. But if you are in fact making a multiplayer FPS then read on.

How UNet works is this: a computer will host the game, ending up as a server/client, whereas anyone who joins that game simply ends up as client. They're in connection like this:


{% include image.html
            img="Unet-Diagram.png"
            title="Outlast Courtyard"
            caption="" %}

So, if you were a client and you wanted to send a message to a fellow client, you'd first send that message to the server, who'd then convey it to the client. For this, UNet will provide you with Command and ClientRPC functions to relay these messages.
