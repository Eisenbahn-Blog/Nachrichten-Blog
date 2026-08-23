---
layout: default
title: Blog nutzen
description: So findest du dich im Eisenbahn-Blog zurecht.
features:
  - alert: true
    title: Aktuelle Beiträge
    text: Entdecke die neuesten Nachrichten, Berichte und Meldungen aus der Welt der
      Eisenbahn.
    icon: 📰
  - alert: false
    icon: 🚆
    title: Eisenbahn-News
    text: Aktuelle Informationen zu Strecken, Fahrzeugen, Bauarbeiten und Projekten.
tip:
  title: Abonnement
  text: Hier mache diese
participate:
  title: Mitmachen
  text: Bitte eine Mail an ...
---

<section class="page-header">
  <div class="container">
    <span class="eyebrow">Eisenbahn-Blog</span>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </div>
</section>

<section class="container section">

  <div class="feature-grid">

    {% for feature in page.features %}
    <article class="feature-card{% if feature.alert %} feature-card-alert{% endif %}">
      {% if feature.icon %}
      <div class="feature-icon">{{ feature.icon }}</div>
      {% endif %}

      <h2>{{ feature.title }}</h2>

      <p>
        {{ feature.text }}
      </p>
    </article>
    {% endfor %}

  </div>

</section>

{% if page.tip %}
<section class="container section info-section">

  <div class="info-panel">
    <span class="eyebrow">Tipp</span>

    <h2>{{ page.tip.title }}</h2>

    {{ page.tip.text | markdownify }}

    <a class="button" href="{{ '/' | relative_url }}">
      Zur Startseite →
    </a>
  </div>

</section>
{% endif %}

{% if page.participate %}
<section class="container section">

  <div class="info-panel">
    <span class="eyebrow">Mitmachen</span>

    <h2>{{ page.participate.title }}</h2>

    {{ page.participate.text | markdownify }}

    <a class="button" href="{{ '/admin/#/' | relative_url }}">
      Zum Redaktionsbereich →
    </a>
  </div>

</section>
{% endif %}
