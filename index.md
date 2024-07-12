---
layout: default
title: Samantha Glocker
---

## Projects

- [Licorice.ai](https://licorice.ai) — AI business operations automation
- [Licorice.io](https://licorice.io) — IT service automation
- [Caramel Australia](#) (exit)
- [ASUS-Linux.org](https://asus-linux.org) — Freetype for Windows
- [mactype.net](https://mactype.net) — Freetype for Windows
- [Ultra Plus series](#) — 3D engine bugfixes
- [NobaraProject.org](https://nobaraproject.org)
- [TrelloX.io](https://trellox.io)

## Articles
{% assign sorted_articles = site.articles | sort: 'date' | reverse %}
{% for article in sorted_articles limit:5 %}
- [{{ article.title }}]({{ article.url }})
{% endfor %}
