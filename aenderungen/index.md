---
layout: default
title: Änderungen
description: >-
  Änderungen

  Der Eisenbahn-Blog wird regelmäßig verbessert. 🔧

  Hier informieren wir über neue Funktionen, Änderungen am Design und andere Neuerungen.

  Du hast einen Fehler gefunden oder eine Idee?

  Dann sag uns gerne Bescheid! 🙂
changes:
  - date: 23. August 2026
    icon: 🎨
    title: Farben verbessert
    text: Alle Farben wurden verbessert.
footer:
  title: Alle Änderungen
  text: Es gab bisher viele Änderungen. In Zukunft informieren wir hier.
  button_text: ""
---

<section class="page-header">
  <div class="container">
    <span class="eyebrow">Changelog</span>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </div>
</section>

<section class="container section">

  <div class="changelog">

    {% for change in page.changes %}
    <article class="change-entry{% if forloop.first %} change-entry-current{% endif %}">

      <div class="change-marker">
        {{ change.icon }}
      </div>

      <div class="change-content">

        <span class="change-date">
          {{ change.date }}
        </span>

        <h2>{{ change.title }}</h2>

        {% if change.text %}
        <p>
          {{ change.text }}
        </p>
        {% endif %}

        {% if change.items %}
        <ul>
          {% for item in change.items %}
          <li>{{ item }}</li>
          {% endfor %}
        </ul>
        {% endif %}

      </div>

    </article>
    {% endfor %}

  </div>

</section>

{% if page.footer %}
<section class="container section">

  <div class="info-panel">

    {% if page.footer.eyebrow %}
    <span class="eyebrow">{{ page.footer.eyebrow }}</span>
    {% endif %}

    <h2>{{ page.footer.title }}</h2>

    {{ page.footer.text | markdownify }}

    <a class="button" href="{{ '/' | relative_url }}">
      {{ page.footer.button_text | default: "Zu den Meldungen →" }}
    </a>

  </div>

</section>
{% endif %}
