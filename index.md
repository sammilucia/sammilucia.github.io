---
layout: default
title: Samantha Glocker
---

# Samantha Glocker

Systems Engineer | Serial Entrepreneur | Complex Problem Solver

## Projects
{% for project in site.data.projects %}
- [{{ project.name }}]({{ project.url }}) — {{ project.description }}
{% endfor %}

## Articles
{% for post in site.posts limit:5 %}
- [{{ post.title }}]({{ post.url }})
{% endfor %}
