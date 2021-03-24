## Welcome to Trust Token POC Demo Page

You can use the [editor on GitHub](https://github.com/abhinavsinha001/trust-token-poc/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

{% include scripts.html %}
{% include body.html %}

    <script type="text/javascript">
        var onloadCallback = function() {
            grecaptcha.render('reCaptcha', {
                'sitekey': '6Lc9Vo0aAAAAANC8-QJSuFVkXpfIbhOFJeu7tXw8',
                'callback': successRecaptcha
            });
        }
        var successRecaptcha = function() {
            console.log("Recaptcha Solved");
            document.getElementById('ttInputElement').style.display = "inline-block"
            document.getElementById('reCaptcha').style.display = "none"
        }
    </script>
