---
layout: default
title: Articles
permalink: /articles/
---

<section style="padding: 5rem 0;">
  <div class="container">
    <div class="section-label">
      <span class="section-label__text">Articles</span>
      <span class="section-label__line"></span>
    </div>
    <div class="posts-grid">
      {% assign posts = site.categories["Articles"] %}
      {% if posts %}
        {% for post in posts %}
          {% include post-card.html post=post %}
        {% endfor %}
      {% else %}
        <p style="font-family: var(--mono); color: var(--text-3); font-size: 0.85rem;">// No posts yet.</p>
      {% endif %}
    </div>
  </div>
</section>