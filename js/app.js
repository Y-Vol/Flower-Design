function email_test(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
if (document.querySelector('.catalog-slider')) {
	new Swiper('.catalog-slider', {	
		observer: true, // Оновити свайпер при змінні елементів слайдера
		observeParents: true, // Оновити свайпер при змінні батьківських елементів слайдера					
		speed: 800,
		parallax: true, // робимо паралакс
		slidesPerView: 2,	
		spaceBetween: 25,						//column count of shown slide
		grid: {                            //row count of shown slide
			rows: 3,
		}, 
		breakpoints: {
			767: {
				slidesPerView: 3,							//column count of shown slide
				spaceBetween: 25,							//gap of slides
				grid: {                            //row count of shown slide
					rows: 2,
				}, 
			}
		},       
		pagination: {                       //pagination(dots)
				el: '.catalog__body .swiper-pagination',
				clickable: true,
		},
		navigation: {                       //navigation(arrows)
				nextEl: ".catalog__body .swiper-button-next",
				prevEl: ".catalog__body .swiper-button-prev",
		},
		});
}

if (document.querySelector('.comment__content')) {
	new Swiper('.comment__content', {
		observer: true, // Оновити свайпер при змінні елементів слайдера
		observeParents: true, // Оновити свайпер при змінні батьківських елементів слайдера		
		slidesPerView: 1,							//column count of shown slide
		spaceBetween: 10,							//gap of slides
		speed: 800,
		parallax: true, // робимо паралакс
		grid: {                            //row count of shown slide
			rows: 2,
		},          
		pagination: {                       //pagination(dots)
			el: '.comment__body .swiper-pagination',
				clickable: true,
		},
		navigation: {                       //navigation(arrows)
			nextEl: ".comment__body .swiper-button-next",
			prevEl: ".comment__body .swiper-button-prev",
		},
		});
}
var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('html').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support === true) {
		document.querySelector('html').classList.add('_webp');
	} else {
		document.querySelector('html').classList.add('_no-webp');
	}
});

function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();

window.addEventListener("load", function () {
	if (document.querySelector('.wrapper')) {
		setTimeout(function () {
			document.querySelector('.wrapper').classList.add('_loaded');
		}, 0);
	}
});

let unlock = true;

//=================
//Menu
let iconMenu = document.querySelector(".menu__icon");
if (iconMenu != null) {
	let delay = 500;
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			body_lock(delay);
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".menu__icon");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}

//=================
//BodyLock
function body_lock(delay) {
	let body = document.querySelector("body");
	if (body.classList.contains('_lock')) {
		body_lock_remove(delay);
	} else {
		body_lock_add(delay);
	}
}
function body_lock_remove(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		setTimeout(() => {
			for (let index = 0; index < lock_padding.length; index++) {
				const el = lock_padding[index];
				el.style.paddingRight = '0px';
			}
			body.style.paddingRight = '0px';
			body.classList.remove("_lock");
		}, delay);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
function body_lock_add(delay) {
	let body = document.querySelector("body");
	if (unlock) {
		let lock_padding = document.querySelectorAll("._lp");
		for (let index = 0; index < lock_padding.length; index++) {
			const el = lock_padding[index];
			el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		}
		body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
		body.classList.add("_lock");

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, delay);
	}
}
//=================

//Popups
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let index = 0; index < popup_link.length; index++) {
	const el = popup_link[index];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');
			popup_open(item);
		}
		e.preventDefault();
	})
}
for (let index = 0; index < popups.length; index++) {
	const popup = popups[index];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}
function popup_open(item) {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup_' + item);
	if (curent_popup && unlock) {
		if (!document.querySelector('.menu__body._active')) {
			body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let index = 0; index < popups.length; index++) {
				const popup = popups[index];
				popup.classList.remove('_active');
			}
		} else {
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			body_lock_remove(500);
		}
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.code === 'Escape') {
		popup_close();
	}
});

//=================

//IsHidden
function _is_hidden(el) {
	return (el.offsetParent === null)
}
// ShowMore Beta ========================
let moreBlocks = document.querySelectorAll('._more-block');
if (moreBlocks.length > 0) {
	let wrapper = document.querySelector('.wrapper');
	for (let index = 0; index < moreBlocks.length; index++) {
		const moreBlock = moreBlocks[index];
		let items = moreBlock.querySelectorAll('._more-item');
		if (items.length > 0) {
			let itemsMore = moreBlock.querySelector('._more-link');
			let itemsContent = moreBlock.querySelector('._more-content');
			let itemsView = itemsContent.getAttribute('data-view');
			if (getComputedStyle(itemsContent).getPropertyValue("transition-duration") === '0s') {
				itemsContent.style.cssText = "transition-duration: 1ms";
			}
			itemsMore.addEventListener("click", function (e) {
				if (itemsMore.classList.contains('_active')) {
					setSize();
				} else {
					setSize('start');
				}
				itemsMore.classList.toggle('_active');
				e.preventDefault();
			});

			let isScrollStart;
			function setSize(type) {
				let resultHeight;
				let itemsContentHeight = 0;
				let itemsContentStartHeight = 0;

				for (let index = 0; index < items.length; index++) {
					if (index < itemsView) {
						itemsContentHeight += items[index].offsetHeight;
					}
					itemsContentStartHeight += items[index].offsetHeight;
				}
				resultHeight = (type === 'start') ? itemsContentStartHeight : itemsContentHeight;
				isScrollStart = window.innerWidth - wrapper.offsetWidth;
				itemsContent.style.height = `${resultHeight}px`;
			}

			itemsContent.addEventListener("transitionend", updateSize, false);

			function updateSize() {
				let isScrollEnd = window.innerWidth - wrapper.offsetWidth;
				if (isScrollStart === 0 && isScrollEnd > 0 || isScrollStart > 0 && isScrollEnd === 0) {
					if (itemsMore.classList.contains('_active')) {
						setSize('start');
					} else {
						setSize();
					}
				}
			}
			window.addEventListener("resize", function (e) {
				if (!itemsMore.classList.contains('_active')) {
					setSize();
				} else {
					setSize('start');
				}
			});
			setSize();
		}
	}
}

window.onload = function () {
	document.addEventListener("click", documentActions);

	function documentActions(e) {
		const targetElement = e.target;
		if (targetElement.classList.contains('catalog__more')) {
			getCatalogs(targetElement);
			e.preventDefault();
		}
		if (targetElement.classList.contains('slide-catalog__button')) {
			const catalogId = targetElement.closest('.slide-catalog').dataset.pid;
			addToCart(targetElement, catalogId);
			e.preventDefault();
		}
		if (targetElement.classList.contains('cart-basket__icon') || targetElement.closest('.cart-basket__icon')) {
			if (document.querySelector('.cart-list').children.length > 0) {
				document.querySelector('.cart-basket').classList.toggle('_active');
			}
			e.preventDefault();
		} else if (!targetElement.closest('.cart-basket') && !targetElement.classList.contains('slide-catalog__button')) {
			document.querySelector('.cart-basket').classList.remove('_active');
		}

		if (targetElement.classList.contains('cart-list__delete')) {
			const catalogId = targetElement.closest('.cart-list__item').dataset.cartPid;
			updateCart(targetElement, catalogId, false);
			e.preventDefault();
		}

		if (targetElement.classList.contains('comment__arrow-button')) {
			getComments(targetElement);
			e.preventDefault();
		}
	}

	// Load More Catalogs
	async function getCatalogs(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "json/catalogs.json"; // Має бути адрес сервера 
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadCatalogs(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Помилка");
			}
		}
	}
	// Load More Catalogs
	function loadCatalogs(data) {
		const catalogsSlides = document.querySelector('.catalog__slides');

		data.catalogs.forEach(slide => {
			const catalogId = slide.id;
			const catalogUrl = slide.url;
			const catalogImage = slide.image;
			const catalogTitle = slide.title;
			const catalogText = slide.text;
			const catalogPrice = slide.price;

			let catalogTemplateStart = `<article data-pid="${catalogId}" class="swiper-slide slide-catalog">`;
			let catalogTemplateEnd = `</article>`;

			let catalogTemplateImage = `
		<a href="${catalogUrl}" class="slide-catalog__image">
			<img src="${catalogImage}" alt="${catalogTitle}">
		</a>
	`;

			let catalogTemplateBodyStart = `<div class="slide-catalog__content">`;
			let catalogTemplateBodyEnd = `</div>`;

			let catalogTemplateContent = `
		<div class="slide-catalog__desc">
			<h3 class="slide-catalog__title">${catalogTitle}</h3>
			<p class="slide-catalog__text">${catalogText}</p>
		</div>
	`;

			let catalogTemplatePrices = '';
			let catalogTemplatePricesCurrent = `<div class="slide-catalog__price">${catalogPrice}</div>`;

			catalogTemplatePrices = catalogTemplatePricesCurrent;

			let catalogTemplateActions = `
				<a href="" class="slide-catalog__button button">В кошик</a>
	`;

			let catalogTemplateBody = '';
			catalogTemplateBody += catalogTemplateBodyStart;
			catalogTemplateBody += catalogTemplateContent;
			catalogTemplateBody += catalogTemplatePrices;
			catalogTemplateBody += catalogTemplateActions;
			catalogTemplateBody += catalogTemplateBodyEnd;

			let catalogTemplate = '';
			catalogTemplate += catalogTemplateStart;
			catalogTemplate += catalogTemplateImage;
			catalogTemplate += catalogTemplateBody;
			catalogTemplate += catalogTemplateEnd;

			catalogsSlides.insertAdjacentHTML('beforeend', catalogTemplate);

		});

	}

	// AddToCart
	function addToCart(catalogButton, catalogId) {
		if (!catalogButton.classList.contains('_hold')) {
			catalogButton.classList.add('_hold');
			catalogButton.classList.add('_fly');

			const cart = document.querySelector('.cart-basket__icon');
			const catalog = document.querySelector(`[data-pid="${catalogId}"]`);
			const catalogImage = catalog.querySelector('.slide-catalog__image');

			const catalogImageFly = catalogImage.cloneNode(true);

			const catalogImageFlyWidth = catalogImage.offsetWidth;
			const catalogImageFlyHeight = catalogImage.offsetHeight;
			const catalogImageFlyTop = catalogImage.getBoundingClientRect().top;
			const catalogImageFlyLeft = catalogImage.getBoundingClientRect().left;

			catalogImageFly.setAttribute('class', '_flyImage _ibg');
			catalogImageFly.style.cssText =
				`
			left: ${catalogImageFlyLeft}px;
			top: ${catalogImageFlyTop}px;
			width: ${catalogImageFlyWidth}px;
			height: ${catalogImageFlyHeight}px;
		`;

			document.body.append(catalogImageFly);

			const cartFlyLeft = cart.getBoundingClientRect().left;
			const cartFlyTop = cart.getBoundingClientRect().top;

			catalogImageFly.style.cssText =
				`
			left: ${cartFlyLeft}px;
			top: ${cartFlyTop}px;
			width: 0px;
			height: 0px;
			opacity:0;
		`;

			catalogImageFly.addEventListener('transitionend', function () {
				if (catalogButton.classList.contains('_fly')) {
					catalogImageFly.remove();
					updateCart(catalogButton, catalogId);
					catalogButton.classList.remove('_fly');
				}
			});
		}
	}
	// updateCart
	function updateCart(catalogButton, catalogId, catalogAdd = true) {
		const cart = document.querySelector('.cart-basket');
		const cartIcon = cart.querySelector('.cart-basket__icon');
		const cartQuantity = cartIcon.querySelector('span');
		const cartCatalog = document.querySelector(`[data-cart-pid="${catalogId}"]`);
		const cartList = document.querySelector('.cart-list');

		//Додаємо
		if (catalogAdd) {
			if (cartQuantity) {
				cartQuantity.innerHTML = ++cartQuantity.innerHTML;
			} else {
				cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
			}
			if (!cartCatalog) {
				const catalog = document.querySelector(`[data-pid="${catalogId}"]`);
				const cartCatalogImage = catalog.querySelector('.slide-catalog__image').innerHTML;
				const cartCatalogTitle = catalog.querySelector('.slide-catalog__title').innerHTML;
				const cartCatalogText = catalog.querySelector('.slide-catalog__text').innerHTML;
				const cartCatalogContent = `
			<a href="" class="cart-list__image _ibg">${cartCatalogImage}</a>
			<div class="cart-list__body">
				<a href="" class="cart-list__title">${cartCatalogTitle}</a>
				<a href="" class="cart-list__text">${cartCatalogText}</a>
				<div class="cart-list__quantity">Кількість: <span>1</span></div>
				<a href="" class="cart-list__delete button">Видалити</a>
			</div>`;
				cartList.insertAdjacentHTML('beforeend', `<li data-cart-pid="${catalogId}" class="cart-list__item">${cartCatalogContent}</li>`);
			} else {
				const cartCatalogQuantity = cartCatalog.querySelector('.cart-list__quantity span');
				cartCatalogQuantity.innerHTML = ++cartCatalogQuantity.innerHTML;
			}

			// Після усіх дій
			catalogButton.classList.remove('_hold');
		} else {
			const cartCatalogQuantity = cartCatalog.querySelector('.cart-list__quantity span');
			cartCatalogQuantity.innerHTML = --cartCatalogQuantity.innerHTML;
			if (!parseInt(cartCatalogQuantity.innerHTML)) {
				cartCatalog.remove();
			}

			const cartQuantityValue = --cartQuantity.innerHTML;

			if (cartQuantityValue) {
				cartQuantity.innerHTML = cartQuantityValue;
			} else {
				cartQuantity.remove();
				cart.classList.remove('_active');
			}
		}
	}


	// Load More Comments
	async function getComments(button) {
		if (!button.classList.contains('_hold')) {
			button.classList.add('_hold');
			const file = "https://jsonplaceholder.typicode.com/posts";
			let response = await fetch(file, {
				method: "GET"
			});
			if (response.ok) {
				let result = await response.json();
				loadComments(result);
				button.classList.remove('_hold');
				button.remove();
			} else {
				alert("Помилка");
			}
		}
	}

	function loadComments(data) {
		const commentsSlides = document.querySelector('.comment-slider');
		data.forEach(slide => {
			const commentId = slide.id;
			const commentTitle = slide.title;
			const commentText = slide.body;

			let commentTemplateStart = `<article data-pid="${commentId}" class="swiper-slide slide-comment">`;
			let commentTemplateEnd = `</article>`;

			let commentTemplateImage = `
   	<div class="slide-comment__avatar">
   		<img src="img/happy.png" alt="${commentTitle}">
   	</div>
   `;

			let commentTemplateBodyStart = `<div class="slide-comment__desc">`;
			let commentTemplateBodyEnd = `</div>`;

			let commentTemplateContent = `
   	<p  class="slide-comment__text text">${commentText}</p>
   	<img class="slide-comment__line" src="img/Line 2.png" alt="Лінія">
   	<div class="slide-comment__info">
   		<p class="slide-comment__title">${commentTitle} ${date_time}</p>
   	</div>
   `;

			let commentTemplateBody = '';
			commentTemplateBody += commentTemplateBodyStart;
			commentTemplateBody += commentTemplateContent;
			commentTemplateBody += commentTemplateBodyEnd;

			let commentTemplate = '';
			commentTemplate += commentTemplateStart;
			commentTemplate += commentTemplateImage;
			commentTemplate += commentTemplateBody;
			commentTemplate += commentTemplateEnd;

			commentsSlides.insertAdjacentHTML('beforeend', commentTemplate);

		});
	}

}

// Пошук

let searchBtn = document.querySelector('.icon__search');
let searchBox = document.querySelector('.header__box');
let basketBtn = document.querySelector('.cart-basket__icon');
let firstBox = document.querySelector('.first');
let closeBtn = document.querySelector('.header__close');

if (searchBtn) {
	searchBtn.addEventListener("click", function (e) {
		searchBtn.classList.toggle('_active');
		searchBox.classList.toggle('_active');
		basketBtn.classList.toggle('_active');
	});
}
if (closeBtn) {
	closeBtn.addEventListener("click", function (e) {
		searchBox.classList.remove('_active');
		basketBtn.classList.remove('_active');
		searchBtn.classList.remove('_active');
	});
}
if (firstBox) {
	firstBox.addEventListener("click", function (e) {
		searchBox.classList.remove('_active');
		basketBtn.classList.remove('_active');
		searchBtn.classList.remove('_active');
	});
}

// Форма для коментарів

// Хочемо встановити фокус на форму при роботі з елементами
const commentForm = document.forms.comment;

commentForm.addEventListener("focusin", function (e) {
	commentForm.classList.add('_active');
});
if (commentForm) {
	commentForm.addEventListener("focusout", function (e) {
		commentForm.classList.remove('_active');
	});
}

//Лічильник для ввода з клавіатури
const txtItem = document.querySelector('.comment__textarea');
const txtItemLimit = txtItem.getAttribute('maxlength');
const txtCounter = document.querySelector('.comment__counter span');
txtCounter.innerHTML = txtItemLimit;

txtItem.addEventListener("input", txtSetCounter);

function txtSetCounter() {
	const txtCounterResult = txtItemLimit - txtItem.value.length;
	txtCounter.innerHTML = txtCounterResult;
}

//Фокусування лічильника
const commentText = document.querySelector('.comment__textarea');
const commentCounter = document.querySelector('.comment__counter');

commentText.addEventListener("focusin", function (e) {
	commentCounter.classList.add('_active');
});
if (commentText) {
	commentText.addEventListener("focusout", function (e) {
		commentCounter.classList.remove('_active');
	});
}

let arrowBtn = document.querySelector('.swiper-button-next');
let moreBtn = document.querySelector('.catalog__footer');

if (arrowBtn) {
	arrowBtn.addEventListener("click", function (e) {
		moreBtn.classList.add('_active');
	});
}

let newBtn = document.getElementById('listComments');
let addBtn = document.querySelector('.comment__footer');

if (newBtn) {
	newBtn.addEventListener("click", function (e) {
		addBtn.classList.add('_active');
	});
}  
//POST Comments
const commentsSlides = document.querySelector('.comment-slider');
document.getElementById("commentForm").addEventListener("submit", addComments);

async function addComments(e) {
   e.preventDefault();

   let title = document.getElementById("titleInput").value;
   let body = document.getElementById("bodyInput").value;

   const options = {
      method: "POST",
      body: JSON.stringify({ title: title, body: body, userId: 1}),
      headers: new Headers({
         "Content-Type": "application/json"
      })
   };

   const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts",
      options
   );


   if (response.ok) {
      let post = await response.json();
      loadComments(post);
   }

   document.getElementById("commentForm").reset();
}

let date = new Date();
let current_date = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
let date_time = current_date;

function loadComments(post) {
   const element = document.createElement('article');
   element.classList.add('swiper-slide', 'slide-comment');

   element.innerHTML = `
      <div class="slide-comment__avatar">
		<img src="img/happy.png" alt="reviews">
		</div>
		<div class="slide-comment__desc">
		<p class="slide-comment__text text">"${post.body}"</p>
		<img class="slide-comment__line" src="img/Line 2.png" alt="Лінія">
		<div class="slide-comment__info">
		<p class="slide-comment__title">${post.title} ${date_time}</p>
		</div>
		</div>
      `

   commentsSlides.appendChild(element)
}
let forms = document.querySelectorAll('form');
if (forms.length > 0) {
	for (let index = 0; index < forms.length; index++) {
		const el = forms[index];
		el.addEventListener('submit', form_submit);
	}
}
async function form_submit(e) {
	let btn = e.target;
	let form = btn.closest('form');
	let error = form_validate(form);
	if (error == 0) {
		let formAction = form.getAttribute('action') ? form.getAttribute('action').trim() : '#';
		let formMethod = form.getAttribute('method') ? form.getAttribute('method').trim() : 'GET';
		const message = form.getAttribute('data-message');
		const ajax = form.getAttribute('data-ajax');

		//SendForm
		if (ajax) {
			e.preventDefault();
			let formData = new FormData(form);
			form.classList.add('_sending');
			let response = await fetch(formAction, {
				method: formMethod,
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				form.classList.remove('_sending');
				if (message) {
					popup_open(message + '-message');
				}
				form_clean(form);
			} else {
				alert("Ошибка");
				form.classList.remove('_sending');
			}
		}
		// If test
		if (form.hasAttribute('data-test')) {
			e.preventDefault();
			if (message) {
				popup_open(message + '-message');
			}
			form_clean(form);
		}
	} else {
		let form_error = form.querySelectorAll('._error');
		if (form_error && form.classList.contains('_goto-error')) {
			_goto(form_error[0], 1000, 50);
		}
		e.preventDefault();
	}
}
function form_validate(form) {
	let error = 0;
	let form_req = form.querySelectorAll('._req');
	if (form_req.length > 0) {
		for (let index = 0; index < form_req.length; index++) {
			const el = form_req[index];
			if (!_is_hidden(el)) {
				error += form_validate_input(el);
			}
		}
	}
	return error;
}
function form_validate_input(input) {
	let error = 0;
	let input_g_value = input.getAttribute('data-value');

	if (input.getAttribute("name") == "email" || input.classList.contains("_email")) {
		if (input.value != input_g_value) {
			let em = input.value.replace(" ", "");
			input.value = em;
		}
		if (email_test(input) || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	} else if (input.getAttribute("type") == "checkbox" && input.checked == false) {
		form_add_error(input);
		error++;
	} else {
		if (input.value == '' || input.value == input_g_value) {
			form_add_error(input);
			error++;
		} else {
			form_remove_error(input);
		}
	}
	return error;
}
function form_add_error(input) {
	input.classList.add('_error');
	input.parentElement.classList.add('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
	let input_error_text = input.getAttribute('data-error');
	if (input_error_text && input_error_text != '') {
		input.parentElement.insertAdjacentHTML('beforeend', '<div class="form__error">' + input_error_text + '</div>');
	}
}
function form_remove_error(input) {
	input.classList.remove('_error');
	input.parentElement.classList.remove('_error');

	let input_error = input.parentElement.querySelector('.form__error');
	if (input_error) {
		input.parentElement.removeChild(input_error);
	}
}
function form_clean(form) {
	let inputs = form.querySelectorAll('input,textarea');
	for (let index = 0; index < inputs.length; index++) {
		const el = inputs[index];
		el.parentElement.classList.remove('_focus');
		el.classList.remove('_focus');
		el.value = el.getAttribute('data-value');
	}
}

//Placeholers
let inputs = document.querySelectorAll('input[data-value],textarea[data-value]');
inputs_init(inputs);

function inputs_init(inputs) {
	if (inputs.length > 0) {
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			const input_g_value = input.getAttribute('data-value');
			input_placeholder_add(input);
			if (input.value != '' && input.value != input_g_value) {
				input_focus_add(input);
			}
			input.addEventListener('focus', function (e) {
				if (input.value == input_g_value) {
					input_focus_add(input);
					input.value = '';
				}
				form_remove_error(input);
			});
			input.addEventListener('blur', function (e) {
				if (input.value == '') {
					input.value = input_g_value;
					input_focus_remove(input);
					if (input.classList.contains('_mask')) {
						input_clear_mask(input, input_g_value);
					}
					if (input.getAttribute('data-type') === "pass") {
						input.setAttribute('type', 'text');
					}
				}
			});
		}
	}
}
function input_placeholder_add(input) {
	const input_g_value = input.getAttribute('data-value');
	if (input.value == '' && input_g_value != '') {
		input.value = input_g_value;
	}
}
function input_focus_add(input) {
	input.classList.add('_focus');
	input.parentElement.classList.add('_focus');
}
function input_focus_remove(input) {
	input.classList.remove('_focus');
	input.parentElement.classList.remove('_focus');
}
function input_clear_mask(input, input_g_value) {
	input.inputmask.remove();
	input.value = input_g_value;
	input_focus_remove(input);
}

let TRange=null;
function findString (str) {
	let strFound;
	if (window.find) {

strFound=self.find(str);
	if (strFound && self.getSelection && !self.getSelection().anchorNode) {
   strFound=self.find(str)
	}
	if (!strFound) {
   strFound=self.find(str,0,1)
   while (self.find(str,0,1)) continue
	}
}
else if (Netscape.indexOf("Microsoft")!=-1) {


if (TRange!=null) {
   TRange.collapse(false)
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
}
if (TRange==null || strFound==0) {
   TRange=self.document.body.createTextRange()
   strFound=TRange.findText(str)
   if (strFound) TRange.select()
	}
}
	if (!strFound) alert ("Значення '"+str+"' не знайдено!")
	return;
}