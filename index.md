---
layout: default
title: Samantha Glocker
---

# Samantha Glocker

Systems Engineer
Entrepreneur
Complex Problem Solver

## Projects

{% for project in site.data.projects %}
- [{{ project.name }}]({{ project.url }}) — {{ project.description }}
{% endfor %}

## Articles

{% for article in site.articles %}
- [{{ article.title }}]({{ article.url }}) — {{ article.date | date: "%B %d, %Y" }}
{% endfor %}
