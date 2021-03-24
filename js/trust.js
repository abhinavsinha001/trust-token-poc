issuers = {
    "TrustTokenDev": {
        "issuerTLD": "https://trusttoken.dev",
        "issuanceURL": "https://trusttoken.dev/tt/i?public=0&private=0",
        "redemptionURL": "https://trusttoken.dev/tt/r",
        "sendRedemptionURL": "https://trusttoken.dev/tt/echo",
        "bidders": ["bidderA", "bidderB", "bidderC"],
        "refreshPolicy": "none"
    },
    "TrustTokenWhiteOpsDev": {
        "issuerTLD": "https://whiteops-trust-token-dev.ccyjzf.com",
        "issuanceURL": "https://whiteops-trust-token-dev.ccyjzf.com/tt/i?public=0&private=0",
        "redemptionURL": "https://whiteops-trust-token-dev.ccyjzf.com/tt/r",
        "sendRedemptionURL": "https://whiteops-trust-token-dev.ccyjzf.com/tt/echo",
        "bidders": ["bidderB", "bidderC"],
        "refreshPolicy": "none"
    },
    "TrustTokenGlitchMeDev": {
        "issuerTLD": "https://trust-token-issuer-demo.glitch.me",
        "issuanceURL": "https://trust-token-issuer-demo.glitch.me/.well-known/trust-token/issuance",
        "redemptionURL": "https://trust-token-issuer-demo.glitch.me/.well-known/trust-token/redemption",
        "sendRedemptionURL": "https://trust-token-issuer-demo.glitch.me/.well-known/trust-token/send-rr",
        "bidders": ["bidderD"],
        "refreshPolicy": "none"
    }
}

function setConfig(issuerValue) {
    ttIssuer = issuers[issuerValue.value]
    if ("undefine" !== ttIssuer) {
        document.getElementById('outcomelb').innerHTML = issuerValue.value + " selected"
    } else {
        document.getElementById('outcomelb').innerHTML = "Please select issuer; No issuer selectd.."
    }

}

async function issuance() {
    if (hasToken()) {
        document.getElementById('outcomelb').innerHTML = "Token already present; not issueing again!!"
    } else {
        await fetch(ttIssuer.issuanceURL, {
            method: "POST",
            trustToken: {
                type: "token-request",
            },
            mode: "no-cors"
        }).then(function(r) {
            document.getElementById('outcomelb').innerHTML = "Token dropped successfully!!"
        });
    }
}

async function hasToken() {
    try {
        if (await document.hasTrustToken(ttIssuer['issuerTLD'])) {
            document.getElementById('outcomelb').innerHTML = "Token already present!!"
            return true
        } else {
            document.getElementById('outcomelb').innerHTML = "Token not found!!"
            return false
        }
    } catch (err) {
        document.getElementById('outcomelb').innerHTML = "err: " + err
        return false
    }
}

async function redemption(refresh) {
    var policy = "none";
    if (refresh) {
        policy = "refresh";
    }
    await fetch(ttIssuer.redemptionURL, {
        method: "POST",
        trustToken: {
            type: 'token-redemption',
            issuer: ttIssuer.issuerTLD,
            refreshPolicy: policy
        },
        mode: "no-cors"
    }).then(function(r) {
        document.getElementById('outcomelb').innerHTML = "Redemption Request Successful!"
    }).catch(function(e) {
        if (e.message == "Redemption operation aborted due to Signed Redemption Record cache hit") {
            document.getElementById('outcomelb').innerHTML = "Redemeded from cache!!"
        } else {
            document.getElementById('outcomelb').innerHTML = "Error in record redemption:" + e
        }
    });
}

async function sendRedemption(bidderEndPoint, jsonBody) {
    var bidderEndPoint = "https://hbopenbid.pubmatic.com/translator"
    var jsonBody = '{"id": "Xx9YUgAHNUIKARoRtAkpAw", "imp": [{"id": "1", "video": {"mimes": ["video/mp4"], "linearity": 1, "w": 300, "h": 250, "playbackmethod": [6 ], "pos": 3, "protocols": [2, 3, 5, 6 ], "skip": 1, "placement": 3, "playbackend": 2 }, "displaymanager": "GOOGLE", "tagid": "3151874646", "bidfloor": 0.94, "bidfloorcur": "USD", "secure": 1, "metric": [{"type": "click_through_rate", "value": 0.0008998322882689536, "vendor": "EXCHANGE"}, {"type": "viewability", "value": 0.02, "vendor": "EXCHANGE"}, {"type": "session_depth", "value": 1, "vendor": "EXCHANGE"} ], "ext": {"billing_id": ["26873502865"], "dfp_ad_unit_code": "/18190176/AdThrive_Content_1/555b58e1e5fcd639184185d6", "ampad": 3, "open_bidding": {"is_open_bidding": true } } } ], "site": {"page": "https://www.onecrazyhouse.com/100-school-lunches-ideas-kids-will-eat", "publisher": {"id": "pub-8501674430909082", "ext": {"country": "US"} }, "content": {"livestream": 0, "language": "en"}, "mobile": 1, "ext": {"amp": 0 } }, "device": {"ua": "Mozilla/5.0 (Linux; Android 10; Pixel 4 Build/QQ3A.200705.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/84.0.4147.89 Mobile Safari/537.36 [Pinterest/Android]", "ip": "97.119.243.0", "geo": {"country": "USA", "region": "NE", "metro": "652", "city": "Omaha", "zip": "68116"}, "make": "android", "model": "generic", "os": "android", "osv": "10", "devicetype": 4, "w": 412, "h": 732, "pxratio": 2.625, "ext": {"user_agent_data": {"browser": {"brand": "Chrome", "version": ["84", "0", "4147", "89"] }, "platform": {"brand": "Linux", "version": "9"}, "mobile": true, "architecture": "ARM64", "model": "Pixel 4"} } }, "user": {"id": "CAESEGwq9QWsk2nzXqkf9P9lVNY", "buyeruid": "8-nL-voHSIK14vkKm_075w", "customdata": "8-nL-voHSIK14vkKm_075w"}, "at": 1, "tmax": 300, "cur": ["USD"], "ext": {"google_query_id": "AAp4rFR3-V1_Brl6-7s0oVolI5YWNnU8vdRJq2cGP7adO3aGDXYM3pKqc3iTOsVWqOeJ-nuVXA"} }'

    await fetch(bidderEndPoint, {
        method: "POST",
        body: JSON.stringify(jsonBody),
        headers: new Headers({
            "Signed-Headers": "sec-redemption-record, sec-time",
            "Origin": "https://publisher-poc-glitch.com",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "omit",
        }),
        trustToken: {
            type: "send-redemption-record",
            issuers: [ttIssuer.issuerTLD],
            //issuers: [ttIssuer.issuerTLD, "https://whiteops-trust-token-dev.ccyjzf.com/tt/r"],
            signRequestData: "include",
            includeTimestampHeader: true //,
            //additionalSigningData: "additional_signing_data",
        },
        mode: "no-cors"
    }).then(function(r) {
        document.getElementById('outcomelb').innerHTML = "Bidder Request Successful!"
    }).catch(function(e) {
        document.getElementById('outcomelb').innerHTML = "Error in record redemption:" + e
    });
}
