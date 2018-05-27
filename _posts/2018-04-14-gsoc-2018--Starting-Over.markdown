---
layout: post
title: "GSoC 2018 - Starting Over"
date: 2018-04-13 21:20:00 +0500
categories: GSoC2018
---

# Day 20
Everything stopped working! Last week, I reset my laptop due to certain small configuration issues I was facing. When I tried to set up my development environment again, it just wouldn't work. It kept throwing me an error that appengine-web.xml wasn't found in the `out` folder. After spending the last week setting my environment over and over again in hopes that I might figure out what I missed or maybe an update in the code might fix it, I finally gave up and decided to run everything using the commandline and get back to my PRs.

I ended up simply adding the changes requested and then pushing them. When my changes didn't pass the Travis build, I assumed that it as due to the fact that the environment on my system had broken, and left comments on my PR asking the reviewers to ignore the checks.

{% include image.html
            img="dwight-big-mistake.webp"
            title="Big mistake! Huuuuge!"
            caption="Big mistake! Huuuuge!" %}

Not only was I dead wrong, this left a bad impression on the reviewer (I'm sure) and left them confused enough to push one of my changes with the new version.

## What I Learned
In frustrating times like these where everything seems to be going wrong, it's good to take a step back and be patient.

I eventually persevered and set up my IDE properly. Turns out, I just had to downgrade my Intellij Idea to 2017 and the error went away.

## More Work Ahead
Regarding one of my PRs, the reviewer requested that I scrap my work and start over as the solution wasn't optimal. It wouldn't work in certain cases. He suggested that i pass the page address as a request parameter instead of relying on the HTTP referrer. He also pointed out that I could modify a variable in one of the tests to make it pass (which I was hesitant to do so before).

This time around, I was careful. My first task was figuring out how the request parameter was being passed. This is the order I figured out:

{% include image.html
            img="StudentListDiagram.png"
            title="parameter value flow"
            caption="Parameter Value Flow" %}

So I simply had to introduce the parameter names and page names in Const.java and call pass it using the PageData.java. Most of the detection and logic was already set up in instructorCourseRemindAction. This was pretty simple and easy to do.

I took my time pushing these changes, running both linting and Travis tests first. Once these passed, I pushed my changes.

Now I wait in hopes that my PR will finally get merged. One thing is for sure, I'm finally getting the hang of this. My PRs are much cleaner and well structured now.

#GSoC2018 #TEAMMATES
