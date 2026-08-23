---
layout: default
title: Änderungen
description: Neuerungen und Verbesserungen am Eisenbahn-Blog.
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
