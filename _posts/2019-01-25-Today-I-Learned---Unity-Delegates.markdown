---
layout: post
title: "Today I Learned - Unity Delegates"
date: 2019-01-25 19:10:00 +0500
categories: games
comments: true
---

Hey there! Been a long time since I did one of these. I've had a few busy months spent developing in Unity, so expect a few blogs ahead!

C# has been my go-to language when it comes to Unity. The very first programming language I was introduced to was C. I'm only human - I'm drawn to familiarity, even if that is the one alphabet in the name. But after extensively developing games in C# with dozens of objects to take care of, many of which were very similar to one another, I kept coming across a problem. What if I want to pass a function as an argument? I saw this especially with inheritance, where the exact same code was being used except for one function call and I'd resolve to redundancy in order to get the behaviour I wanted. Thankfully, Unity has already thought of this and have a neat little thing called *delegates*.

## What Are Delegates?
In complex programming terms, a delegate is a pointer to a function. What this basically means is that you can pass treat the function as a variable and pass it around.

The best way to understand is with example. I came across a delegate hidden among hundreds of lines of code in a Unity tutorial. It was code to a menu being handled, with a back button that let you go as far back as you wanted. Menus can get complex and branch off endlessly, so it doesn't make sense to change the back button event with every click (event = the onclick functionality Unity gives).

Instead of that, the event listener was never changed. It was a simple function that called the delegate as a function. As you traversed through the menu, the function being referenced by the delegate changed. In turn, the variable stayed the same but it kept pointing to different functions. Pretty cool, right?

Don't worry if you don't get this right away. There are code examples ahead! :)

### What Am I Talking About Even?!
Here's a pretty simple code sample taken from [official Unity tutorial on this](https://unity3d.com/learn/tutorials/topics/scripting/delegates). Let's not reinvent the wheel here and simply delve into this tutorial.

```
public class DelegateScript : MonoBehaviour
{   
    delegate void MyDelegate(int num);
    MyDelegate myDelegate;


    void Start ()
    {
        myDelegate = PrintNum;
        myDelegate(50);

        myDelegate = DoubleNum;
        myDelegate(50);
    }

    void PrintNum(int num)
    {
        print ("Print Num: " + num);
    }

    void DoubleNum(int num)
    {
        print ("Double Num: " + num * 2);
    }
}
```

What we see here are two functions - one that simply prints the number given to it whereas the other doubles it before printing it.

`delegate void MyDelegate(int num)` helps us define the format of the function we'll be referencing, so the delegate can know what to expect. `MyDelegate myDelegate` simply defines the variable we'll use to reference the function.

If you run this code, you'll see that equating the delegate with PrintNum before calling it simply prints '50', the original number. Equating it with DoubleNum before calling it doubles it and prints '100'.

Imagine how easy this makes everything. The possibilities are endless!

## Types Of delegates
Apparently, there are two types of delegates (which I just found out, too!).**Single delegates** which can only reference *one* function and **multicast delegates** which can reference multiple functions. So, you can reference multiple functions now with the same delegate! You can read more about this [here](http://www.unitygeek.com/delegates-events-unity/).

## What Do I Do With This?
So far, I've used delegates for two purposes. One was attached to the back button as I described above. The other was a function I wanted to call at the end of a timer coroutine. Instead of having multiple timer coroutine functions in my code all being the same except for the function being called at the end, I simply passed it a delegate with a different reference. :)

So, if you kept up with all my ramblings hope this helps you out!
