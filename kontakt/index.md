---
layout: default
title: Kontakt
description: |-
  Kontakt zum Eisenbahn-Blog.

  Ihr könnt mit uns Kontakt aufnhemen.
contact:
  title: Kontakt aufnehmen
  body: >-
    Ihr könnt uns unter folgender Email anschreiben:


    eisenbahn.blog.news@gmail.com




    Bei Fragen gerne in der entsprechenden Gruppe der folgenden WhatsApp Community stellen:


    <https://chat.whatsapp.com/Jva8fIB3QdUCXiiImVeiub>




    Mich (Leonard Klinger) könnt ihr im Notfall auch unter folgender Handynummer erreichen:


    +49 176 46093075
notes:
  title: Überprüfung
  body: >-
    Beiträge werden von Autoren und Redakteuren geschrieben und Redakteure
    prüfen (diese) Beiträge. Aber wieso?


    Mit dem Prüfen von Beiträgen wollen wir, dass alles ordentlich ist, gut formuliert und einwandfrei ist, um weder rechtliche, noch sonstige Probleme zu bekommen und auf das Schreiben trainieren zu können.
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
