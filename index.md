---
layout: default
title: Samantha Glocker
---

## Projects
- [Project 1](#) - Description
- [Project 2](#) - Description

## Articles
{% for article in site.articles %}
- [{{ article.title }}]({{ article.url }})
{% endfor %}
