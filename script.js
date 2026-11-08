document.addEventListener('DOMContentLoaded', function () {
    
    // دالة عامة لإخفاء جميع الصفحات تماماً بدون استثناء
    function hideAllPages() {
        const pages = document.querySelectorAll(".page-content");
        pages.forEach(function (page) {
            page.classList.remove("active");
        });

        // إخفاء صفحة الروشتة أيضاً
        const prescriptionScreen = document.getElementById('prescriptionScreen');
        if (prescriptionScreen) {
            prescriptionScreen.classList.add('hidden');
        }

        // مسح كلاس hidden من الصفحة الرئيسية لكي تظهر فقط عندما تصبح active
        const homePage = document.getElementById('home-page');
        if (homePage) {
            homePage.classList.remove('hidden');
        }
    }

    // ==========================================
    // 1. كود الـ Navbar للتنقل المباشر
    // ==========================================
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");

    navItems.forEach(function (item) {
        item.addEventListener("click", function (e) {
            e.preventDefault();

            // 1. إخفاء جميع الصفحات بالكامل أولاً
            hideAllPages();

            // 2. إزالة التفعيل من كل الأزرار
            navItems.forEach(function (nav) {
                nav.classList.remove("active");
            });

            // 3. تفعيل الزر المضغوط
            this.classList.add("active");

            // 4. تحديد الصفحة المطلوبة وإظهارها لوحدها
            const targetId = this.getAttribute("data-target");
            const targetPage = document.getElementById(targetId);

            if (targetPage) {
                targetPage.classList.add("active");
                window.scrollTo(0, 0);
            }
        });
    });

    // ==========================================
    // 2. كود فتح صفحة تفاصيل المنتج (الكريم المرطب)
    // ==========================================
    const clickableCards = document.querySelectorAll(".clickable-card");
    const detailsPage = document.getElementById("product-details-page");

    clickableCards.forEach(function (card) {
        card.addEventListener("click", function () {
            hideAllPages();
            if (detailsPage) {
                detailsPage.classList.add("active");
                window.scrollTo(0, 0);
            }
        });
    });

    // زراير الكمية (كريم)
    const plusBtn = document.getElementById("plus-btn");
    const minusBtn = document.getElementById("minus-btn");
    const qtyCount = document.getElementById("qty-count");

    if (plusBtn && minusBtn && qtyCount) {
        let count = 1;
        plusBtn.addEventListener("click", function() {
            count++;
            qtyCount.textContent = count;
        });

        minusBtn.addEventListener("click", function() {
            if (count > 1) {
                count--;
                qtyCount.textContent = count;
            }
        });
    }

    // ==========================================
    // 3. كود فتح باقي كروت المنتجات والكميات
    // ==========================================

    // كود فتح صفحة الفيتامين
    const vitaminCard = document.querySelector(".vitamin-card");
    const vitaminPage = document.getElementById("vitamin-details-page");
    const plusBtnVit = document.getElementById("plus-btn-vit");
    const minusBtnVit = document.getElementById("minus-btn-vit");
    const qtyCountVit = document.getElementById("qty-count-vit");

    if (vitaminCard && vitaminPage) {
        vitaminCard.addEventListener("click", function () {
            hideAllPages();
            vitaminPage.classList.add("active");
            window.scrollTo(0, 0);
        });
    }

    if (plusBtnVit && minusBtnVit && qtyCountVit) {
        let vitCount = 1;
        plusBtnVit.addEventListener("click", function() {
            vitCount++;
            qtyCountVit.textContent = vitCount;
        });
        minusBtnVit.addEventListener("click", function() {
            if (vitCount > 1) {
                vitCount--;
                qtyCountVit.textContent = vitCount;
            }
        });
    }

    // كود فتح صفحة الترمومتر
    const thermometerCard = document.querySelector(".thermometer-card");
    const thermometerPage = document.getElementById("thermometer-details-page");
    const plusBtnThermo = document.getElementById("plus-btn-thermo");
    const minusBtnThermo = document.getElementById("minus-btn-thermo");
    const qtyCountThermo = document.getElementById("qty-count-thermo");

    if (thermometerCard && thermometerPage) {
        thermometerCard.addEventListener("click", function () {
            hideAllPages();
            thermometerPage.classList.add("active");
            window.scrollTo(0, 0);
        });
    }

    if (plusBtnThermo && minusBtnThermo && qtyCountThermo) {
        let thermoCount = 1;
        plusBtnThermo.addEventListener("click", function() {
            thermoCount++;
            qtyCountThermo.textContent = thermoCount;
        });
        minusBtnThermo.addEventListener("click", function() {
            if (thermoCount > 1) {
                thermoCount--;
                qtyCountThermo.textContent = thermoCount;
            }
        });
    }

    // كود فتح صفحة غسول الوجه
    const washCard = document.querySelector(".wash-card");
    const washPage = document.getElementById("wash-details-page");
    const plusBtnWash = document.getElementById("plus-btn-wash");
    const minusBtnWash = document.getElementById("minus-btn-wash");
    const qtyCountWash = document.getElementById("qty-count-wash");

    if (washCard && washPage) {
        washCard.addEventListener("click", function () {
            hideAllPages();
            washPage.classList.add("active");
            window.scrollTo(0, 0);
        });
    }

    if (plusBtnWash && minusBtnWash && qtyCountWash) {
        let washCount = 1;
        plusBtnWash.addEventListener("click", function() {
            washCount++;
            qtyCountWash.textContent = washCount;
        });
        minusBtnWash.addEventListener("click", function() {
            if (washCount > 1) {
                washCount--;
                qtyCountWash.textContent = washCount;
            }
        });
    }

    // ==========================================
    // 4. كود سلة المشتريات
    // ==========================================
    let cart = [];

    function addToCart(name, price, emoji, qty = 1) {
        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.qty += qty;
        } else {
            cart.push({ name: name, price: price, emoji: emoji, qty: qty });
        }
        
        updateCartUI();
        hideAllPages();
        
        const cartPage = document.getElementById("cart-page");
        if (cartPage) {
            cartPage.classList.add("active");
            window.scrollTo(0, 0);
        }

        navItems.forEach(nav => nav.classList.remove("active"));
        const cartNavItem = document.querySelector('[data-target="cart-page"]');
        if (cartNavItem) cartNavItem.classList.add("active");
    }

    function updateCartUI() {
        const container = document.getElementById("cart-items-container");
        const subtotalEl = document.getElementById("cart-subtotal");
        const totalEl = document.getElementById("cart-total");
        
        if (!container) return; 

        container.innerHTML = ""; 
        let subtotal = 0;

        cart.forEach((item) => {
            const itemTotal = item.price * item.qty;
            subtotal += itemTotal; 
            
            const itemHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; background: #152420; padding: 15px; border-radius: 10px; margin-bottom: 10px; border: 1px solid #203530;">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 24px;">${item.emoji}</span>
                        <div>
                            <h4 style="margin: 0; color: white;">${item.name}</h4>
                            <span style="color: #8da49c; font-size: 14px;">الكمية: ${item.qty}</span>
                        </div>
                    </div>
                    <div style="color: #1eb992; font-weight: bold;">
                        ${itemTotal} ج.م
                    </div>
                </div>
            `;
            container.innerHTML += itemHTML;
        });

        const delivery = 30;
        const total = cart.length > 0 ? subtotal + delivery : 0;

        if (subtotalEl) subtotalEl.textContent = `${subtotal} ج.م`;
        if (totalEl) totalEl.textContent = `${total} ج.م`;
    }

    // ربط أزرار الإضافة للسلة
    const addCreamBtn = document.getElementById("add-cream-btn");
    if (addCreamBtn) {
        addCreamBtn.addEventListener("click", function() {
            const qty = document.getElementById("qty-count") ? parseInt(document.getElementById("qty-count").textContent) : 1;
            addToCart("كريم مرطب", 185, "🧴", qty);
        });
    }

    const addVitBtn = document.getElementById("add-vit-btn");
    if (addVitBtn) {
        addVitBtn.addEventListener("click", function() {
            const qty = document.getElementById("qty-count-vit") ? parseInt(document.getElementById("qty-count-vit").textContent) : 1;
            addToCart("فيتامين سي", 120, "💊", qty);
        });
    }

    const addThermoBtn = document.getElementById("add-thermo-btn");
    if (addThermoBtn) {
        addThermoBtn.addEventListener("click", function() {
            const qty = document.getElementById("qty-count-thermo") ? parseInt(document.getElementById("qty-count-thermo").textContent) : 1;
            addToCart("ترمومتر رقمي", 160, "🌡️", qty);
        });
    }

    const addWashBtn = document.getElementById("add-wash-btn");
    if (addWashBtn) {
        addWashBtn.addEventListener("click", function() {
            const qty = document.getElementById("qty-count-wash") ? parseInt(document.getElementById("qty-count-wash").textContent) : 1;
            addToCart("غسول الوجه", 95, "🧼", qty);
        });
    }

    // ==========================================
    // 5. كود صفحة الروشتة (إخفاء الرئيسية وإظهار الروشتة)
    // ==========================================
    const homePage = document.getElementById('home-page');
    const prescriptionScreen = document.getElementById('prescriptionScreen');
    const openPrescriptionBtn = document.getElementById('openPrescriptionBtn');
    const backBtn = document.getElementById('backBtn');

    const uploadCard = document.getElementById('uploadCard');
    const fileInput = document.getElementById('fileInput');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    const submitBtn = document.getElementById('submitBtn');
    const notesInput = document.getElementById('notesInput');

    if (openPrescriptionBtn) {
        openPrescriptionBtn.addEventListener('click', () => {
            if (homePage) homePage.classList.add('hidden');
            if (prescriptionScreen) prescriptionScreen.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            if (prescriptionScreen) prescriptionScreen.classList.add('hidden');
            if (homePage) homePage.classList.remove('hidden');
            window.scrollTo(0, 0);
        });
    }

    if (uploadCard) {
        uploadCard.addEventListener('click', () => {
            if (fileInput) fileInput.click();
        });
    }

    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileName = file.name;
                
                // تعديل عرض اسم الملف إلى معاينة الصورة المباشرة
                if (fileNameDisplay) {
                    // إنشاء أو اختيار عنصر عرض الصورة برمجياً إذا لم يكن موجوداً بالـ HTML
                    let imgPreview = document.getElementById('imagePreviewDynamic');
                    if (!imgPreview) {
                        imgPreview = document.createElement('img');
                        imgPreview.id = 'imagePreviewDynamic';
                        imgPreview.style.maxWidth = '100%';
                        imgPreview.style.maxHeight = '200px';
                        imgPreview.style.marginTop = '10px';
                        imgPreview.style.borderRadius = '8px';
                        fileNameDisplay.parentNode.insertBefore(imgPreview, fileNameDisplay);
                    }
                    imgPreview.src = URL.createObjectURL(file);
                    imgPreview.style.display = 'block';
                    
                    // إخفاء النص القديم لاسم الملف أو تحديثه إذا أردت
                    fileNameDisplay.textContent = `تم اختيار: ${fileName}`;
                }
            }
        });
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const file = fileInput ? fileInput.files[0] : null;
            const notes = notesInput ? notesInput.value.trim() : "";

            if (!file) {
                alert('يرجى رفع صورة الروشتة أولاً.');
                return;
            }

            console.log('File attached:', file);
            console.log('Notes:', notes);
            alert('تم إرسال الروشتة للصيدلي بنجاح!');
        });
    }

    // ==========================================
    // 6. JavaScript الخاص بصفحات حسابي
    // ==========================================
    function showAuthPage(pageId) {
        hideAllPages();
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add("active");
        }
    }

    document.querySelectorAll("[data-auth-target]").forEach(button => {
        button.addEventListener("click", function () {
            const target = this.getAttribute("data-auth-target");
            showAuthPage(target);

            if (target === "home-page") {
                navItems.forEach(item => {
                    item.classList.remove("active");
                });

                document.querySelector('.bottom-nav .nav-item[data-target="home-page"]')?.classList.add("active");
            }
        });
    });

    const phoneForm = document.getElementById("phoneForm");
    if (phoneForm) {
        phoneForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const phone = document.getElementById("phone").value.trim();
            const message = document.getElementById("message");

            if (!/^01[0125][0-9]{8}$/.test(phone)) {
                message.textContent = "من فضلك أدخل رقم موبايل مصري صحيح";
                return;
            }

            sessionStorage.setItem("phone", phone);
            message.textContent = "";
            showAuthPage("verify-page");
        });
    }

    const otpForm = document.getElementById("otpForm");
    if (otpForm) {
        otpForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const otp = document.getElementById("otp").value.trim();
            const message = document.getElementById("otpMessage");

            if (!/^[0-9]{6}$/.test(otp)) {
                message.textContent = "أدخل رمز التحقق المكون من 6 أرقام";
                return;
            }

            message.textContent = "";
            showAuthPage("success-page");
        });
    }

    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const phone = document.getElementById("forgotPhone").value.trim();
            const message = document.getElementById("forgotMessage");

            if (!/^01[0125][0-9]{8}$/.test(phone)) {
                message.textContent = "أدخل رقم موبايل صحيح";
                return;
            }

            sessionStorage.setItem("resetPhone", phone);
            message.textContent = "";
            showAuthPage("reset-page");
        });
    }

    const resetForm = document.getElementById("resetForm");
    if (resetForm) {
        resetForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const code = document.getElementById("resetCode").value.trim();
            const password = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const message = document.getElementById("resetMessage");

            if (!/^[0-9]{6}$/.test(code)) {
                message.textContent = "رمز التحقق يجب أن يكون 6 أرقام";
                return;
            }

            if (password.length < 8) {
                message.textContent = "كلمة المرور يجب ألا تقل عن 8 أحرف";
                return;
            }

            if (password !== confirmPassword) {
                message.textContent = "كلمتا المرور غير متطابقتين";
                return;
            }

            message.textContent = "";
            showAuthPage("password-success-page");
        });
    }

}); // قفلة الـ DOMContentLoaded[cite: 3]
if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileName = file.name;
                const imageUrl = URL.createObjectURL(file);
                
                if (uploadCard) {
                    uploadCard.innerHTML = `
                        <div class="camera-icon-wrapper" style="margin-bottom: 5px;">
                            <svg class="camera-icon" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 40px; height: 40px;">
                                <rect x="6" y="18" width="52" height="38" rx="8" fill="#5A6D74" />
                                <path d="M22 18L26 12H38L42 18H22Z" fill="#5A6D74" />
                                <circle cx="32" cy="37" r="12" fill="#1C272B" />
                                <circle cx="32" cy="37" r="9" fill="#19A79A" />
                                <circle cx="32" cy="37" r="5" fill="#0A181C" />
                                <circle cx="48" cy="25" r="2.5" fill="#E2E8F0" />
                                <rect x="10" y="22" width="10" height="4" rx="2" fill="#E2E8F0" />
                            </svg>
                        </div>
                        <h3 class="upload-title" style="font-size: 14px; margin-bottom: 5px;">تم اختيار صورة الروشتة بنجاح</h3>
                        <p id="fileNameDisplay" class="file-name-display" style="font-size: 12px; color: #8da49c; margin-bottom: 10px;">${fileName}</p>
                        <img src="${imageUrl}" alt="معاينة الروشتة" style="width: 100%; max-height: 180px; object-fit: contain; border-radius: 8px;">
                    `;
                }
            }
        });
    }