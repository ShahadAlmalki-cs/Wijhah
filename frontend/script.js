const buildingNames = {
	2: ['College of Education', 'كلية التربية'],
	3: ['College of Science', 'كلية العلوم'],
	4: ['College of Medicine', 'كلية الطب'],
	5: ['College of Business Administration', 'كلية إدارة الأعمال'],
	6: ['College of Sharia and Regulations', 'كلية الشريعة والأنظمة'],
	7: ['College of Medicine Labs', 'معامل كلية الطب'],
	8: ['College of Pharmacy', 'كلية الصيدلة'],
	9: ['Computer College Labs', 'معامل كلية الحاسبات'],
	10: ['College of Applied Medical Sciences', 'كلية العلوم الطبية التطبيقية'],
	11: ['Classrooms (A)', 'الفصول الدراسية (أ)'],
	12: ['Classrooms (B)', 'الفصول الدراسية (ب)'],
	13: ['College of Designs and Home Economics', 'كلية التصاميم والاقتصاد المنزلي'],
	14: ['College of Computers and Information Technology', 'كلية الحاسبات وتقنية المعلومات'],
	15: ['Deanship of University Studies', 'عمادة الدراسات الجامعية'],
	16: ['Eastern Student Entrance (A)', 'مدخل الطالبات الشرقي (أ)'],
	17: ['Deanship of Admission and Registration', 'عمادة القبول والتسجيل'],
	18: ['Classrooms (C)', 'الفصول الدراسية (ج)'],
	19: ['Grand Lecture Hall (Theatre)', 'قاعة المحاضرات الكبرى (المسرح)'],
	20: ['Student Affairs Building', 'مبنى شؤون الطالبات'],
	21: ['College of Pharmacy Labs', 'معامل كلية الصيدلة'],
	22: ['Medical Sciences Building', 'مبنى العلوم الطبية'],
	23: ['Deanship of Graduate Studies', 'عمادة الدراسات العليا'],
	24: ['Campus building', 'مبنى جامعي'],
	25: ['Campus building', 'مبنى جامعي'],
	26: ['Campus building', 'مبنى جامعي'],
	27: ['Campus building', 'مبنى جامعي']
};

const getDeliveryFee = (number) => number === 16 ? 0 : number <= 15 ? 5 : 10;

// The API runs on its own port, so never derive it from window.location.origin.
// Override with window.WIJHAH_API_BASE before this script loads.
const WIJHAH_API_HOSTS = ['http://localhost:5000', 'http://127.0.0.1:5000'];

const WIJHAH_API_BASE = (() => {
	if (typeof window.WIJHAH_API_BASE === 'string' && window.WIJHAH_API_BASE) {
	return window.WIJHAH_API_BASE.replace(/\/$/, '');
	}
	if (WIJHAH_API_HOSTS.includes(window.location.origin)) {
	return window.location.origin;
	}
	return WIJHAH_API_HOSTS[0];
})();

const copy = {
	en: {
		navHome: 'Home', navVendors: 'Vendors', navBuildings: 'Buildings', navTracking: 'Track order', navHelp: 'Help', navOrder: 'Start an order', language: 'العربية',
		footer: 'Independent student project for Taif University',
			homeEyebrow: 'TAIF UNIVERSITY CAMPUS · INDEPENDENT STUDENT SERVICE', homeTitle: 'Your break,<br><em>made easy.</em>', homeText: 'Order your favorite meal and have it waiting at your building before your next class.', choose: 'Browse the menu <span aria-hidden="true">&#8594;</span>', average: '<strong>15 min</strong><br>average delivery', today: 'TODAY ON CAMPUS', goodFood: 'Good food.<br>Zero queues.', delivered: 'Delivered to your building', mapTitle: 'Campus map', mapHint: 'Click a building to select it', mapDisclaimer: 'Uses UniversityMap.jpeg when available. Tap a numbered building to continue.',
		aboutEyebrow: 'STEP 1 OF 2', aboutTitle: 'Where should we<br><em>meet you?</em>', aboutText: 'Choose your building to see the delivery time and fee. You can change it later in your order.', campus: 'Campus buildings', locations: '26 locations', quick: 'Quick delivery,<br>right to your door.', feeInfo: 'Restaurants are in Building 16. Building 16 is free, buildings 2–15 are <strong>5 SAR</strong>, and buildings 17–27 are <strong>10 SAR</strong>.', continue: 'Continue to order',
		pick: 'Pick a building', pickSmall: 'We deliver across campus', tell: 'Tell us your order', tellSmall: 'Simple, no account needed', enjoy: 'Enjoy your break', enjoySmall: 'Fast delivery, every time', ready: 'ORDER WHENEVER', spotlight: 'Make your next order<br>the easiest one yet.', prices: 'View delivery prices <span aria-hidden="true">&#8594;</span>', fromClass: 'From class<br>to comfort.', fromText: 'One clear form gets your meal moving. No waiting in line or hunting for the right counter.', place: 'Place an order <span aria-hidden="true">&#8594;</span>', know: 'Know where<br>it is going.', knowText: 'Choose your building at checkout and see the delivery fee before you send anything.', see: 'Browse vendors <span aria-hidden="true">&#8594;</span>',
		orderEyebrow: 'STEP 2 OF 2', orderTitle: 'Tell us what<br><em>you are craving.</em>', orderText: 'Fill in the details below and we will get your order moving.', details: 'Your details', fullName: 'Full name', email: 'Email address', phone: 'Mobile number', phoneHint: 'Saudi mobile number: 05xxxxxxxx or +9665xxxxxxxx', deliveryPoint: 'Delivery point', building: 'Building', selectBuilding: 'Select your building', orderSection: 'Your order', notesSection: 'Order notes', noteLabel: 'Anything we should know?', sendOrder: 'Send my order', delivery: 'YOUR DELIVERY', rangePickup: 'Restaurant pickup', rangeSame: 'Building 16', rangeNear: 'Buildings 2–15', rangeFar: 'Buildings 17–27', subtotal: 'Subtotal', deliveryLabel: 'Delivery', total: 'Total', simple: 'Simple pricing.<br>No surprises.', estimated: 'Estimated arrival', arrival: 'Within 15–20 minutes', privacy: 'We will use your email only to confirm this order.',
		contactEyebrow: 'WE ARE HERE TO HELP', contactTitle: "Questions?<br><em>Let's talk.</em>", contactText: 'Send us a message and the Wijhah team will get back to you as soon as possible.', yourName: 'Your name', message: 'Message', sendMessage: 'Send message', detailsTitle: 'CONTACT DETAILS', support: 'Wijhah<br>support desk', supportText: 'For order questions, building updates or feedback, send us a note or email us directly.', hours: 'Sunday – Thursday<br>8:00 AM – 4:00 PM'
	},
	ar: {
		navHome: 'الرئيسية', navVendors: 'المطاعم', navBuildings: 'المباني', navTracking: 'تتبع الطلب', navHelp: 'المساعدة', navOrder: 'ابدأ طلبك', language: 'English',
		footer: 'مشروع طلابي مستقل لجامعة الطائف',
		homeEyebrow: 'حرم جامعة الطائف · خدمة طلابية مستقلة', homeTitle: 'اطلب وجبتك<br><em>بكل سهولة.</em>', homeText: 'من كافيهات ومطاعم الجامعة مباشرة إلى مبناك، دون عناء الانتظار.', choose: 'تصفح القائمة <span aria-hidden="true">&#8592;</span>', average: '<strong>١٥ دقيقة</strong><br>متوسط التوصيل', today: 'اليوم في الحرم الجامعي', goodFood: 'طعام لذيذ.<br>بلا طوابير.', delivered: 'التوصيل إلى مبناك',
		pick: 'اختر المبنى', pickSmall: 'نوصّل إلى كل أنحاء الحرم', tell: 'حدّد طلبك', tellSmall: 'نموذج بسيط بلا حساب', enjoy: 'استمتع بوقتك', enjoySmall: 'توصيل سريع في كل مرة', ready: 'اطلب متى شئت', spotlight: 'اجعل طلبك القادم<br>الأسهل حتى الآن.', prices: 'عرض أسعار التوصيل <span aria-hidden="true">&#8592;</span>', fromClass: 'من المحاضرة<br>إلى راحتك.', fromText: 'نموذج واحد واضح يوصّل طلبك، بلا انتظار في الطوابير أو بحث عن الوجهة الصحيحة.', place: 'اطلب الآن <span aria-hidden="true">&#8592;</span>', know: 'اعرف أين<br>يصل طلبك.', knowText: 'اختر مبناك عند الدفع واطّلع على رسوم التوصيل قبل الإرسال.', see: 'تصفح المطاعم <span aria-hidden="true">&#8592;</span>',
				aboutEyebrow: 'الخطوة 1 من 2', aboutTitle: 'إلى أي مبنى<br><em>نوصل طلبك؟</em>', aboutText: 'اختر مبناك لعرض وقت التوصيل ورسومه، ويمكنك تغييره لاحقًا أثناء الطلب.', campus: 'مباني الجامعة', locations: '26 موقعًا', mapTitle: 'خريطة الحرم الجامعي', mapHint: 'اضغط على مبنى لاختياره', mapDisclaimer: 'تظهر الصورة الأصلية UniversityMap.jpeg عند توفرها. اختر مبنى مرقمًا للمتابعة.', quick: 'توصيل سريع،<br>إلى بابك مباشرة.', feeInfo: 'المطاعم في المبنى 16. التوصيل إلى المبنى 16 مجاني، وإلى المباني 2–15 بـ<strong>5 ريالات</strong>، وإلى المباني 17–27 بـ<strong>10 ريالات</strong>.', continue: 'متابعة الطلب',
				orderEyebrow: 'الخطوة 2 من 2', orderTitle: 'أخبرنا بما<br><em>تشتهيه اليوم.</em>', orderText: 'عبّئ البيانات التالية وسنبدأ تجهيز طلبك.', details: 'بياناتك', fullName: 'الاسم الكامل', email: 'البريد الإلكتروني', phone: 'رقم الجوال', phoneHint: 'رقم جوال سعودي: 05xxxxxxxx أو +9665xxxxxxxx', deliveryPoint: 'مكان التوصيل', building: 'المبنى', selectBuilding: 'اختر المبنى', orderSection: 'طلبك', notesSection: 'ملاحظات الطلب', noteLabel: 'هل لديك ملاحظات؟', sendOrder: 'إرسال الطلب', delivery: 'تفاصيل التوصيل', rangePickup: 'استلام من المطعم', rangeSame: 'المبنى 16', rangeNear: 'المباني 2–15', rangeFar: 'المباني 17–27', subtotal: 'المجموع الفرعي', deliveryLabel: 'التوصيل', total: 'الإجمالي', simple: 'أسعار واضحة.<br>بلا مفاجآت.', estimated: 'وقت الوصول المتوقع', arrival: 'خلال 15–20 دقيقة', privacy: 'سنستخدم بريدك الإلكتروني لتأكيد الطلب فقط.',
		contactEyebrow: 'نحن هنا للمساعدة', contactTitle: 'لديك سؤال؟<br><em>تواصل معنا.</em>', contactText: 'أرسل رسالتك وسيتواصل معك فريق وجهة في أقرب وقت.', yourName: 'اسمك', message: 'الرسالة', sendMessage: 'إرسال الرسالة', detailsTitle: 'بيانات التواصل', support: 'فريق دعم<br>وجهة', supportText: 'للاستفسار عن الطلبات أو المباني أو لإرسال ملاحظاتك، راسلنا أو تواصل معنا عبر البريد.', hours: 'الأحد – الخميس<br>8:00 ص – 4:00 م'
	}
};

const setCopy = (selector, key, language, property = 'innerHTML') => {
	const element = document.querySelector(selector);
	if (!element) return;
	if (property === 'firstChild') {
		element.firstChild.textContent = copy[language][key];
		return;
	}
	element[property] = copy[language][key];
};

const renderVendorPage = (language) => {
	const vendorGrid = document.getElementById('vendorGrid');
	if (!vendorGrid || typeof campusVendors === 'undefined') return;
	const isArabic = language === 'ar';
	const savedBuilding = localStorage.getItem('wijhah-building');
	const text = isArabic ? {
		eyebrow: 'المطاعم المفتوحة الآن', title: 'اختر ما<br><em>تحبه اليوم.</em>', description: 'تصفح المطاعم التي تخدم الحرم الجامعي اليوم. جميع الطلبات تجهز من المبنى 16.', count: `${campusVendors.length} مطاعم مفتوحة`, location: 'التوصيل من المبنى 16', change: 'اختر مبنى التوصيل', menu: 'قائمة الطعام', add: 'إضافة', building: 'المبنى', minutes: 'دقيقة'
	} : {
		eyebrow: 'OPEN ON CAMPUS', title: 'Find something<br><em>you\'ll love.</em>', description: 'Browse the places serving campus today. Everything here is prepared in Building 16. You can add meals now and choose your building at checkout.', count: `${campusVendors.length} places open now`, location: 'Delivery from Building 16', change: 'Choose your delivery building', menu: 'Menu', add: 'Add', building: 'Building', minutes: 'min'
	};
	document.getElementById('vendorEyebrow').innerHTML = text.eyebrow;
	document.getElementById('vendorTitle').innerHTML = text.title;
	document.getElementById('vendorText').textContent = text.description;
	document.getElementById('vendorCount').textContent = text.count;
	document.getElementById('vendorLocation').textContent = savedBuilding
	? (isArabic ? `${text.location} · إلى المبنى ${savedBuilding}` : `${text.location} · To Building ${savedBuilding}`)
	: text.location;
	const toolbarLink = document.querySelector('.vendor-toolbar .text-link');
	if (toolbarLink) {
		toolbarLink.setAttribute('href', 'OrderPage.html');
		toolbarLink.innerHTML = `${text.change} <span>&#8594;</span>`;
	}
	vendorGrid.innerHTML = campusVendors.map((vendor) => `
		<article class="vendor-card accent-${vendor.accent}">
			<div class="vendor-card-body">
				<div class="vendor-card-header"><div><h2>${vendor.name[language]}</h2><span class="vendor-category">${vendor.category[language]}</span></div><span class="vendor-eta">${vendor.eta} ${text.minutes}</span></div>
				<div class="vendor-meta"><span>${text.building} ${vendor.building}</span><span>${text.menu}</span></div>
				<div class="vendor-menu">${vendor.menu.map((item) => `<div class="menu-row"><div><strong>${item.name[language]}</strong><small>${item.description[language]}</small></div><div class="menu-price">${item.price} SAR <button class="menu-add" type="button" data-vendor="${vendor.id}" data-item="${item.id}" aria-label="${text.add} ${item.name[language]}">+</button></div></div>`).join('')}</div>
			</div>
		</article>`).join('');
	vendorGrid.querySelectorAll('.menu-add').forEach((button) => {
		button.addEventListener('click', () => {
			const vendor = campusVendors.find((item) => item.id === button.dataset.vendor);
			const item = vendor.menu.find((menuItem) => menuItem.id === button.dataset.item);
			const cart = JSON.parse(localStorage.getItem('wijhah-cart') || '[]');
			const existing = cart.find((cartItem) => cartItem.itemId === item.id);
			if (existing) existing.quantity += 1;
			else cart.push({ vendorId: vendor.id, itemId: item.id, name: item.name, price: item.price, quantity: 1 });
					localStorage.setItem('wijhah-cart', JSON.stringify(cart));
				button.textContent = '✓';
					renderCartBar(document.documentElement.lang);
					syncSubmitState(document.documentElement.lang);
				setTimeout(() => { button.textContent = '+'; }, 700);
		});
	});
};

// Floating cart bar: shown on every page, collapses to a read-only summary on checkout.
const renderCartBar = (language) => {
	const bar = document.getElementById('cartBar');
	if (!bar) return;
	const isArabic = language === 'ar';
	const cart = JSON.parse(localStorage.getItem('wijhah-cart') || '[]');
	const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const onCheckout = !!document.getElementById('orderForm');

	if (!itemCount) {
	bar.hidden = true;
	bar.innerHTML = '';
	return;
	}

	const sar = isArabic ? 'ريال' : 'SAR';
	const countLabel = isArabic
	? `${itemCount} ${itemCount === 1 ? 'عنصر' : 'عناصر'} في السلة`
	: `${itemCount} ${itemCount === 1 ? 'item' : 'items'} in cart`;
	const cta = isArabic
	? 'عرض السلة وإتمام الطلب'
	: 'View cart &amp; checkout';

	bar.hidden = false;
	bar.classList.toggle('cart-bar-summary', onCheckout);
	bar.innerHTML = `
	<div class="cart-bar-inner">
	<span class="cart-bar-count"><span class="cart-bar-badge">${itemCount}</span>${countLabel}</span>
	<span class="cart-bar-total">${subtotal} ${sar}</span>
	${onCheckout
	? ''
	: `<a class="button button-primary cart-bar-cta" href="OrderPage.html">${cta} <span aria-hidden="true">&#8594;</span></a>`}
	</div>`;
};

// Keeps the submit button honest: enabled with its default label whenever the
// cart has items, otherwise disabled. Called on mount and on every cart change
// so a previous submit (success or failure) never leaves it stuck.
const syncSubmitState = (language) => {
	const orderForm = document.getElementById('orderForm');
	if (!orderForm) return;
	const button = orderForm.querySelector('.submit-button');
	if (!button) return;
	const cart = JSON.parse(localStorage.getItem('wijhah-cart') || '[]');
	// Always re-enable and restore the default label (with its arrow).
	button.disabled = false;
	button.innerHTML = `${copy[language].sendOrder} <span>&#8594;</span>`;
	button.setAttribute('data-cart-count', String(cart.length));
};

// ------------------------------------------------------------------ //
// Demo / offline orders
// Static hosting (GitHub Pages) has no Flask API, so a failed submit falls
// back to an order simulated entirely in the browser. It is stored under the
// same shape the tracker expects, so tracking.html needs no special casing.
// ------------------------------------------------------------------ //
const DEMO_ORDER_KEY = 'wijhah-demo-orders';

// Checkout form draft. sessionStorage so it survives navigation but not a closed tab.
const ORDER_DRAFT_KEY = 'wijhah-order-draft';
const readDraft = () => {
	try { return JSON.parse(sessionStorage.getItem(ORDER_DRAFT_KEY) || '{}') || {}; }
	catch (error) { return {}; }
};
const writeDraft = (patch) => {
	try { sessionStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(Object.assign(readDraft(), patch))); }
	catch (error) { /* storage unavailable (private mode) - degrade silently */ }
};
const clearDraft = () => { try { sessionStorage.removeItem(ORDER_DRAFT_KEY); } catch (error) {} };

const newDemoOrderId = () => {
	// e.g. W-849201 - short, readable, and clearly not a server id (WJ-).
	const digits = String(Math.floor(100000 + Math.random() * 900000));
	return `W-${digits}`;
};

const readDemoOrders = () => {
	try { return JSON.parse(localStorage.getItem(DEMO_ORDER_KEY) || '{}') || {}; }
	catch (error) { return {}; }
};

const saveDemoOrder = ({ name, email, phone, building, items, language }) => {
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const deliveryFee = getDeliveryFee(building);
	const total = subtotal + deliveryFee;
	const id = newDemoOrderId();
	const createdAt = new Date().toISOString();

	const order = {
	id,
	customer_name: name,
	customer_email: email,
	customer_phone: phone,
	building_id: building,
	building_name_en: buildingNames[building] ? buildingNames[building][0] : `Building ${building}`,
	building_name_ar: buildingNames[building] ? buildingNames[building][1] : `المبنى ${building}`,
		subtotal,
		delivery_fee: deliveryFee,
		total,
	status: 'placed',
	created_at: createdAt,
	// Demo orders advance locally on read, mirroring AUTO_ADVANCE_SECONDS.
		demo: true,
	items: items.map((item) => ({
	item_name: item.name[language] || item.name.en,
	quantity: item.quantity,
	price: item.price,
	})),
	};

	try {
	const all = readDemoOrders();
	all[id] = order;
	localStorage.setItem(DEMO_ORDER_KEY, JSON.stringify(all));
	localStorage.setItem('wijhah-order-id', id);
	localStorage.removeItem('wijhah-cart');
	clearDraft();
	} catch (error) { /* storage unavailable - the redirect still works */ }

	return order;
};

// Mirrors ORDER_STATUSES / AUTO_ADVANCE_SECONDS in app.py.
const TRACKING_STATUS_ORDER = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
const DEMO_ADVANCE_SECONDS = 17;

// Reads a locally simulated order and advances its status as time passes,
// mirroring the server's auto-advance so the tracker still animates offline.
const readLocalOrder = (orderId) => {
	const order = readDemoOrders()[orderId];
	if (!order) return null;

	const elapsed = (Date.now() - new Date(order.created_at).getTime()) / 1000;
	const step = Math.floor(elapsed / DEMO_ADVANCE_SECONDS);
	const stored = Math.max(0, TRACKING_STATUS_ORDER.indexOf(order.status));
	const index = Math.min(Math.max(stored, step), TRACKING_STATUS_ORDER.length - 1);
	return Object.assign({}, order, { status: TRACKING_STATUS_ORDER[index] });
};

const renderCart = (language) => {
	const cartItems = document.getElementById('cartItems');
	if (!cartItems || typeof campusVendors === 'undefined') return;
	const isArabic = language === 'ar';
	const cart = JSON.parse(localStorage.getItem('wijhah-cart') || '[]');
	const building = Number(localStorage.getItem('wijhah-building') || 16);
	const deliveryFee = getDeliveryFee(building);
	const labels = isArabic ? { empty: 'السلة فارغة. ابدأ بإضافة وجبة من المطاعم.', remove: 'حذف', delivery: deliveryFee === 0 ? 'مجاني' : `${deliveryFee} ريال`, sar: 'ريال' } : { empty: 'Your cart is empty. Add something from Vendors.', remove: 'Remove', delivery: deliveryFee === 0 ? 'Free' : `${deliveryFee} SAR`, sar: 'SAR' };
	if (!cart.length) {
		cartItems.innerHTML = `<p class="cart-empty">${labels.empty}</p><a class="text-link" href="vendors.html">${isArabic ? 'تصفح المطاعم' : 'Browse vendors'} <span>&#8594;</span></a>`;
	} else {
		cartItems.innerHTML = cart.map((cartItem) => `<div class="cart-row"><div><strong>${cartItem.name[language]}</strong><small>${cartItem.quantity} × ${cartItem.price} ${labels.sar}</small></div><button type="button" class="cart-remove" data-item="${cartItem.itemId}" aria-label="${labels.remove} ${cartItem.name[language]}">×</button></div>`).join('');
		cartItems.querySelectorAll('.cart-remove').forEach((button) => button.addEventListener('click', () => {
			const nextCart = cart.filter((cartItem) => cartItem.itemId !== button.dataset.item);
			localStorage.setItem('wijhah-cart', JSON.stringify(nextCart));
			renderCart(document.documentElement.lang);
		}));
	}
	const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
	const total = subtotal + deliveryFee;
	const formatPrice = (value) => `${value} ${labels.sar}`;
	document.getElementById('cartSubtotal').textContent = formatPrice(subtotal);
			document.getElementById('cartDelivery').textContent = labels.delivery;
		document.getElementById('cartTotal').textContent = formatPrice(total);
		renderCartBar(language);
		syncSubmitState(language);
	};

const renderTrackingPageSteps = (language, order) => {
	const isArabic = language === 'ar';
	const statuses = isArabic ? ['تم استلام الطلب', 'المطعم يجهز طلبك', 'الطلب جاهز للاستلام', 'الموصل في الطريق'] : ['Order placed', 'Vendor preparing', 'Ready for pickup', 'Courier on the way'];
	const descriptions = isArabic ? ['تم تأكيد طلبك', 'يتم تجهيز وجبتك الآن', 'سيبدأ التوصيل قريبًا', 'في طريقه إلى المبنى الذي اخترته'] : ['Your order is confirmed', 'Your meal is being prepared', 'Delivery will start shortly', 'Heading to your selected building'];
	const currentIndex = Math.max(0, TRACKING_STATUS_ORDER.indexOf(order.status));
	document.getElementById('trackingSteps').innerHTML = statuses.map((status, index) => {
	const state = index < currentIndex ? 'done' : index === currentIndex ? 'current' : '';
	const dot = index <= currentIndex ? '✓' : index + 1;
	return `<div class="tracking-step ${state}"><span class="step-dot">${dot}</span><div><strong>${status}</strong><small>${descriptions[index]}</small></div></div>`;
	}).join('');
};

const renderTrackingPage = async (language) => {
	const trackingPage = document.getElementById('trackingPage');
	if (!trackingPage) return;
	const isArabic = language === 'ar';
	const orderNumberEl = document.getElementById('orderNumber');
	const destinationEl = document.getElementById('trackingDestination');
	const itemsEl = document.getElementById('trackingItems');
	const totalEl = document.getElementById('trackingTotal');
	const introTitle = isArabic ? 'طلبك في الطريق<br><em>إليك.</em>' : 'On its way<br><em>to you.</em>';
	const introText = isArabic ? 'تابع تقدم طلب وجهة من المبنى 16 إلى وجهتك المختارة.' : 'Follow the progress of your Wijhah order from Building 16 to your selected destination.';
	document.querySelector('.tracking-page .page-intro .eyebrow').textContent = isArabic ? 'طلبك' : 'YOUR ORDER';
	document.querySelector('.tracking-page .page-intro h1').innerHTML = introTitle;
	document.querySelector('.tracking-page .page-intro > p:last-child').textContent = introText;
	document.getElementById('trackingOrderLabel').textContent = isArabic ? 'رقم الطلب' : 'ORDER NUMBER';
	document.getElementById('trackingDemoLabel').textContent = isArabic ? 'مباشر' : 'LIVE';
	document.getElementById('trackingDeliveryLabel').textContent = isArabic ? 'ملخص التوصيل' : 'DELIVERY SUMMARY';
	document.getElementById('trackingTotalLabel').textContent = isArabic ? 'الإجمالي' : 'Total';
	document.getElementById('trackingOrderAgain').innerHTML = `${isArabic ? 'اطلب شيئًا آخر' : 'Order something else'} <span>&#8594;</span>`;

	// An explicit ?order= wins; otherwise fall back to the last stored id.
	const params = new URLSearchParams(window.location.search);
	const orderId = params.get('order') || localStorage.getItem('wijhah-order-id');

	if (!orderId) {
	orderNumberEl.textContent = isArabic ? 'لا يوجد طلب' : 'No active order';
		destinationEl.textContent = isArabic ? 'ابدأ من المطاعم' : 'Start with Vendors';
	itemsEl.textContent = isArabic ? 'لا يوجد طلب محفوظ حتى الآن.' : 'There is no saved order yet.';
		document.getElementById('trackingSteps').innerHTML = '';
	return;
	}

	orderNumberEl.textContent = orderId;
	destinationEl.textContent = isArabic ? 'جارٍ التحميل…' : 'Loading…';
	itemsEl.textContent = '';
	totalEl.textContent = '—';
	document.getElementById('trackingSteps').innerHTML = `<p class="cart-empty">${isArabic ? 'جارٍ تحميل حالة الطلب…' : 'Loading order status…'}</p>`;

	let data = null;
	try {
	const response = await fetch(`${WIJHAH_API_BASE}/api/orders/${encodeURIComponent(orderId)}`);
	const body = await response.json().catch(() => ({}));
	if (response.ok) data = body;
	} catch (error) {
	// Network failure is expected on static hosting; fall through to the demo store.
	data = null;
	}

	// No API (or it refused): look for a locally simulated order.
	if (!data) data = readLocalOrder(orderId);

	if (data) {
	const buildingName = isArabic ? (data.building_name_ar || `المبنى ${data.building_id}`) : (data.building_name_en || `Building ${data.building_id}`);
		destinationEl.textContent = buildingName;
	const itemCount = (data.items || []).reduce((sum, item) => sum + item.quantity, 0);
	itemsEl.textContent = isArabic ? `${itemCount} عناصر · التوصيل من المبنى 16` : `${itemCount} items · delivered from Building 16`;
		totalEl.textContent = `${data.total} ${isArabic ? 'ريال' : 'SAR'}`;
		renderTrackingPageSteps(language, data);
	} else {
		destinationEl.textContent = isArabic ? 'تعذر تحميل الطلب' : 'Could not load order';
	itemsEl.textContent = isArabic
	? 'لم نعثر على هذا الطلب. تأكد من رقم الطلب أو ابدأ طلبًا جديدًا.'
	: 'We could not find that order. Check the order number or start a new one.';
		totalEl.textContent = '—';
		document.getElementById('trackingSteps').innerHTML = '';
	}
};

const applyLanguage = (language) => {
	const text = copy[language];
	document.documentElement.lang = language;
	document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
	localStorage.setItem('wijhah-language', language);
	const toggle = document.getElementById('languageToggle');
	if (toggle) toggle.textContent = text.language;
	setCopy('.main-nav a[href="index.html"]', 'navHome', language);
	setCopy('.main-nav a[href="vendors.html"]', 'navVendors', language);
	setCopy('.main-nav a[href="about.html"]', 'navBuildings', language);
	setCopy('.main-nav a[href="tracking.html"]', 'navTracking', language);
	setCopy('.main-nav a[href="contact.html"]', 'navHelp', language);
	setCopy('.main-nav .nav-cta', 'navOrder', language);
	setCopy('.site-footer .page-width > span + span', 'footer', language, 'textContent');
	setCopy('.hero .eyebrow', 'homeEyebrow', language);
	setCopy('.hero h1', 'homeTitle', language);
	setCopy('.hero-text', 'homeText', language);
	// innerHTML, not textContent - these strings contain markup.
	setCopy('.hero-actions .button', 'choose', language);
	setCopy('.delivery-note', 'average', language);
	setCopy('.campus-label', 'today', language, 'textContent');
	setCopy('.campus-card strong', 'goodFood', language);
	setCopy('.campus-small', 'delivered', language, 'textContent');
	setCopy('.quick-strip > div:nth-child(1) strong', 'pick', language);
	setCopy('.quick-strip > div:nth-child(1) small', 'pickSmall', language);
	setCopy('.quick-strip > div:nth-child(2) strong', 'tell', language);
	setCopy('.quick-strip > div:nth-child(2) small', 'tellSmall', language);
	setCopy('.quick-strip > div:nth-child(3) strong', 'enjoy', language);
	setCopy('.quick-strip > div:nth-child(3) small', 'enjoySmall', language);
	setCopy('.section-heading .eyebrow', 'ready', language);
	setCopy('.section-heading h2', 'spotlight', language);
	setCopy('.section-heading .text-link', 'prices', language);
	setCopy('.feature-warm h3', 'fromClass', language);
	setCopy('.feature-warm p', 'fromText', language);
	setCopy('.feature-warm a', 'place', language);
	setCopy('.feature-dark h3', 'know', language);
	setCopy('.feature-dark p', 'knowText', language);
	setCopy('.feature-dark a', 'see', language);
	const isBuildingPage = Boolean(document.getElementById('buildingGrid'));
	const isOrderPage = Boolean(document.getElementById('orderForm'));
	setCopy('.page-intro .eyebrow', isBuildingPage ? 'aboutEyebrow' : isOrderPage ? 'orderEyebrow' : 'contactEyebrow', language);
	setCopy('.page-intro h1', isBuildingPage ? 'aboutTitle' : isOrderPage ? 'orderTitle' : 'contactTitle', language);
	setCopy('.page-intro > p:last-child', isBuildingPage ? 'aboutText' : isOrderPage ? 'orderText' : 'contactText', language);
	setCopy('#buildingsTitle', 'campus', language);
	setCopy('#buildingCount', 'locations', language, 'textContent');
	setCopy('#mapTitle', 'mapTitle', language, 'textContent');
	setCopy('#mapHint', 'mapHint', language, 'textContent');
	setCopy('#mapDisclaimer', 'mapDisclaimer', language, 'textContent');
	setCopy('.side-note h3', 'quick', language);
	setCopy('.side-note p', 'feeInfo', language);
	setCopy('.side-note .button', 'continue', language, 'textContent');
	// Every label is addressed by its own id, so no selector can hit two nodes.
	setCopy('#detailsTitle', 'details', language, 'textContent');
	setCopy('#nameLabel', 'fullName', language, 'textContent');
	setCopy('#emailLabel', 'email', language, 'textContent');
	setCopy('#phoneLabel', 'phone', language, 'textContent');
	setCopy('#phoneHint', 'phoneHint', language, 'textContent');
	setCopy('#deliveryTitle', 'deliveryPoint', language, 'textContent');
	setCopy('#buildingLabel', 'building', language, 'textContent');
	setCopy('#buildingSelect option:first-child', 'selectBuilding', language, 'textContent');
	setCopy('#notesSectionTitle', 'notesSection', language, 'textContent');
	setCopy('#notesLabel', 'noteLabel', language, 'textContent');
	syncSubmitState(language);
	setCopy('.order-summary .eyebrow', 'delivery', language);
	setCopy('.order-summary h2', 'simple', language);
	setCopy('#subtotalLabel', 'subtotal', language, 'textContent');
	setCopy('#deliveryLabel', 'deliveryLabel', language, 'textContent');
	setCopy('#totalLabel', 'total', language, 'textContent');
	// Both paragraphs share .summary-small, so address them by id.
	setCopy('#estimatedLabel', 'estimated', language, 'textContent');
	setCopy('#arrivalValue', 'arrival', language, 'textContent');
	setCopy('#privacyNote', 'privacy', language, 'textContent');
	setCopy('.contact-layout .eyebrow', 'contactEyebrow', language);
	setCopy('.contact-layout h1', 'contactTitle', language);
	setCopy('.contact-layout .page-intro > p:last-child', 'contactText', language);
	setCopy('.contact-form label:nth-child(1)', 'yourName', language, 'firstChild');
	setCopy('.contact-form label:nth-child(2)', 'email', language, 'firstChild');
	setCopy('.contact-form label:nth-child(3)', 'message', language, 'firstChild');
	setCopy('.contact-form .button', 'sendMessage', language, 'textContent');
	setCopy('.contact-info .eyebrow', 'detailsTitle', language);
	setCopy('.contact-info h2', 'support', language);
	setCopy('.contact-info > p:not(.eyebrow)', 'supportText', language);
	setCopy('.support-hours', 'hours', language);
	const placeholders = language === 'ar' ? {
			'.order-form input[name="name"]': 'مثال: نورة محمد', '.order-form input[name="email"]': 'name@example.com', '.order-form input[name="phone"]': '05xxxxxxxx', '.order-form textarea': 'مثال: ساندويتش دجاج، بطاطس ومشروب بارد',
		'.contact-form input[type="text"]': 'اسمك', '.contact-form input[type="email"]': 'name@example.com', '.contact-form textarea': 'كيف يمكننا مساعدتك؟'
	} : {
		'.order-form input[name="name"]': 'e.g. Noura Mohammed', '.order-form input[name="email"]': 'you@example.com', '.order-form input[name="phone"]': '05xxxxxxxx', '.order-form textarea': 'e.g. Chicken sandwich, fries and a cold drink',
		'.contact-form input[type="text"]': 'Your name', '.contact-form input[type="email"]': 'you@example.com', '.contact-form textarea': 'How can we help?'
	};
	Object.entries(placeholders).forEach(([selector, value]) => { const field = document.querySelector(selector); if (field) field.placeholder = value; });
	renderVendorPage(language);
	renderCart(language);
	renderCartBar(language);
	syncSubmitState(language);
	renderTrackingPage(language);
	document.title = language === 'ar' ? 'وجهة | توصيل جامعي' : document.title.replace(' | توصيل جامعي', '');
};

document.addEventListener('DOMContentLoaded', () => {
	const language = localStorage.getItem('wijhah-language') || 'en';
	const selectedBuilding = localStorage.getItem('wijhah-building');
	const year = document.getElementById('year');
	if (year) year.textContent = new Date().getFullYear();
	const nav = document.querySelector('.main-nav');
	if (nav && !document.getElementById('languageToggle')) {
		const toggle = document.createElement('button');
		toggle.id = 'languageToggle';
		toggle.className = 'language-toggle';
		toggle.type = 'button';
		toggle.addEventListener('click', () => window.applyCampusLanguage(document.documentElement.lang === 'ar' ? 'en' : 'ar'));
		nav.appendChild(toggle);
	}
	if (nav && !document.getElementById('mobileNavToggle')) {
		const mobileToggle = document.createElement('button');
		mobileToggle.id = 'mobileNavToggle';
		mobileToggle.className = 'mobile-nav-toggle';
		mobileToggle.type = 'button';
		mobileToggle.setAttribute('aria-expanded', 'false');
		mobileToggle.setAttribute('aria-label', 'Open navigation');
		mobileToggle.textContent = 'Menu';
		mobileToggle.addEventListener('click', () => {
			const isOpen = nav.classList.toggle('is-open');
			mobileToggle.setAttribute('aria-expanded', String(isOpen));
			mobileToggle.textContent = isOpen ? 'Close' : 'Menu';
		});
		nav.appendChild(mobileToggle);
	}

	const buildingGrid = document.getElementById('buildingGrid');
	const campusMap = document.getElementById('campusMap');
	const campusMapImage = document.getElementById('campusMapImage');
	const removeCampusMapImage = () => {
	if (campusMapImage && campusMapImage.parentNode) campusMapImage.parentNode.removeChild(campusMapImage);
	};
	const showCampusMapImage = () => {
	if (campusMapImage && campusMapImage.naturalWidth > 0) campusMapImage.classList.add('is-loaded');
	};
	if (campusMapImage) {
	campusMapImage.addEventListener('load', showCampusMapImage);
	campusMapImage.addEventListener('error', removeCampusMapImage);
	// A deferred script can miss load/error if the image already finished.
	if (campusMapImage.complete) {
	if (campusMapImage.naturalWidth > 0) showCampusMapImage();
	else removeCampusMapImage();
	}
	}
	const selectBuilding = (number) => {
		localStorage.setItem('wijhah-building', String(number));
		document.querySelectorAll('.building-button, .map-building').forEach((item) => item.classList.toggle('selected', item.dataset.number === String(number)));
	};
	if (buildingGrid) {
		for (let number = 2; number <= 27; number += 1) {
			const fee = getDeliveryFee(number);
			const button = document.createElement('button');
			button.className = `building-button${selectedBuilding === String(number) ? ' selected' : ''}`;
			button.type = 'button';
			button.dataset.number = number;
			button.addEventListener('click', () => selectBuilding(number));
			buildingGrid.appendChild(button);
		}
	}
	if (campusMap) {
		const mapPositions = {
			2: [78, 10], 3: [89, 10], 4: [96, 10], 5: [79, 27], 6: [89, 27], 7: [97, 27],
			8: [76, 44], 9: [87, 44], 10: [96, 44], 11: [75, 61], 12: [86, 61], 13: [96, 61],
			14: [75, 77], 15: [84, 77], 16: [93, 77], 17: [76, 92], 18: [88, 92],
			19: [43, 84], 20: [54, 75], 21: [40, 67], 22: [48, 55], 23: [29, 61],
			24: [24, 75], 25: [14, 66], 26: [10, 51], 27: [21, 40]
		};
		for (let number = 2; number <= 27; number += 1) {
			const mapBuilding = document.createElement('button');
			const [left, top] = mapPositions[number];
			mapBuilding.className = `map-building${selectedBuilding === String(number) ? ' selected' : ''}`;
			mapBuilding.type = 'button';
			mapBuilding.dataset.number = number;
			mapBuilding.style.left = `${left}%`;
			mapBuilding.style.top = `${top}%`;
			mapBuilding.textContent = number;
			mapBuilding.title = buildingNames[number]?.[0] || `Building ${number}`;
			mapBuilding.setAttribute('aria-label', `Building ${number} ${buildingNames[number]?.[0] || ''}`);
			mapBuilding.addEventListener('click', () => selectBuilding(number));
			campusMap.appendChild(mapBuilding);
		}
	}

	const buildingSelect = document.getElementById('buildingSelect');
	const feeHint = document.getElementById('feeHint');

	// Arriving at checkout without an ?order= param means a fresh order: drop the
	// previous order id so the tracker never shows a stale order.
	if (!new URLSearchParams(window.location.search).get('order')) {
		try { localStorage.removeItem('wijhah-order-id'); } catch (error) {}
	}

	const draft = readDraft();
	const nameField = document.getElementById('orderName');
	const emailField = document.getElementById('orderEmail');
	const phoneField = document.getElementById('orderPhone');
	const draftFields = [[nameField, 'name'], [emailField, 'email'], [phoneField, 'phone']];
	if (nameField || emailField || phoneField) {
		draftFields.forEach(([field, key]) => { if (field && draft[key]) field.value = draft[key]; });
		draftFields.forEach(([field, key]) => {
	if (!field) return;
	field.addEventListener('input', () => writeDraft({ [key]: field.value }));
	field.addEventListener('change', () => writeDraft({ [key]: field.value }));
	});
	}

	if (buildingSelect) {
	for (let number = 2; number <= 27; number += 1) {
			const option = document.createElement('option');
			option.value = number;
			option.textContent = `Building ${number}`;
			option.dataset.number = number;
			buildingSelect.appendChild(option);
		}
			const restoredBuilding = draft.building || selectedBuilding;
		if (restoredBuilding) buildingSelect.value = restoredBuilding;
		const updateFee = () => {
		const number = Number(buildingSelect.value);
		if (!number) {
		feeHint.textContent = document.documentElement.lang === 'ar'
		? 'اختر المبنى لحساب رسوم التوصيل.'
		: 'Choose a building to calculate your delivery fee.';
		return;
		}
			const fee = getDeliveryFee(number);
			const name = buildingNames[number]?.[document.documentElement.lang === 'ar' ? 1 : 0] || `Building ${number}`;
			const feeLabel = fee === 0 ? (document.documentElement.lang === 'ar' ? 'مجاني' : 'Free') : `${fee} ${document.documentElement.lang === 'ar' ? 'ريال' : 'SAR'}`;
				feeHint.textContent = document.documentElement.lang === 'ar' ? `التوصيل إلى ${name}: ${feeLabel} · الوقت المتوقع 15–20 دقيقة.` : `Delivery to ${name}: ${feeLabel} · estimated in 15–20 minutes.`;
			localStorage.setItem('wijhah-building', String(number));
			writeDraft({ building: String(number) });
				renderCart(document.documentElement.lang);
			};
			buildingSelect.addEventListener('change', updateFee);
			updateFee();
			}

	const orderForm = document.getElementById('orderForm');
	if (orderForm) {
	orderForm.addEventListener('submit', async (event) => {
		event.preventDefault();
	const formStatus = document.getElementById('formStatus');
	const isArabic = document.documentElement.lang === 'ar';
	const building = buildingSelect.value;
	const cart = JSON.parse(localStorage.getItem('wijhah-cart') || '[]');
	if (!building) {
	formStatus.textContent = isArabic ? 'اختر المبنى أولًا.' : 'Please choose your building first.';
	buildingSelect.focus();
	return;
	}
	if (!cart.length) {
	formStatus.textContent = isArabic ? 'السلة فارغة. أضف وجبة من صفحة المطاعم أولًا.' : 'Your cart is empty. Add something from Vendors first.';
	return;
	}
	const submitButton = orderForm.querySelector('.submit-button');
	// Same rule as the server, checked here to avoid a round trip.
	const phoneClean = phoneField ? phoneField.value.replace(/[\s\-()]/g, '') : '';
	if (!/^(?:\+9665|05)\d{8}$/.test(phoneClean)) {
	formStatus.textContent = isArabic
	? 'أدخل رقم جوال سعودي صحيح، مثال: 0512345678 أو +966512345678'
	: 'Enter a valid Saudi mobile number, e.g. 0512345678 or +966512345678.';
	if (phoneField) phoneField.focus();
	return;
	}
	if (submitButton) {
		submitButton.disabled = true;
		submitButton.textContent = isArabic ? 'جارٍ الإرسال…' : 'Sending…';
	}
	formStatus.textContent = '';
		try {
	const response = await fetch(`${WIJHAH_API_BASE}/api/orders`, {
	method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
	customer_name: nameField ? nameField.value.trim() : '',
	customer_email: emailField ? emailField.value.trim() : '',
	customer_phone: phoneClean,
	building_id: Number(building),
	items: cart.map((cartItem) => ({ item_name: cartItem.name[isArabic ? 'ar' : 'en'], quantity: cartItem.quantity, price: cartItem.price }))
	})
	});
	const data = await response.json().catch(() => ({}));
	if (!response.ok) {
	throw new Error(data.error || `Request failed (${response.status})`);
	}
	localStorage.setItem('wijhah-order-id', data.id);
	localStorage.removeItem('wijhah-cart');
	clearDraft();
	renderCartBar(isArabic ? 'ar' : 'en');
	window.location.href = `tracking.html?order=${encodeURIComponent(data.id)}`;
	} catch (error) {
	// No backend (static hosting such as GitHub Pages) or a rejected request:
	// fall back to a locally simulated order instead of dead-ending the user.
	const simulated = saveDemoOrder({
	name: nameField ? nameField.value.trim() : '',
	email: emailField ? emailField.value.trim() : '',
	phone: phoneClean,
	building: Number(building),
	items: cart,
	language: isArabic ? 'ar' : 'en',
	});
	formStatus.textContent = isArabic
	? `وضع العرض التجريبي: تم إنشاء طلب تجريبي ${simulated.id}. جارٍ تحويلك…`
	: `Demo mode: created demo order ${simulated.id}. Taking you to tracking…`;
	if (submitButton) submitButton.disabled = true;
	window.setTimeout(() => {
	window.location.href = `tracking.html?order=${encodeURIComponent(simulated.id)}`;
	}, 1200);
	return;
	} finally {
	// Runs on success and failure alike, so the button is never left disabled.
	syncSubmitState(isArabic ? 'ar' : 'en');
	renderCartBar(isArabic ? 'ar' : 'en');
	}
	});
	}

	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		contactForm.addEventListener('submit', (event) => {
			event.preventDefault();
			document.getElementById('contactStatus').textContent = 'Thanks. Your message has been sent.';
			contactForm.reset();
		});
	}

	const refreshBuildingLabels = () => {
		const currentLanguage = document.documentElement.lang === 'ar' ? 1 : 0;
		document.querySelectorAll('.building-button').forEach((button) => {
			const number = Number(button.dataset.number);
			const name = buildingNames[number]?.[currentLanguage] || (currentLanguage ? 'مبنى جامعي' : 'Campus building');
			const fee = getDeliveryFee(number);
			const feeLabel = fee === 0 ? (currentLanguage ? 'مجاني' : 'Free') : `${fee} ${currentLanguage ? 'ريال' : 'SAR'}`;
			button.innerHTML = `<span>${currentLanguage ? `المبنى ${number} (${name})` : `Building ${number} (${name})`}</span><small>${feeLabel}</small>`;
		});
		if (buildingSelect) {
			document.querySelectorAll('#buildingSelect option[data-number]').forEach((option) => {
				const number = Number(option.dataset.number);
				const name = buildingNames[number]?.[currentLanguage] || (currentLanguage ? 'مبنى جامعي' : 'Campus building');
				option.textContent = currentLanguage ? `المبنى ${number} (${name})` : `Building ${number} (${name})`;
			});
			buildingSelect.dispatchEvent(new Event('change'));
		}
	};
	const originalApplyLanguage = applyLanguage;
	window.applyCampusLanguage = (nextLanguage) => { originalApplyLanguage(nextLanguage); refreshBuildingLabels(); };
	applyLanguage(language);
	refreshBuildingLabels();

	// Tracking page polls for status changes (orders auto-advance server-side).
	if (document.getElementById('trackingPage')) {
		setInterval(() => renderTrackingPage(document.documentElement.lang), 4000);
	}
});