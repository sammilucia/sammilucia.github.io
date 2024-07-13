---
layout: default
title: Samantha Glocker
---

# Samantha Glocker

<p class="subtitle">
    Systems Engineer<br>
    Entrepreneur<br>
    Complex Problem Solver
</p>

## Projects

{% for project in site.data.projects %}
- [{{ project.name }}]({{ project.url }}) — {{ project.description }}
{% endfor %}

## Articles

{% for article in site.articles %}
- [{{ article.title }}]({{ article.url }}) — {{ article.date | date: "%B %d, %Y" }}
{% endfor %}