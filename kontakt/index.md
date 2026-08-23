---
layout: default
title: Kontakt
description: Kontakt zum Eisenbahn-Blog.
---

<section class="page-header">
  <div class="container">
    <span class="eyebrow">Kontakt</span>
    <h1>{{ page.title }}</h1>
    <p>{{ page.description }}</p>
  </div>
</section>

<section class="container page-content">

  {% if page.intro %}
  <p class="page-intro">
    {{ page.intro }}
  </p>
  {% endif %}

  {% if page.contact %}
  <div class="contact-box">

    <h2>{{ page.contact.title }}</h2>

    {{ page.contact.body | markdownify }}

  </div>
  {% endif %}

  {% if page.notes %}
  <section class="contact-notes">

    <h2>{{ page.notes.title }}</h2>

    {{ page.notes.body | markdownify }}

  </section>
  {% endif %}

  {% if page.additional %}
  <section class="contact-additional">

    {{ page.additional | markdownify }}

  </section>
  {% endif %}

</section>
