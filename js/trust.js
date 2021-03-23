async function onloadCallback() {
            	var issuanceURL = ""
            	var redemptionURL = ""
            	var sendRedemptionURL = ""
            
              	var issuerWhiteOpsTrustTokenDevURL = "https://whiteops-trust-token-dev.ccyjzf.com"
            	var issurSamplTrustTokenDevURL = "https://trusttoken.dev"
            	var issuerGlichURL = "https://trust-token-issuer-demo.glitch.me"
            	var ttIssuer = issuerGlichURL
            
            	if (ttIssuer = issuerGlichURL) {
            	  issuanceURL = `${ttIssuer}/.well-known/trust-token/issuance`
            	  redemptionURL = `${ttIssuer}/.well-known/trust-token/redemption`
            	  sendRedemptionURL = `${ttIssuer}/.well-known/trust-token/send-rr`
            	} else {
            	  issuanceURL = `${ttIssuer}/tt/i?public=0&private=0`
            	  redemptionURL = `${ttIssuer}/tt/r`
            	  sendRedemptionURL = `${ttIssuer}/tt/echo`
            	}
            
            	console.log("Redemption Request");
            	try {
                	if (await document.hasTrustToken(ttIssuer)) {
            			// redemption
            			await fetch(redemptionURL, {
            			  method: "POST",
            			  trustToken: {
            				type: 'token-redemption',
            				issuer: ttIssuer
            			  },
            			  mode: "no-cors"
            			}).catch(function (e) {
            				console.log("Error in fetch '" +ttIssuer+ "/tt/r':", e)
            			});
            			console.log("Redemption Request Successful!");
            
            
            			// sending redemption record
            			console.log("Redemption Sending Request");
            			var res = await fetch(sendRedemptionURL, {
            			  method: "POST",
            			  headers: new Headers({ "Signed-Headers": "sec-redemption-record, sec-time",
            			  "Origin": "https://publisher-poc-glitch.com",
            			  "Content-Type": "application/json",
            			  "Access-Control-Allow-Credentials": "omit",
            			  }),
            			  trustToken: {
            				type: "send-redemption-record",
            				issuers: [ttIssuer],
            				signRequestData: "include",
            				includeTimestampHeader: true,
            				//additionalSigningData: "additional_signing_data"
            			  },
            			  mode: "no-cors"
            			});
            
            			//const body = await res.json();
                  		//console.log(JSON.stringify(body, " ", " "));
            			const body = await res;
            			console.log(body)
            			console.log(JSON.stringify(body, " ", " "));
            
                		if (body.sig_verify) {
            			  console.log("true")
            			} else {
            			  console.log("false")
            			}
            
            			/*
            			fetch(ttIssuer + "/tt/echo", {
            				trustToken: {
            					type: 'send-redemption-record',
            					issuers:[ttIssuer]
            				},
            				mode: "no-cors"
            			}).then(function(r) {
            				console.log(r)
            				console.log(r.text())
                  			r.text().then(function (text) {
            					console.log(text)
                      			        var body = text.split(';')[1].split(':')[1];
            					console.log(body)
            					console.log(atob(body))
                    		        });
                  		}).catch(function(e) {
                                        console.log(e.message);
              	    	        });
            			*/
            		} else {
            			// issuer request
            			console.log("Token not found")
            			await fetch(issuanceURL, {
            				method: "POST",
            				trustToken: {
            					type: "token-request",
            				},
            				mode: "no-cors"
            			});
            			console.log("Issuer Token is dropped");
            		}
            	} catch (err) {
                	console.error(err);
            	}
            };
            onloadCallback();
