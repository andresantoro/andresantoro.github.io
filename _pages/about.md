---
permalink: /
#title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

<div style="position: relative; width: 100%; height: 560px; overflow: hidden; margin-bottom: 20px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
  <img src="/images/turin4.png" style="width: 100%; height: 100%; object-fit: cover; transform: scale(1.0); filter: brightness(1.0);">
  <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(44, 114, 181, 0.1) 0%, rgba(0, 0, 0, 0.2) 100%);">
    <div style="position: absolute; bottom: 30px; left: 30px; max-width: 80%;">
      <!-- <h1 style="color: white; font-size: 2.2em; margin: 0; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); font-weight: 700; letter-spacing: -0.5px;">Andrea Santoro</h1> -->
      <!-- <div style="width: 50px; height: 3px; background: white; margin: 10px 0; box-shadow: 1px 1px 3px rgba(0,0,0,0.3);"></div> -->
      <p style="color: white; margin: 0; font-size: 1.5em; text-shadow: 5px 5px 5px rgba(0,0,0,0.5); font-weight: 330; letter-spacing: 0.5px;">Complex Systems • Networks • Data Science • Neuroscience </p>
    </div>
  </div>
</div>

I am a mathematician with a strong interest in applied sciences. My research focuses on complex networks, time series analysis, neuroscience, and information theory, with a particular emphasis on higher-order models and their application to large-scale systems. Currently, my work involves developing topological approaches to infer higher-order dependencies in multivariate time series, with applications in brain data and economics. I am also part of [Project CETI](https://www.projectceti.org/) (Cetacean Translation Initiative), which is an ambitious interdisciplinary endeavor aiming to decode the communication of sperm whales.

I currently hold a position as a Researcher at [CENTAI](https://centai.eu/home) in Turin, Italy, where I collaborate with Prof. [Giovanni Petri](https://lordgrilo.github.io/) within the [NPLab](https://nplresearch.github.io/), while being involved in the Marie Curie Postdoctoral project "temporalHOI" (collaboration with Dr. [Fabrizio De Vico Fallani](https://sites.google.com/site/devicofallanifabrizio/) at INRIA, Paris).

Prior to this, I worked as a Postdoctoral Researcher at the [Neuro-X Institute](https://neuro-x.epfl.ch/en/) at EPFL in the Geneva campus, under the guidance of [Dr. Enrico Amico](https://amicolab.org/) within the MIPlab group of [Prof. Dimitri Van De Ville](https://miplab.epfl.ch/index.php). Earlier in my career, I worked as a Research Assistant at Queen Mary University of London.

I completed my PhD in Applied Mathematics at Queen Mary, University of London, within the [Complex Systems and Networks Group](https://www.qmul.ac.uk/maths/research/complex-systems-and-networks-group/), under the supervision of [Vincenzo Nicosia](https://webspace.maths.qmul.ac.uk/v.nicosia/) and [Lucas Lacasa](https://sites.google.com/view/lucaslacasa/). I also spent part of my PhD at [The Alan Turing Institute](https://www.turing.ac.uk/) through their enrichment doctoral scheme.

My interest in complex networks began in 2014 during my visits to the Complex Systems and Networks group at Queen Mary University, under the supervision of [Vito Latora](http://www.maths.qmul.ac.uk/~latora/) and [Vincenzo Nicosia](https://webspace.maths.qmul.ac.uk/v.nicosia/). I obtained a degree in Mathematics and Master in Applied Mathematics both from the University of Catania. I was also enrolled at the [Scuola Superiore di Catania](https://ssc.unict.it/), an institution that gives talented students from the University of Catania complementary and advanced classes and encourages them to start research projects before graduation. My master's thesis and early research were supervised by [Giuseppe Nicosia](https://scholar.google.co.uk/citations?user=5FilzyUAAAAJ&hl=en).  You can find more about me [here](cv).

<!-- 
A data-driven personal website
======
Like many other Jekyll-based GitHub Pages templates, academicpages makes you separate the website's content from its form. The content & metadata of your website are in structured markdown files, while various other files constitute the theme, specifying how to transform that content & metadata into HTML pages. You keep these various markdown (.md), YAML (.yml), HTML, and CSS files in a public GitHub repository. Each time you commit and push an update to the repository, the [GitHub pages](https://pages.github.com/) service creates static HTML pages based on these files, which are hosted on GitHub's servers free of charge.

Many of the features of dynamic content management systems (like Wordpress) can be achieved in this fashion, using a fraction of the computational resources and with far less vulnerability to hacking and DDoSing. You can also modify the theme to your heart's content without touching the content of your site. If you get to a point where you've broken something in Jekyll/HTML/CSS beyond repair, your markdown files describing your talks, publications, etc. are safe. You can rollback the changes or even delete the repository and start over -- just be sure to save the markdown files! Finally, you can also write scripts that process the structured data on the site, such as [this one](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb) that analyzes metadata in pages about talks to display [a map of every location you've given a talk](https://academicpages.github.io/talkmap.html).

Getting started
======
1. Register a GitHub account if you don't have one and confirm your e-mail (required!)
1. Fork [this repository](https://github.com/academicpages/academicpages.github.io) by clicking the "fork" button in the top right. 
1. Go to the repository's settings (rightmost item in the tabs that start with "Code", should be below "Unwatch"). Rename the repository "[your GitHub username].github.io", which will also be your website's URL.
1. Set site-wide configuration and create content & metadata (see below -- also see [this set of diffs](http://archive.is/3TPas) showing what files were changed to set up [an example site](https://getorg-testacct.github.io) for a user with the username "getorg-testacct")
1. Upload any files (like PDFs, .zip files, etc.) to the files/ directory. They will appear at https://[your GitHub username].github.io/files/example.pdf.  
1. Check status by going to the repository settings, in the "GitHub pages" section

Site-wide configuration
------
The main configuration file for the site is in the base directory in [_config.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_config.yml), which defines the content in the sidebars and other site-wide features. You will need to replace the default variables with ones about yourself and your site's github repository. The configuration file for the top menu is in [_data/navigation.yml](https://github.com/academicpages/academicpages.github.io/blob/master/_data/navigation.yml). For example, if you don't have a portfolio or blog posts, you can remove those items from that navigation.yml file to remove them from the header. 

Create content & metadata
------
For site content, there is one markdown file for each type of content, which are stored in directories like _publications, _talks, _posts, _teaching, or _pages. For example, each talk is a markdown file in the [_talks directory](https://github.com/academicpages/academicpages.github.io/tree/master/_talks). At the top of each markdown file is structured data in YAML about the talk, which the theme will parse to do lots of cool stuff. The same structured data about a talk is used to generate the list of talks on the [Talks page](https://academicpages.github.io/talks), each [individual page](https://academicpages.github.io/talks/2012-03-01-talk-1) for specific talks, the talks section for the [CV page](https://academicpages.github.io/cv), and the [map of places you've given a talk](https://academicpages.github.io/talkmap.html) (if you run this [python file](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.py) or [Jupyter notebook](https://github.com/academicpages/academicpages.github.io/blob/master/talkmap.ipynb), which creates the HTML for the map based on the contents of the _talks directory).

**Markdown generator**

I have also created [a set of Jupyter notebooks](https://github.com/academicpages/academicpages.github.io/tree/master/markdown_generator
) that converts a CSV containing structured data about talks or presentations into individual markdown files that will be properly formatted for the academicpages template. The sample CSVs in that directory are the ones I used to create my own personal website at stuartgeiger.com. My usual workflow is that I keep a spreadsheet of my publications and talks, then run the code in these notebooks to generate the markdown files, then commit and push them to the GitHub repository.

How to edit your site's GitHub repository
------
Many people use a git client to create files on their local computer and then push them to GitHub's servers. If you are not familiar with git, you can directly edit these configuration and markdown files directly in the github.com interface. Navigate to a file (like [this one](https://github.com/academicpages/academicpages.github.io/blob/master/_talks/2012-03-01-talk-1.md) and click the pencil icon in the top right of the content preview (to the right of the "Raw | Blame | History" buttons). You can delete a file by clicking the trashcan icon to the right of the pencil icon. You can also create new files or upload files by navigating to a directory and clicking the "Create new file" or "Upload files" buttons. 

Example: editing a markdown file for a talk
![Editing a markdown file for a talk](/images/editing-talk.png)

For more info
------
More info about configuring academicpages can be found in [the guide](https://academicpages.github.io/markdown/). The [guides for the Minimal Mistakes theme](https://mmistakes.github.io/minimal-mistakes/docs/configuration/) (which this theme was forked from) might also be helpful.
 -->