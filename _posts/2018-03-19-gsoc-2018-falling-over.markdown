 ————————
layout: post
title: "GSoC 2018 - Falling Over"
date: 2018-03-19 20:30:00 +0500
categories: GSoC2018
————————

# Day 3
After yesterday's contribution, the first issue I encountered was the fact that my fix didn't go through. Automatic tests that ran on my code had failed.

## Getting the Tests to Pass
The first task was to debug and run tests on my own machine. Online Travis CI tests showed me that there were issues with UI tests on the code I had written. However, I had trouble running the tests on my machine. Selenium and Firefox on my laptop were of different version and therefore incompatible. After trying to update selenium, and the tests not running still, I ended up downgrading my Firefox to version 47.0.2.

After the tests successfully ran, I found out that the UI tests were failing as the resources hadn't been updated. I soon found out from the TEAMMATES guidelines that I had to run the tests in 'godmode' first to update the resources. After doing so, the tests passed. I pushed the changes again, and it went through.

## Its Not Over Yet
I was very happy that I had fixed my first issue. Not for long though. The reviewer was quick to point out that my fix didn't work properly. Although it did remind the student, it didn't redirect back to the instructorStudentsList. Instead, it redirected the user to instructorCourseDetailsPage. Moreover, clicking the button didn't show the confirmation dialogue. My work here wasn't don't yet.

## More Tasks Ahead
Now, I had two more tasks ahead of me. First, I had to redirect to the correct page. To do so, I had to figure out the order of execution when the 'invite student' button was pressed. I figured out the order was:

studentList.tag -> studentListStudentData.java -> Fetched string from Const.java -> ActionFactory.java mapped the string -> instructorCourseRemind.java

Additionally, get function in studentListStudentData retrieved the completed URL that existed as a private variable. instructorCourseRemind.java was where the redirection was taking place.

So, to fix the redirection, I added an if-else condition in the .tag file. If the 'invite' button was on instructorCourseDetails page, it eventually redirected to the instructorCourseRemind.java. I duplicated the files and variables for instructorCourseRemind and coded them for instructorStudentListRemind. This was used in case the 'invite' button was on instructorStudentListPage. Finally, i altered instructorStudentListRemind to redirect to instructorStudentListPage. This worked!

My next task was to show the confirmation dialogue. This existed in the .js file for instructorCourseDetails page. A function called AttachEventToInviteButton added the code to show the confirmation dialogue. I moved this to instructor.js and exported it into both instructorCourseDetailsPage and instructorStudentListPage. Referencing this in both .js files showed the confirmation dialogue. I also found out that the pages referred mini field .js files, that could be built if I ran 'npm run build' as a command. 

I submitted and pushed these changes as I figured I finally had the solution, or so I thought.

#GSoC2018 #TEAMMATES