---
layout: default
title: About
permalink: /about/
---

<section style="padding: 5rem 0;">
  <div class="container--narrow">
    <div class="section-label" style="margin-bottom: 3rem;">
      <span class="section-label__text">About</span>
      <span class="section-label__line"></span>
    </div>

    <div class="terminal-widget" style="margin-bottom: 3rem;">
      <div class="terminal-bar">
        <div class="terminal-dot terminal-dot--red"></div>
        <div class="terminal-dot terminal-dot--amber"></div>
        <div class="terminal-dot terminal-dot--green"></div>
        <span class="terminal-title">about.sh</span>
      </div>
      <div class="terminal-body">
        <div class="t-line"><span class="t-prompt">$</span> <span class="t-cmd">cat /etc/passwd | grep researcher</span></div>
        <div class="t-line t-out">researcher:x:1000:1000:Security Researcher:/home/researcher:/bin/bash</div>
        <div class="t-line">&nbsp;</div>
        <div class="t-prompt">$ <span class="t-cmd">whoami --verbose</span></div>
        <div class="t-line t-out">Name    : {{ site.author.name }}</div>
        <div class="t-line t-out">Focus   : Offensive Security, Malware Analysis, Red Team</div>
        <div class="t-line t-out">Certs   : eJPT, eWPT, CRTP, CAP, CSNP</div>
        <div class="t-line t-out">Location: [REDACTED]</div>
      </div>
    </div>

    <div class="post-content">
      <p>I'm a security researcher focused on offensive techniques and red teaming. This blog is where I document interesting findings, CTF writeups, and deep-dives into topics I find worth writing about.</p>

      <h2>What I write about</h2>
      <p>Content here ranges from penetration testing, initial access to red team tactics and CTF walkthroughs. I try to go deep rather than broad — if something is worth writing about, it's worth explaining properly.</p>

      <h2>Responsible Disclosure</h2>
      <p>All vulnerabilities discussed here have been properly disclosed to the affected vendors and are fully remediated or publicly known before publication. I follow a 90-day disclosure timeline aligned with Google Project Zero's policy.</p>

      <h2>Contact</h2>
      <p>
        {% if site.author.email %}Email: <a href="mailto:{{ site.author.email }}">{{ site.author.email }}</a><br>{% endif %}
        {% if site.author.twitter %}Twitter: <a href="https://x.com/{{ site.author.twitter }}" target="_blank">@{{ site.author.twitter }}</a><br>{% endif %}
        {% if site.author.github %}GitHub: <a href="https://github.com/{{ site.author.github }}" target="_blank">{{ site.author.github }}</a>{% endif %}
      </p>
    </div>
  </div>
</section>
