# Kodi Website

add blog 
go to blog.json 
example:
{
        "id": 1,
        "title": "我的第一篇博客",
        "hook": "这是博客内容，介绍我的学习经历...",
        "date": "2025-05-05",
        "author": "你的名字",
        "catergory": "学习",
        "cover": "blog-cover2.jpg",
        "content": "content/blog1.md"
}
change id change title 
hook is the content in the blog page
date is the date of the blog
author is the author of the blog
catergory is the catergory of the blog
cover is the cover of the blog it will show in blog.html
content is the content of the blog it will show in detail.html 

if you want to add a new catergory 
go to blog.html 
find class category-buttons 
example:
<button onclick="filterByCategory('All')">All</button>

change the ('change this') 

inside the md content make sure put it in the content folder

if you want to put picture 
example:
![](picture name)

if you want to put video 
example:
<iframe width="600" height="400" src=" you want to put video link " title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

for youtube video link you need but the id at the last part 
example:
https://www.youtube.com/embed/eW0nGsJGAxI?rel=0
change the eW0nGsJGAxI to the id you want to put in and keep ?rel=0