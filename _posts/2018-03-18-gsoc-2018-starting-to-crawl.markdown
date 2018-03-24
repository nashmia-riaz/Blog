 ————————
layout: post
title: "GSoC 2018 - Starting to Crawl"
date: 2018-03-18 20:10:00 +0500
categories: GSoC2018
————————

# Day 2 
Today, I decided to fix my first d.Contributors issue as I had already fixed my first d.FirstTimers issue last year.

## Fixing My First Issue
The issue I picked to be fixed was pretty simple, or so I thought. The issue can be seen [here](https://github.com/TEAMMATES/teammates/issues/8648). It asked that a certain button be added to another page. I assumed the code for this existed, I just had to find it and add it elsewhere. The main focus was on front end UI and the backend code was already written. 

### My Approach
Since I was dealing with unfamiliar code, my first task was to figure out how exactly InstructorsCourseDetailsPage displays the invite button for students. In doing so, I saw the code flow in better detail.

In addition to what I understood and wrote in my earlier entry:
1. .js in src/ main/ webapp/ dev executes the backend JavaScript code for each page
2. .tag in src/ main/ webapp/ WEB-INF brings Java code to HTML (values are filled in, similar to how AngularJS may work)

Following this, I found out that a single line in studentList.tag was responsible for displaying the instructorStudentList and instructorDetailsPage. A single line in this could be condition with an or statement to display invite student in both pages.

I thought my work here was done. But this seemed too easy to be true (which it was). I committed and pushed this fix out of excitement, only to find out that it didn't fully work. That, however, is a story for day 3. :)

#GSoC2018 #TEAMMATES