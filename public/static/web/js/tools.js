function init(){localStorage.getItem("brsPrivacy")||document.getElementById("privacy_alert").classList.remove("d-none");let e=[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));e.map(function(e){return new bootstrap.Tooltip(e)});let o=window.location.pathname.substring(1);if(console.log(o),1<o.length)try{document.getElementById(o).classList.add("active");let e=document.getElementById("countries");(-1!=o.indexOf("-phone-number")&&"upcoming-phone-number"!==o||"country"===o)&&e.classList.add("active")}catch(e){let t=/receive-sms-from-([a-zA-Z]+)/;var n=t.exec(o);document.getElementById(n[1]+"-phone-number").classList.add("active"),document.getElementById("countries").classList.add("active")}}function stretchBottom(){var e=screen.availHeight;let t=document.getElementById("foot-null");e=e-t.offsetTop-232;0<e&&(t.style.height=e+"px")}function unload(){window.addEventListener("unload",function(e){console.log(1)})}function clickLoading(){let e=document.getElementsByClassName("click_loading");for(var t in e)e[t].onclick=function(){loading(!0)}}function scrollTop(){window.onscroll=function(e){let t=document.getElementById("top");document.documentElement.scrollTop>.1*document.body.clientHeight?t.classList.remove("d-none"):t.classList.add("d-none")}}function toast(e,t={}){void 0===t.type&&(t.type="success"),void 0===t.title&&(t.title="MESSAGE"),void 0===t.isClose&&(t.isClose=!0),void 0===t.showTime&&(t.showTime=5e3);let o=Math.floor(99999*Math.random());e='<div id="toast'+o+'" class="toast bg-'+t.type+' text-light m-1" aria-atomic="true" data-bs-autohide="'+t.isClose+'" data-bs-delay="'+t.showTime+`" style="width:450px;">
						  <div class="toast-header bg-`+t.type+` text-light">
						    <strong class="me-auto">`+t.title+`</strong>
						    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
						  </div>
						  <div class="toast-body">
						    `+e+`
						  </div>
						</div>`;let n=document.getElementById("toast-box");n.innerHTML+=e;let a=[].slice.call(document.querySelectorAll(".toast")),d=a.map(function(e){return new bootstrap.Toast(e,{animation:!0})});d.forEach(e=>e.show());let i=document.getElementById("toast"+o);i.addEventListener("hidden.bs.toast",function(e){let t=document.getElementById("toast"+o);t.parentNode.removeChild(t)})}function modal(e,t={},o,n){void 0===t.title&&(t.title="Message"),void 0===t.closeButton&&(t.closeButton="Close"),void 0===t.confirmButton&&(t.confirmButton="Confirm"),void 0===t.confirmButton&&(t.confirmButton="Confirm"),void 0===t.size&&(t.size="modal-lg"),void 0===t.autoClose&&(t.autoClose=!0);e=`<div class="modal fade" id="modal" data-bs-backdrop="false" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
						<div class="modal-dialog modal-dialog-scrollable `+t.size+` modal-dialog-centered">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title" id="modal-title">`+t.title+`</h5>
									<button type="button" class="btn-close" aria-label="Close" id="icon_close"></button>
								</div>
								<div class="modal-body" id="modal-body">
									`+e+`
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-secondary" id="close">`+t.closeButton+`</button>
									<button type="button" class="btn btn-primary" id="confirm">
									<span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true" id="confirm_loading"></span>
                                    `+t.confirmButton+`
                                    </button>
								</div>
							</div>
						</div>
					</div>`;document.body.insertAdjacentHTML("beforeend",e);let a=document.getElementById("modal"),d=new bootstrap.Modal(a,{backdrop:"static"});d.toggle();let i=document.getElementById("confirm"),l=document.getElementById("close"),s=document.getElementById("icon_close");i.addEventListener("click",function(e){t.autoClose&&(d.hide(),a.parentNode.removeChild(a)),o&&o(d)}),l.addEventListener("click",function(e){d.hide(),n&&n(d),a.parentNode.removeChild(a)}),s.addEventListener("click",function(e){d.hide(),a.parentNode.removeChild(a)})}function modalClose(e,t){e.hide();let o=document.getElementById("modal");e=o.parentNode.removeChild(o);t&&t(e),loading(!1)}function loading(e=!0,t=0,o=!0){let n=document.getElementById("loading"),a=document.getElementById("shade");e?(n.classList.remove("d-none"),o&&a.classList.remove("d-none"),0<t&&setTimeout(function(){n.classList.add("d-none"),a.classList.add("d-none")},1e3*t)):(n.classList.add("d-none"),a.classList.add("d-none"))}function copy(){let e=new ClipboardJS(".copy");toast("Copy success!!!"),e.on("error",function(e){toast("Copy fail!!!",{type:"danger"})})}function referrer(){let e="";0<document.referrer.length&&(e=document.referrer);try{0==e.length&&0<opener.location.href.length&&(e=opener.location.href)}catch(e){}return e}function captchaCallback(e){e&&$.ajax({url:"/hcaptcha",type:"post",data:{response:e},beforeSend:function(){loading()},success:function(e){console.log(e),0==e.error_code?(toast(e.msg),window.location.href=referrer()):toast(e.msg,{type:"danger"})},complete:function(){loading(!1)}})}function subscription(e){modal(`
		<div class="container">
			<div class="row">
				<div class="modal-body">
				<form id="subscription_form">
					<div class="form-floating mb-3">
					  <input class="form-control" placeholder="`+e.emailAddress+`" id="email_address" required onfocus="inputFocus('subscription_form')">
					  <label for="email_address" class="text-secondary">`+e.emailAddress+`</label>
				  	</div>
				  <div class="alert alert-secondary" role="alert">
					  `+e.explain+`
				  </div>
				</form>
			  </div>
			</div>
		</div>
	`,{title:e.title,size:"",autoClose:!1},function(e){inputFocus("subscription_form");var t=e;loadScript(function(){var e=$("#email_address").val();$.ajax({url:"/api/mailbox",type:"post",data:{mailbox:e},beforeSend:function(){$("#confirm").attr("disabled","disabled"),$("#confirm_loading").removeClass("d-none")},success:function(e){0==e.error_code?(toast(e.msg),modalClose(t)):toast(e.msg,{type:"danger"})},complete:function(){$("#confirm").removeAttr("disabled"),$("#confirm_loading").addClass("d-none")}})})},function(e){})}function feedback(e){modal(`
		<div class="container">
			<div class="row">
				<div class="modal-body">
				<form id="form_feedback">
					<div class="form-floating mb-3">
					  <textarea class="form-control" id="feedback_content" placeholder="`+e.contentPla+`" style="height: 100px" required onfocus="inputFocus('form_feedback')"></textarea>
                      <label for="floatingTextarea2" class="text-secondary">`+e.contentPla+`</label>
                      <div class="invalid-feedback">`+e.contentLabel+`</div>
				  	</div>
				  	<div class="form-floating mb-3">           
					  <input class="form-control" id="feedback_email" placeholder="`+e.emailAddress+`" required onfocus="inputFocus('form_feedback')">
					  <label for="email_address" class="text-secondary">`+e.emailAddress+`</label>
					  <div class="invalid-feedback">`+e.emailLabel+`</div>
				  	</div>
				</form>
			  </div>
			</div>
		</div>
	`,{title:e.title,size:"",autoClose:!1},function(e){inputFocus("form_feedback");let t=e;loadScript(function(){$("#email_address").val();$.ajax({url:"/api/feedback",type:"post",data:{content:$("#feedback_content").val(),email:$("#feedback_email").val(),type:1},beforeSend:function(){$("#confirm").attr("disabled","disabled"),$("#confirm_loading").removeClass("d-none")},success:function(e){0==e.error_code?(toast(e.msg),modalClose(t)):toast(e.msg,{type:"danger"})},complete:function(){$("#confirm").removeAttr("disabled"),$("#confirm_loading").addClass("d-none")}})})},function(e){})}function buttonLoading(e,t=!0){let o=document.getElementById(e);!0===t?o.classList.remove("d-none"):o.classList.add("d-none")}function loadScript(e,t){var o={jquery:"//"+window.location.host+"/static/web/js/jquery-3.6.0.min.js",copy:"//"+window.location.host+"/static/web/js/clipboard.min.js"};t=void 0===t?o.jquery:o[t];let n=document.createElement("script");n.type="text/javascript",n.readyState?n.onreadystatechange=function(){"loaded"!=n.readyState&&"complete"!=n.readyState||(n.onreadystatechange=null,e())}:n.onload=function(){e()},n.src=t,document.getElementsByTagName("head")[0].appendChild(n)}function inputFocus(e="form_data"){let t=document.getElementById(e);t.classList.add("was-validated")}window.onload=function(){init(),scrollTop(),clickLoading(),unload(),stretchBottom(),"function"==typeof copyPhone&&copyPhone(),"function"==typeof messageInit&&messageInit()};