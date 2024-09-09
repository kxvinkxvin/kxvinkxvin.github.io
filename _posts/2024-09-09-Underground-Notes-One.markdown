---
layout: post
title:  Mass SQLi Tools + Ingenuity = SQLiaaS
description: How the demand for breached data lead to the creation of the first SQL Injection-as-a-Service facility.
date:   2024-09-09 15:00:00 +0100
image:  '/images/inject.jpg'
tags:   [Underground, SQLi, Databases, Breaches]
type: 'Notes From Underground'
---

### background

Twenty-six years ago, Jeff Forristal discovered what would become one of the most significant and damaging security vulnerabilities of the 21st century: the SQL injection. 

This discovery occurred when Forristal realized he could interact with the Microsoft SQL (MSSQL) service in a way that allowed him to arbitrarily modify the executed code.

Fast-forward to today, and SQL injection remains one of the most notorious attack vectors in cybersecurity. Since 2003, it has been a staple in the OWASP Top 10 list of security risks and has been the root cause of some of the largest data breaches ever reported.

![haveibeenpwned Top Breaches]({{site.baseurl}}/images/01-01.jpg)
*[haveibeenpwned.com](https://haveibeenpwned.com/)*

###  the rise of injection-based breaches

In 2006, a tool called SQLMap was developed to simplify and automate the entire SQL injection process. Before SQLMap, executing a SQL injection attack required a certain level of technical expertise to craft even the simplest SQL statements. 

![sqlmap]({{site.baseurl}}/images/01-02.jpg)
*[sqlmap](https://github.com/sqlmapproject/sqlmap)*

However, SQLMap transformed this landscape by creating a plug-and-play tool that could launch various SQL injection attacks once fed a vulnerable endpoint.

During the early 2010s, the demand for breached databases soared. Security was often an afterthought for many businesses, while hacktivism gained popularity with groups like LulzSec making headlines. 

![2011 PSN Hack]({{site.baseurl}}/images/01-03.jpg)
*LulzSec Playstation Network Breach | 2011*

Poor security practices across websites and businesses paved the way for the mass production of SQLi tools, enabling even the most inexperienced <u>script kiddie</u> to extract databases from dozens, if not hundreds, of vulnerable websites—all they needed was the right Google Dork.

### understanding google dorks

A Google Dork is a clever combination of search operators used to filter and find specific results on the internet. For example, the combination ```intext:"tax form" site:com``` would return any webpage containing the term "tax form" on a ```.com ``` domain. 

An attacker who knows that a URL path which contains ```view_cart.php?title=``` has been vulnerable to SQL injections in the past may use the same dork query to find more websites with the same initial foothold/vulnerability.

![Sample Google Dorks]({{site.baseurl}}/images/01-04.jpg)
*Google Hacking Database | [Exploit-DB](https://www.exploit-db.com/google-hacking-database)*

### the evolution of automated sql injection tools

The next major leap in SQL injection automation came in 2009 with the release of Havij, a tool that allowed users to execute SQL injections on Windows without requiring any prior knowledge of SQL databases. Users simply entered the URL of a target site, found through a Google Dork, and Havij would attempt a range of SQL injection techniques automatically.

![Havij]({{site.baseurl}}/images/01-05.jpg)
*Havij | Advanced SQL Injection Tool*

By 2015, another tool called SQLi Dumper had arrived on the scene, becoming a favorite among novice hackers. SQLi Dumper took the automation of SQL injections even further by not just targeting a specific website but using a large list of Google Dorks to automatically discover vulnerable PHP applications. 

The tool would crawl through search engines like Google and Yahoo to identify potential targets and automate the entire SQL injection process with no technical expertise needed.

![SQLi Dumper]({{site.baseurl}}/images/01-06.jpg)
*SQLi Dumper | Automated Discovery & Exploitation Tool*

As Google Dorks became more common and accessible, specialized tools were developed to generate curated dorks targeting specific applications. This made it easier for threat actors to extract sensitive information like personal details, credit card numbers, and credentials, without needing to understand any query language.

![Google Dork Generator]({{site.baseurl}}/images/01-07.jpg)
*The N3RoX Google Dork Generator*

This automation and simplification helped create a lucrative underground market for stolen databases, used for attacks ranging from credential stuffing and phishing to more sophisticated scams like corporate invoice redirection.

### the advent of sql injection-as-a-service

The financial incentives for breaching data have spurred several advancements in the underground hacking community. 

With the rise of Software as a Service (SaaS), these underground markets have evolved to keep pace. The latest innovation, "DorkPlus" represents the first SQL Injection-as-a-Service (SQLiaaS) platform.

![DorkPlus Thread]({{site.baseurl}}/images/01-08.jpg)
*DorkPlus Advertisement | cracked.io*

DorkPlus allows anyone to perform mass SQL injections from any device, anywhere. It eliminates the need for any technical knowledge, as the service handles everything—from generating Google Dorks and parsing search results for vulnerabilities to executing the SQL injections. 

It promotes the features of tools like SQLi Dumper with built-in password recovery functionalities (like hashcat), automating the process of extracting credentials and other personal data in plain text, all for just a flat weekly or monthly fee.

![DorkPlus Pricing]({{site.baseurl}}/images/01-09.jpg)
*DorkPlus Pricing*

I expect this type of business to become more widespread, as it appeals to a broad range of data-hungry criminals. It simplifies the process and allows them to execute a large operation with just the tap of a button. 

![DorkPlus Discord]({{site.baseurl}}/images/01-10.jpg)
*Client Vouches & Reviews | DorkPlus Discord*

###  conclusion

As long as there is a demand for stolen user credentials and other sensitive data, there will always be a supply. The evolution of SQL injection tools, from SQLMap to DorkPlus, shows how financially motivated cybercrime continually adapts to meet market demands. 

Just like the real world, innovation will continue, for as long as there is an incentive.

**// KVDN**

<sup>If you enjoyed this article, or learned something new, don’t forget to share it. 
It’s the best way you can support the blog, my curiosity, and my continuous research.</sup>