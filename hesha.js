


function call(t, e, n) {
	var i = t[e];
	t[e] = function(t) {
		n.call(this, t);
		i && i.call(this, t)
	}
}

function onShow() {
  /*
	try {
		St(this.route);
		vt.resume(Et);
		vt.trackPageStart(this.route)
	} catch (t) {
		e().v("onPageShow: ", t)
	}
  */
  console.log('page show');
}


function onPageHide() {
  /*
	try {
		vt.trackPageEnd(this.route)
	} catch (t) {
		e().v("onPageHide: ", t)
	}
  */
}

function onLoad(t) {

  
  /*
	try {
		St(this.route);
		t && (n = this.route, i = t, n && (It[n] = i));
		if (t) {
			Et.query = Et.query || {};
			p.assign(Et.query, t)
		}
		e().v("Page onLoad: ", t, Et)
	} catch (t) {
		e().v("onPageLoad: ", t)
	}
	var n, i
  */
 console.log('page onLoad');
 console.log(this);

 this.setData({})

}


function onShare(t, e) {
  / */
}

let vt={}

try {
	var page = Page;
	Page = function(t) {
		call(t, "onShow", onShow);
		call(t, "onHide", onPageHide);
		call(t, "onUnload", onPageHide);
		call(t, "onLoad", onLoad);
		onShare(t, vt);
		page(t)
	}
} catch (t) {
	e().w("Page重写异常")
}