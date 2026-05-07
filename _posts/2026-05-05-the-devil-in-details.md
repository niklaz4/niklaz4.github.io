---
layout: post
title: "The Devil in the details: A technical deep dive into phishing infrastructure and evasion - Part I"
date: 2026-05-06
categories: [Articles]
tags: [phishing, social-engineering, red-team, infrastructure, opsec]
author: niklaz4
severity: high
tldr: "Phishing still dominates as the leading initial access vector. Understand why technical defenses alone will never be enough — and how professional campaigns are built from the ground up."
excerpt: "A deep-dive into why phishing remains the most dominant initial access vector, and how professional campaigns are architected from both a technical and human perspective."
---

If there's one thing I've learned over the years studying offensive security, it's that no matter how much we advance in defense technology, the human link remains the most reliable one for an attacker. And when we talk about initial access, nothing represents that reality better than phishing. In 2023, around 31% of breaches started with a simple click on a malicious link or attachment. That might look like a dip compared to previous years, but it's still the most dominant vector — and it won't be giving up that crown anytime soon. The image below illustrates this (and please, give the credits to Keith McCammon, the writer of this fantastic [article](https://kwm.me/posts/top-initial-access-vectors-2023/):

![Phishing awareness illustration - credits to Keith McCammon(kwm.me)](/assets/images/posts/initial-access-in-2023.png)

You know why? Because, at the end of the day, people are busy. Picture the daily routine of a salesperson, a financial analyst, or a project manager. They spend their whole day exchanging emails with dozens of suppliers, opening proposals, clicking meeting links, downloading spreadsheets. Cybersecurity isn't their priority — and honestly, it shouldn't be. Their priority is closing the deal, delivering the report, solving the client's problem. Does awareness training help? Absolutely, but even the best programs fail when an employee is overwhelmed or when the attacker is creative enough.

That's where sophistication comes in. I've seen phishing campaigns so well crafted that even I, living and breathing this stuff, had to look twice. A classic trick is exploiting an open redirect on a legitimate site belonging to the target company itself. The training says "hover over the link and check the destination." The person hovers, sees the company's domain, and thinks "ah, it's safe then." Except the link, after a redirect they never notice, lands them on a credential-harvesting page identical to the real one. There you go: even the well-trained employee fell for it.

Another thing a lot of security folks overlook is the cultural factor. If leadership treats cybersecurity as a nuisance — like a boring checklist that slows down processes — employees will internalize that. They'll look for shortcuts. They'll share passwords to speed up an approval, or click "enable content" on a Word document without a second thought, because the important thing is to reply quickly. Security becomes a burden, not an ally. And phishing feeds on exactly that fatigue.

But it's not all sunshine and roses for the attacker — and for those of us working with authorized phishing simulations, it's a pain too. Phishing infrastructure gets hunted fiercely nowadays. Internet scanners, browsers, email providers — everyone is watching. As soon as a phishing site goes up, it can be detected and taken down within hours. That forces anyone on the offensive side to be far more careful with operational security, to invest in infrastructure that can withstand scrutiny, to spend more time and money. And here's the cruel detail: these detection systems can't tell the difference between authorized phishing, a legit pentest scenario, and a real attack. The treatment is the same.

This arms race between detection and evasion is fascinating — and frustrating at the same time. It shows that even though we have increasingly better tools to spot malicious sites, phishing keeps evolving and finding gaps — often not in technology, but in human behavior. Because let's face it: as long as there's a tired, distracted person who just wants to do their job without obstacles, there will always be someone willing to exploit that vulnerability.

That's why, when people ask me what the best defense against phishing is, my answer is never just "training" or "email filters." It's a combination of properly configured technology, processes that don't penalize productivity, and, above all, a culture where security isn't seen as the enemy of the business. Tough? Yes. But it's the only path that makes phishing a slightly less unbeatable adversary.

---

## Building the Machine

Once you truly grasp the weight phishing carries as an initial access vector, the inevitable question becomes: how do you even build a minimally decent campaign? A phishing site, no matter how simple it looks on the surface, is a machine made of interlocking components that have to work together to fool the user while simultaneously slipping past modern defense mechanisms. The target victim might glance at it and think it's just a normal site - a Microsoft login, a bank screen, a supplier portal - but behind that appearance lies a carefully thought-out infrastructure, a handpicked domain, certificates, files, and a whole arsenal of evasion tricks.

Before anything else, we need a stage, and on the internet that stage is called infrastructure. What has changed massively in recent years is the widespread adoption of cloud hosting. Back in the day, attackers had to worry about VPS instances bought with cryptocurrency, compromised servers, convoluted setups. Today, the very same cloud providers a startup uses to host its application are used to spin up a phishing portal. The reason is simple: the infrastructure of major cloud providers carries a clean reputation, well-classified IPs, and a reliability that makes automatic blocking much harder. Here some good examples about these providers: Hostinger, AWS Route 53, Google Cloud Platform, DigitalOcean, and much more.

![Host your infraestructure with any provider, Hostinger is just an example](/assets/images/posts/hostinger.png)


Sitting on top of that infrastructure is the address the victim will see in the browser bar: the domain name. This is perhaps the single most important psychological detail of the entire operation. Nobody trusts a weird domain crammed with random numbers and characters. What we see in successful campaigns are subtle variations of legitimate brands: an "l" swapped for a "1", an "rn" that looks like an "m", domains with less common extensions like `.co` or `.io`, or a combination that includes the target company's name. NameCheap, Domain.com and many others could help us about buying similar domains.

![Buy your domains with Namecheap and others](/assets/images/posts/namecheap.png)


Now, if there's one thing that's no longer optional these days, it's the padlock. Modern browsers scream "Not Secure" at any site still using plain HTTP, and that scares away any visitor, legitimate or not. So the phishing site needs a TLS/SSL certificate. It's an illusion of security that works incredibly well: the average user has learned that a padlock means the site is real, forgetting that it only proves the connection is encrypted — not that the destination is trustworthy. Services like Let's Encrypt provide free and automated certificates, removing the financial barrier for anyone, attackers included. SSL.com, Digicert and many others could serve us with good and trustworthy certificates.

![Use digital certificates on your campaigns](/assets/images/posts/certificates.png)



---

## The Scanner Problem

But hold your excitement, because the biggest nightmare for anyone spinning up a phishing site today isn't even the victim getting suspicious. It's the scanners. The internet is swept nonstop by engines from security companies, browsers, researchers, and automated bots that comb through every new domain looking for signs of phishing. If the site isn't protected, within minutes or hours it's cataloged, flagged, and taken down.

That's why every self-respecting phishing site needs a layer of evasion just as important as the campaign content itself. Firewalls, web application firewalls, anti-bot solutions that challenge the visitor with CAPTCHAs before revealing the real content, closed ports — and most importantly, the ability to identify who is a scanner and who is a real target.

Techniques like blocking or redirecting traffic coming from known datacenter IPs, from Autonomous System Numbers (ASNs) of major cloud providers used by security companies, or from entire countries that fall outside the campaign's scope — these are the bread and butter of anyone who wants to keep a site alive for more than a day. We might even show a benign page to anyone we don't care about, like a fake recipe site or a generic server error, while for the real targets' IPs the phishing content appears normally. It's the art of selective theater.

---

## Infrastructure in Depth

One of the first things I evaluate is the geographic location of the datacenter. If your target is in Brazil and the phishing server's IP resolves to Russia or North Korea, a simple GeoIP lookup can trigger alarms in security solutions before the page content is even analyzed. Ideally, whenever possible, you want to choose a datacenter in the same country or region as the target.

Digging one technical layer deeper, there's a concept that less experienced folks ignore but that is vital: the **Autonomous System Number**, or ASN. Simply put, an ASN is a unique identifier assigned to large blocks of IP addresses under the control of a single entity. Why does this matter? Because experienced defenders don't block IP by IP — they block entire ASNs. If a hosting provider has an ASN associated with it and that network is used massively to host malicious content, security organizations simply bar all traffic originating from that ASN.

There's also a tempting shortcut worth highlighting: using trusted services that provide subdomains and ready-made infrastructure. A classic example is Microsoft Azure's App Service, which hands you a `*.azurewebsites.net` subdomain. The `azurewebsites.net` domain is inherently trusted by systems — hosting your phishing content there is like dressing up in the giant's own skin. The [LOTS project](https://lots-project.com) — Living Off Trusted Sites — catalogs various providers that can be exploited in this way, turning legitimate services into attack platforms.

![ASN and IP reputation check](/assets/images/posts/ASN.png)

Regardless of the route you choose, there's a ritual we need to perform religiously: checking the reputation of that IP before any action. There are IPs already so associated with malware campaigns that they appear on dozens of blacklists. Using them is operational suicide.

---

## The Domain Game

The domain name choice is where social engineering meets technical evasion. The amateur thinks like this: "I want to trick Office 365 users, so I'll register `0365login.com`." Does it work? To a certain extent. But that domain screams "phishing" to any scanner that does keyword-based detection. Before the content is even analyzed, the domain name itself condemns it.

There's also "DNS Hunting" — a proactive defense tactic that monitors new domain registrations looking for suggestive patterns. Registering `passwordreset.xyz` or `microsoftaccountaccess.com` is painting a target on your own back for threat hunters. The ideal domain is, in most cases, completely neutral or at most ambiguous.

This pursuit of subtlety leads us to more sophisticated strategies, like **supplier impersonation**. Organizations tend to be reasonably good at protecting themselves against the spoofing of their own domain, but they frequently fall short in protecting against the impersonation of their third parties. If the target company works with a local supplier, registering a domain that incorporates that supplier's name — resembling an invoice portal or a file-sharing link — can be brilliant. The victim trusts that partner, has received emails from them before. The security gap lies precisely in the trust relationship between the organization and its suppliers.

A lot of people immediately think of typosquatting: registering `gogle.com` to catch whoever mistypes `google.com`. It's an old, well-known technique — and precisely because of that, it's extremely monitored. Big brands have dedicated teams that register their own typos and proactively monitor new suspicious registrations. Relying only on typosquatting is betting that your target is blind, and that is rarely a good bet.

There's a much more elegant path: the **subdomains of SaaS services**. With the explosion of platforms like Okta, organizations get customized endpoints of the `<company-name>.okta.com` variety. A security solution can't block a subdomain just because it contains a company's name — if it did, it would break access to legitimate services for thousands of organizations. This impossibility of indiscriminate blocking opens up a clean avenue.

---

## Certificates and Files

We've already said that HTTPS is mandatory, but the origin of the SSL certificate is also under surveillance. Free certificates, like those from Let's Encrypt, have become a red flag. Security providers scrutinize domains with free SSL more closely. Although the free certificate solves the browser's "Not Secure" warning, it can attract unwanted attention from detection engines. The recommendation, when budget and operation allow, is to buy a paid SSL certificate — it pulls you out of the noisy crowd and adds an extra layer of apparent legitimacy.

Finally, the visual heart of the campaign: the phishing files. Grabbing a ready-made template from GitHub and throwing it online is shooting yourself in the foot. These public templates are riddled with signatures. Scanners already have hashes and patterns of these files cataloged. If you don't create from scratch, you're essentially putting up a neon sign saying "I'm a phishing site, take me down."

Automated cloning of legitimate sites is also a double-edged sword. Cloning Gmail or the AWS portal speeds up development, but it drags onto your site a whole trail of metadata, file paths, and HTML structures that are easily detectable. The approach I advocate is to develop a **custom phishing site** — one that has a visual appearance similar to the original target but is structurally different. The victim doesn't need a pixel-perfect replica. They need to believe they're in the right place.

If the design inspires the necessary trust and the backend is functional, the slight aesthetic difference ceases to be a problem — and for us, it becomes an extra layer of obfuscation against automated systems searching for exact replicas.

---


At the end of the day, what separates an amateur phishing site from a professional one is exactly that combination of protection and the quality of the illusion. A beginner attacker focuses only on the look and forgets they'll be swept off the internet in hours. A professional knows they're building an operation under siege — one that needs to withstand constant attacks from passive and active defense, all while convincing a tired, busy, and perhaps even well-trained user that this site is the real deal.

That's what makes this field so challenging — and for those who are good at it, so fascinating.