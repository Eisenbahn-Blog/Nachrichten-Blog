---
layout: default
title: Alle Meldungen
description: Alle Nachrichten und Beiträge des Eisenbahn-Blogs.
---

<section class="page-header">
  <div class="container">
    <span class="eyebrow">Eisenbahn-Blog</span>
    <h1>Alle Meldungen</h1>
    <p>
      Hier findest du sämtliche veröffentlichten Beiträge
      des Eisenbahn-Blogs.
    </p>
  </div>
</section>

<section class="container section">

  <div class="post-grid">

    {% for post in site.posts %}

    <article class="post-card">

      <a class="post-image" href="{{ post.url | relative_url }}">

        {% if post.image %}

          {% assign optimized_image = post.image
            | replace: ".jpg", ".webp"
            | replace: ".jpeg", ".webp"
            | replace: ".JPG", ".webp"
            | replace: ".JPEG", ".webp"
            | replace: "/assets/uploads/", "/assets/uploads/optimized/" %}

          {% assign optimized_file = site.static_files
            | where: "path", optimized_image
            | first %}

          <picture>

            {% if optimized_file %}
              <source
                srcset="{{ optimized_image | relative_url }}"
                type="image/webp">
            {% endif %}

            <img
              src="{{ post.image | relative_url }}"
              alt="{{ post.alt | default: post.title }}"
              loading="lazy"
              decoding="async"
            >

          </picture>

        {% else %}

          <img
            src="{{ '/assets/images/placeholder.svg' | relative_url }}"
            alt=""
            loading="lazy"
            decoding="async"
          >

        {% endif %}

      </a>

      <div class="post-body">

        <div class="post-meta">
          <span class="tag">
            📰 {{ post.categories | first | default: "Meldung" }}
          </span>

          <time datetime="{{ post.date | date_to_xmlschema }}">
            {{ post.date | date: "%d.%m.%Y" }}
          </time>
        </div>

        <h3>
          <a href="{{ post.url | relative_url }}">
            {{ post.title }}
          </a>
        </h3>

        <p>
          {{ post.excerpt | strip_html | truncate: 155 }}
        </p>

        <a
          class="read-more"
          href="{{ post.url | relative_url }}"
        >
          Artikel lesen →
        </a>

      </div>

    </article>

    {% endfor %}

  </div>

</section>
