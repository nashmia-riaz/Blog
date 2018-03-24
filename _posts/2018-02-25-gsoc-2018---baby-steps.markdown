---
layout: post
title: "GSoC 2018 - Baby Steps"
date: 2018-02-25 20:10:00 +0500
categories: GSoC2018
---

# Day 1
My approach this year is to pace myself. I'm going to spend today understanding the basics of how TEAMMATES works. After spending the day setting up the server and tinkering with the code, I decided to create a page for myself to understand how the program goes from taking a link, processing it in Java, and displaying it in the browser.

## How It Works
Here's a really simplified version of what I understood:
1. You enter a URL.
2. ActionFactory.java maps the URL to a Java class
3. This class extends Action.java. It also does backend processing, such as filling variables with data and checking if user has privileges to open the page.
4. It passed the data to the .tag and .jsp files, which work together towards displaying the results as HTML.

{% include image.html
            img="codeFlowTeammates.jpg"
            title="code flow for teammates"
            caption="Code Flow For Teammates" %}

I am still not sure how the data goes from Java to being displayed as HTML, but I'm hoping I'll understand in the coming few days as I work towards fixing some issues. 


 #GSoC2018 #TEAMMATES