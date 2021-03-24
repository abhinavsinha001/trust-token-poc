## Welcome to Trust Token POC Demo Page

You can use the [editor on GitHub](https://github.com/abhinavsinha001/trust-token-poc/edit/gh-pages/index.md) to maintain and preview the content for your website in Markdown files.

Whenever you commit to this repository, GitHub Pages will run [Jekyll](https://jekyllrb.com/) to rebuild the pages in your site, from the content in your Markdown files.

{% include scripts.html %}

<!DOCTYPE html>
<html>
<body>
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
    <script src="https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit" async defer></script>

    <div id="reCaptcha"></div>
    <div id="ttInputElement" style="display:none;border:1px solid #dedede;padding:10px;box-shadow:rgb(123 122 122) 0px 0px 9px">
        <h3>Select Issuer</h3>
        <input type="radio" name="issuergroup" value="TrustTokenDev" onclick="setConfig(this);">TrustTokenDev<br>
        <input type="radio" name="issuergroup" value="TrustTokenWhiteOpsDev" onclick="setConfig(this);">WhiteOps<br>
        <input type="radio" name="issuergroup" value="TrustTokenGlitchMeDev" onclick="setConfig(this);">trust-token-issuer-demo.glitch.me
        <br><br>
        <label style="color: #085ba5; background: aliceblue" ; id="outcomelb" name="Operation outcome">Operation outcome here...</label>
        <br><br>
        <button style="border: none; background: #407db3; padding: 5px; color: #FFF; display: inline-block; margin: 10px 0px;text-transform: capitalize" onclick="hasToken()">Check if token exists</button>
        <button style="border: none; background: #407db3; padding: 5px; color: #FFF; display: inline-block; margin: 10px 0px;text-transform: capitalize" onclick="issuance()">issue token</button>
        <button style="border: none; background: #407db3; padding: 5px; color: #FFF; display: inline-block; margin: 10px 0px;text-transform: capitalize" onclick="redemption(false)">redem token</button>
        <button style="border: none; background: #407db3; padding: 5px; color: #FFF; display: inline-block; margin: 10px 0px;text-transform: capitalize" onclick="redemption(true)">redem token (refresh)</button>
        <button style="border: none; background: #407db3; padding: 5px; color: #FFF; display: inline-block; margin: 10px 0px;text-transform: capitalize" onclick="sendRedemption('', '')">sample bidder call(PubMatic)</button>
    </div>

</body>
</html>
