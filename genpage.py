"""
This script is meant to generate an entire website, made for an archive of some sort for
/wg/ and perhaps deviantart
DATE: 12.6.16
AUTH: Norton Pengra
"""

# === HTML CONSTANTS ===

HTMLPAGE = """
<!DOCTYPE HTML>
<!--
	Future Imperfect by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>{$TITLE$}</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://html5up.net/uploads/demos/future-imperfect/assets/css/main.css" />
	</head>
	<body>

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Header -->
					<header id="header">
						<h1><a href="#">{$TITLE$}</a></h1>
						<nav class="links">
							<ul>
								{$LINKS$}
							</ul>
						</nav>
						<nav class="main">
							<ul>
								<li class="search">
									<a class="fa-search" href="{$SEARCH$}">Search</a>
									<form id="search" method="get" action="{$SEARCH$}">
										<input type="text" name="query" placeholder="Search" />
									</form>
								</li>
								<li class="menu">
									<a class="fa-bars" href="#menu">Menu</a>
								</li>
							</ul>
						</nav>
					</header>

				<!-- Menu -->
					<section id="menu">

						<!-- Search -->
							<section>
								<form class="search" method="get" action="{$SEARCH$}">
									<input type="text" name="query" placeholder="Search" />
								</form>
							</section>

						<!-- Links -->
							<section>
								<ul class="links">
									{$RECENT$}
								</ul>
							</section>

						<!-- Actions -->
							<section>
								<ul class="actions vertical">
									<li><a href="{$SUBSCRIBE$}" class="button big fit">Subscribe</a></li>
								</ul>
							</section>

					</section>

				<!-- Main -->
					<div id="main">

						<!-- Post -->
                        {$POSTS$}

						<!-- Pagination -->
							<ul class="actions pagination">
								<li><a href="{$PREVPAGE$}" class="{$PREVPAGEDISABLED$} button big previous">Previous Page</a></li>
								<li><a href="{$NEXTPAGE$}" class="{$NEXTPAGEDISABLED$} button big next">Next Page</a></li>
							</ul>

					</div>

				<!-- Sidebar -->
					<section id="sidebar">

						<!-- Intro -->
							<section id="intro">
								<a href="#" class="logo"><img src="images/logo.jpg" alt="" /></a>
								<header>
									<h2>{$TITLE$}</h2>
									<p>{$SUBTITLE$}</p>
								</header>
							</section>

						<!-- Mini Posts -->
							<section>
								<div class="mini-posts">

									<!-- Mini Post -->
									{$MINIPOSTS$}

								</div>
							</section>

						<!-- Posts List -->
							<section>
								<ul class="posts">
                                    {$MICROPOSTS$}
								</ul>
							</section>

						<!-- About -->
							<section class="blurb">
								<h2>About</h2>
								{$ABOUT$}
							</section>

						<!-- Footer -->
							<section id="footer">
								<ul class="icons">
                                    {$ICONS$}
								</ul>
								{$COPYRIGHT$}
							</section>

					</section>

			</div>

		<!-- Scripts -->
			<script src="https://html5up.net/uploads/demos/future-imperfect/assets/js/jquery.min.js"></script>
			<script src="https://html5up.net/uploads/demos/future-imperfect/assets/js/skel.min.js"></script>
			<script src="https://html5up.net/uploads/demos/future-imperfect/assets/js/util.js"></script>
			<script src="https://html5up.net/uploads/demos/future-imperfect/assets/js/main.js"></script>

	</body>
</html>"""

RECENT = """<li>
    <a href="{$LINK$}">
        <h3>{$TITLE$}</h3>
        <p>{$TEXT$}</p>
    </a>
</li>"""

POST = """<article class="post">
    <header>
        <div class="title">
            <h2><a href="{$URL$}">{$TITLE$}</a></h2>
            <p>{$SUBTITLE$}</p>
        </div>
        <div class="meta">
            <time class="published">{$TIMESTAMP$}</time>
            <a href="{$AUTHORURL$}" class="author"><span class="name">{$AUTHOR$}</span><img src="{$AUTHORAVATAR$}" alt="{$AUTHOR$}" /></a>
        </div>
    </header>
    <a href="{$URL$}" class="image featured"><img src="{$URL$}" alt="{$TITLE$}" /></a>
    <p>{$IMAGEDESC$}</p>
    <footer>
        <ul class="actions">
            <li><a href="{$TAGURL$}" class="button big">More under "{$PRIMARYTAG$}" tag</a></li>
        </ul>
        <ul class="stats">
            {$TAGS$}
            <li><a href="{$likesurl$}" class="icon fa-heart">{$LIKES$}</a></li>
            <li><a href="{$COMMENTSURL$}" class="icon fa-comment">{$COMMENTS$}</a></li>
        </ul>
    </footer>
</article>"""

MINIPOST = """<article class="mini-post">
    <header>
        <h3><a href="{$URL$}">{$TITLE$}</a></h3>
        <time class="published">{$TIMESTAMP$}</time>
        <a href="{$AUTHORURL$}" class="author"><img src="{$AUTHORAVATAR$}" alt="{$AUTHOR$}" /></a>
    </header>
    <a href="{$URL$}" class="image"><img src="{$URL$}" alt="{$IMAGEDESC$}" /></a>
</article>"""

MICROPOST = """<li>
    <article>
        <header>
            <h3><a href="{$URL$}">{$TITLE$}</a></h3>
            <time class="published">{$TIMESTAMP$}</time>
        </header>
        <a href="{$URL$}" class="image"><img src="{$URL$}" alt="{$TITLE$}" /></a>
    </article>
</li>"""

ICONS = """
<li><a href="#" class="fa-facebook"><span class="label">Facebook</span></a></li>"""

COPYRIGHT = """
<p class="copyright">&copy; Norton Pengra. Design: <a href="http://html5up.net">HTML5 UP</a>. Images: <a href="http://unsplash.com">Unsplash</a>.</p>
"""

# === COMPONENT CLASS DEFINITIONS ===


class Component(object):
    templateText = None
    templateReqs = []
    templateKeys = {}
    strict = True

    def __init__(self, **kwargs):
        self.rawText = ""
        if self.templateText is None:
            raise ValueError("templateText must be a valid string")
        if set(kwargs.keys()) != set(self.templateReqs) and self.strict:
            raise ValueError(
                "template requires the following keys:", self.templateReqs, 'currently has:', self.templateKeys.keys())
        self.templateKeys = kwargs

    def dictToString(self, kwargs):
        currentRound = self.templateText
        print(kwargs)
        for key, value in kwargs.values():
            currentRound = currentRound.replace(
                "{$%s$}" % key.upper(), str(value))
        self.rawText += currentRound

    def generateString(self):
        if isinstance(self.templateKeys, list):
            for item in self.templateKeys:
                self.dictToString(item)
        else:
            self.dictToString(self.templateKeys)

    def __str__(self):
        self.generateString()
        return self.rawText


class FutureImperfectTemplate(Component):
    templateText = HTMLPAGE
    templateReqs = ['title',
                    'links',
                    'search',
                    'recent',
                    'subscribe',
                    'prevpage',
                    'nextpage',
                    'prevpagedisabled',
                    'nextpagedisabled',
                    'subtitle',
                    'posts',
                    'miniposts',
                    'microposts',
                    'about',
                    'icons',
                    'copyright'
                    ]


class MiniPostComponent(Component):
    templateText = MINIPOST
    templateReqs = [
        "url", "title", "timestamp", "authorurl", "authoravatar", "author", "imagedesc"
    ]


class MicroPostComponent(Component):
    templateText = MICROPOST
    templateReqs = [
        "url", "title", "timestamp"
    ]


class PostComponent(Component):
    templateText = POST
    templateReqs = [
        "url",
        "title",
        "subtitle",
        "timestamp",
        "authorurl",
        "author",
        "authoravatar",
        "imagedesc",
        "tags",
        "likesurl",
        "likes",
        "commentsurl",
        "comments"
    ]


class RecentComponent(Component):
    templateText = RECENT
    templateReqs = ['link', 'title', 'text']

# === OBJECT INSTANTIATIONS ===

exampleImages = [
    "http://imgur.com/FBQF0Zr.png",  # tubes o science
    "http://imgur.com/O5HHSqo.png",  # overwatch girl
    "http://imgur.com/iSPtMml.png",  # asian landscape
]

recent = RecentComponent(
    link=exampleImages[0], title='Tubes o science', text='Some tubes of science')
posts = PostComponent(**{'url': "http://imgur.com/FBQF0Zr.png",
                        'title': 'Tubes o science',
                        'subtitle': 'some tubes o science',
                        'timestamp': 'Dec 6, 2016',
                        'authorurl': 'http://qwergram.github.io/me.html',
                        'author': 'Norton Pengra',
                        'authoravatar': 'http://qwergram.github.io/prof.jpg',
                        'imagedesc': 'some tubes o science',
                        'tags': ['science',
                                 'blue',
                                 'tubes'],
                        'likesurl': '#',
                        'likes': 0,
                        'commentsurl': '#',
                        'comments': 45})

page = FutureImperfectTemplate(title="TEST1", links="", search="#",
                               recent=recent, subscribe='#', prevpage='#',
                               nextpage='#', prevpagedisabled='disabled', nextpagedisabled='disabled',
                               subtitle='Test round #1', posts=posts, miniposts='', microposts='', about='', icons=ICONS, copyright=COPYRIGHT)

print(page)