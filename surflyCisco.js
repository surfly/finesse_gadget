var finesse = finesse || {};
finesse.gadget = finesse.gadget || {}, finesse.modules = finesse.modules || {}, finesse.modules.SurflyGadget = function() {
    var e, n, t, s = finesse.cslogger.ClientLogger;

    function i(i) {
        ad = i.getData(), n = {
                fN: i.getFirstName(),
                lN: i.getLastName()
            }, ad.hasOwnProperty("loginName") ? (n.lgN = ad.loginName, n.eN = n.lgN) : (n.lgN = void 0, n.eN = n.fN + n.lN),
            function(i) {
                s.log("Fetching access token");
                var a = e + "/v2/agents/access-token/?api_key=" + SurflySettings.apiKey,
                    r = new XMLHttpRequest;
                r.onerror = function() {
                    s.log("Unknown error encountered")
                }, r.ontimeout = function() {
                    s.log("Timeout")
                }, r.onreadystatechange = function() {
                    switch (r.readyState) {
                        case 1:
                            s.log("Server connection established");
                            break;
                        case 2:
                            s.log("Request received");
                            break;
                        case 3:
                            s.log("Processing Request");
                            break;
                        case 4:
                            if (s.log("Response Status: " + r.status.toString()), !r.responseText) throw new Error("Response empty");
                            s.log("Response: " + r.responseText), r.status >= 200 && r.status < 300 ? (n.aT = JSON.parse(r.responseText).agent_token, i()) : (t = r.responseText, i())
                    }
                }, r.open("POST", a), r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                var o = n.fN;
                n.lN && (o += " " + n.lN);
                var c = {
                        name: o,
                        email: n.eN.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/) ? n.eN : n.eN + "@" + SurflySettings.companyDomain
                    },
                    g = JSON.stringify(c);
                r.send(g)
            }(function() {
                containerServices.addHandler(finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB, _hTV), finesse.containerservices.ContainerServices.makeActiveTabReq()
            })
    }
    return _cTnV = function() {
        finesse.containerservices.ContainerServices.tabVisible() && window.setTimeout(_cTnV, 100)
    }, _hTV = function() {
        if ("" == document.getElementById("displayOut").innerHTML) try {
            t ? (document.getElementById("displayOut").innerHTML = t, gadgets.window.adjustHeight()) : function() {
                var t = e + "/embed/start/?agent_token=" + n.aT;
                s.log("IFrame URL: " + t);
                var i = '<iframe src="' + t + '" allow="camera=*;microphone=*" id="displayFrame" width="100%" height="600"></iframe>';
                document.getElementById("displayOut").innerHTML = i, gadgets.window.adjustHeight()
            }()
        } catch (e) {
            throw s.log("Error during render: " + e.message), e
        }
        window.setTimeout(_cTnV, 100)
    }, {
        init: function(n) {
            var t = finesse.gadget.Config;
            e = n, s.init(gadgets.Hub, "SurflyGadget", t), finesse.clientservices.ClientServices.init(t, !1), containerServices = finesse.containerservices.ContainerServices.init(), new finesse.restservices.User({
                id: t.id,
                onLoad: i
            })
        }
    }
}();