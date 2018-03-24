---
layout: post
title: "GSoC 2018 - Getting Back Up"
date: 2018-03-21 21:20:00 +0500
categories: GSoC2018
---

# Day 4
The reviewer was again quick to point out how my code duplicated the code written for instructorCourseRemind. This was not a good programming practice and I had to fix this ASAP.

## Optimising the Fix
I figured that in order to fix the redundancy I had introduced, I could keep track of the page in which the button is pressed and redirect accordingly. This could be done in a single class, in instructorCourseRemind for now.

To do so, I introduced a variable in Action.java called currentUrl. This used a the header of the request to track where the request was coming from. It used existing code to do so. 

I isolated this header to retrieve only the url where the request was coming from in the instructorCourseRemind.java. If-else check in the file fixed the redirection accordingly.

Next, I removed the redundant code I had introduced earlier. While my fix worked well, I wanted to ensure all tests passes before I pushed the code to the repo. This is when my npm lint tests started failing for no reason.

Upon investigating for hours and posting this as an issue on the TEAMMATES repo, I found out that my tests did pass. Just not in powershell and git shell. So I stuck to command prompt from here on out.

I finally committed and pushed this fix in hopes that no problems will arise from here on out.

 #GSoC2018 #TEAMMATES