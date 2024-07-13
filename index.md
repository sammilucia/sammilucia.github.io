---
layout: default
title: Samantha Glocker
---

## Projects

## Articles
{% assign sorted_articles = site.articles | sort: 'date' | reverse %}
{% for article in sorted_articles limit:5 %}
- [{{ article.title }}]({{ article.url }})
{% endfor %}
