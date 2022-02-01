# Planner5D | test task
## Description
1. Create page that shows list of projects, the page should:
1.1. Use pure CSS
1.2. Manually select list of projects from https://planner5d.com/gallery/floorplans
1.3. Show list of selected projects, in format: [hash], [title]
1.4. Pressing on list item should open project preview page
2. Create a project preview page, that should:
2.1. Use SCSS
2.2. Download (using AJAX) project JSON (it is part of your task to find out how to load project JSON)
2.3. Show project title
2.4. Show project preview (using Canvas 2D or Three.js) on which you should draw project room polygons from first floor
2.5. Show project statistics:
2.5.1. Amount of floors in project
2.5.2. Amount of rooms in project
2.5.3. Amount of other items in project

### Environment settings
Node v - 14.16.0
npm v -6.14.11
### Get CORS demo for successful requests to https://planner5d.com/api/project/ 
You need go to https://cors-anywhere.herokuapp.com/ and confirm access to the demo server
P.S. https://cors-anywhere.herokuapp.com/ has limit requests. I think, that 50 requests per hour..
### Run project
```cmd
cd planner5d_test_task
npm install
npm run start
```
### Or view
// link on build