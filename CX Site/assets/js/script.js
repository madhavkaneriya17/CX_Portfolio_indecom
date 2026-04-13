// < === === button hover effect start === ===>
const buttons = document.querySelectorAll('.header-nav-button, .common-btn');

buttons.forEach(button => {
    const arrow = button.querySelector('.arrow-icon');

    if (arrow) {
        button.addEventListener('mouseenter', () => {
            button.style.opacity = '0.7';
            arrow.style.transform += ' rotateZ(45deg)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.opacity = '1';
            arrow.style.transform = arrow.style.transform.replace(' rotateZ(45deg)', '');
        });
    }
});
// < === === button hover effect end === ===>


// < === === crafted ready section image animation start === ===>
if (document.querySelector(".crafted-ready-section__right_img img")) {
    gsap.fromTo(
        ".crafted-ready-section__right_img img",
        {
            y: "10em"   // Start
        },
        {
            y: "-10em", // End

            ease: "none",

            scrollTrigger: {
                trigger: ".crafted-ready-section",
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        }
    );
}
// < === === crafted ready section image animation end === ===>



// < === === scroll smooth start === ===>
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: '#smooth-wrapper',
    content: '#smooth-content',
    smooth: 1.5,
    smoothTouch: 1.5, // Added smoothTouch for mobile support
    effects: true
});
// < === === scroll smooth end === ===>

// < === === mobile menu toggle start === ===>
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenuOverlay = document.querySelector('#mobileMenu');
let isMobileMenuOpen = false;

if (mobileMenuBtn && mobileMenuOverlay) {
    const updateMobileMenuTop = () => {
        const headerHeight = document.querySelector('.header-main').offsetHeight;
        mobileMenuOverlay.style.top = `${headerHeight - 1}px`;
    };

    mobileMenuBtn.addEventListener('click', () => {
        updateMobileMenuTop();
        if (!isMobileMenuOpen) {
            gsap.to(mobileMenuOverlay, {
                height: "100vh",
                duration: 0.8,
                ease: "power4.inOut"
            });
            gsap.fromTo('.mobile-menu-item',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power2.out" }
            );
            isMobileMenuOpen = true;
            document.body.style.overflow = 'hidden';

            // Animation for the button lines (optional)
            gsap.to(mobileMenuBtn.querySelector('path'), { duration: 0.3, opacity: 0.5 });
        } else {
            gsap.to(mobileMenuOverlay, {
                height: 0,
                duration: 0.6,
                ease: "power4.inOut"
            });
            isMobileMenuOpen = false;
            document.body.style.overflow = '';
            gsap.to(mobileMenuBtn.querySelector('path'), { duration: 0.3, opacity: 1 });
        }
    });

    // Close menu when clicking outside or on a link (optional, depends on UX)
    window.addEventListener('resize', () => {
        if (window.innerWidth > 991 && isMobileMenuOpen) {
            mobileMenuOverlay.classList.remove('is-open');
            isMobileMenuOpen = false;
            document.body.style.overflow = '';
        }
    });
}
// < === === mobile menu toggle end === ===>


// < === === pareallax animation start === ===>
gsap.registerPlugin(ScrollTrigger);

let mm = gsap.matchMedia();

mm.add("(min-width: 768px)", () => {
    const items = document.querySelectorAll(".pareallax-block");
    if (items.length > 0 && document.querySelector(".parallax-section")) {
        items.forEach((item, index) => {
            if (index === 0) {
                gsap.set(item, { height: "46vh" });
                gsap.set(item.querySelector("img"), { height: "42vh" });
                gsap.set(item.querySelector(".pareallax-number"), { scale: 1, opacity: 1 });
                gsap.set(item.querySelector(".pareallax-text"), { opacity: 1 });
            } else {
                gsap.set(item, { height: "17vh" });
                gsap.set(item.querySelector("img"), { height: "13vh" });
                gsap.set(item.querySelector(".pareallax-number"), { scale: 0.47, opacity: 0.62 });
                gsap.set(item.querySelector(".pareallax-text"), { opacity: 0.4 });
            }
        });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parallax-section",
                start: "top top",
                end: "bottom bottom",
                pin: ".parallax-container",
                scrub: 1
            }
        });

        items.forEach((item, index) => {
            if (index === items.length - 1) return;

            const nextItem = items[index + 1];

            tl.to(item, {
                height: "17vh",
                duration: 1,
                ease: "power2.inOut"
            }, index)

                .to(item.querySelector("img"), {
                    height: "13vh",
                    duration: 1,
                    ease: "power2.inOut"
                }, index)

                .to(item.querySelector(".pareallax-number"), {
                    scale: 0.47,
                    opacity: 0.62,
                    duration: 1,
                    ease: "power2.inOut"
                }, index)

                .to(item.querySelector(".pareallax-text"), {
                    opacity: 0.4,
                    duration: 1,
                    ease: "power2.inOut"
                }, index)

                .to(nextItem, {
                    height: "46vh",
                    duration: 1,
                    ease: "power2.inOut"
                }, index)


                .to(nextItem.querySelector("img"), {
                    height: "42vh",
                    duration: 1,
                    ease: "power2.inOut"
                }, index)

                .to(nextItem.querySelector(".pareallax-number"), {
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut"
                }, index)


                .to(nextItem.querySelector(".pareallax-text"), {
                    opacity: 1,
                    duration: 1,
                    ease: "power2.inOut"
                }, index);
        });
    }
});
// < === === pareallax animation end === ===>



// < === === models dropdown animation start === ===>
const headerMain = document.querySelector('.header-main');
const modelsLink = document.querySelectorAll('.header-nav-link')[0];
const modelsDropdown = document.querySelector('#modelsDropdown');
let isDropdownOpen = false;

if (modelsLink && modelsDropdown && headerMain) {
    const updateDropdownPosition = () => {
        const headerHeight = headerMain.offsetHeight;
        gsap.set(modelsDropdown, { top: headerHeight - 1 });
    };

    updateDropdownPosition();
    window.addEventListener('resize', updateDropdownPosition);

    gsap.set(modelsDropdown, { borderBottom: "0px solid #dde3e2" });

    modelsLink.addEventListener('click', (e) => {
        e.preventDefault();
        updateDropdownPosition();
        if (!isDropdownOpen) {
            gsap.to(modelsDropdown, {
                height: "33em",
                duration: 0.8,
                ease: "power2.inOut",
                borderBottom: "1px solid #dde3e2"
            });
            isDropdownOpen = true;
        } else {
            gsap.to(modelsDropdown, {
                height: "0",
                duration: 0.8,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(modelsDropdown, { borderBottom: "0px solid #dde3e2" });
                }
            });
            isDropdownOpen = false;
        }
    });
}
// < === === models dropdown animation end === ===>

// < === === sticky navbar scroll animation start === ===>
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: (self) => {
        const header = document.querySelector('.header-main');
        const modelsDropdown = document.querySelector('#modelsDropdown');

        if (self.direction === 1) {
            header.classList.add('is-hidden');
            if (isDropdownOpen) {
                gsap.to(modelsDropdown, {
                    height: "0",
                    duration: 0.4,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.set(modelsDropdown, { borderBottom: "0px solid #dde3e2" });
                    }
                });
                isDropdownOpen = false;
            }
        } else {
            header.classList.remove('is-hidden');
        }
    }
});
// < === === sticky navbar scroll animation end === ===>

// < === === about page transparent navbar animation start === ===>
const aboutHeroSection = document.querySelector('.about-section');
if (aboutHeroSection) {
    ScrollTrigger.create({
        trigger: aboutHeroSection,
        start: 'bottom top',
        onEnter: () => {
            const header = document.querySelector('.header-main');
            const logo = document.querySelector('.logo');
            const navLinks = document.querySelectorAll('.header-nav-link');
            const navBtn = document.querySelector('.header-nav-button');

            if (header) header.classList.remove('about-us-transparent');
            if (logo) logo.classList.remove('about-logo-color');
            navLinks.forEach(link => link.classList.remove('about-nav-font'));
            if (navBtn) navBtn.classList.remove('about-nav-button-color');
        },
        onEnterBack: () => {
            const header = document.querySelector('.header-main');
            const logo = document.querySelector('.logo');
            const navLinks = document.querySelectorAll('.header-nav-link');
            const navBtn = document.querySelector('.header-nav-button');

            if (header) header.classList.add('about-us-transparent');
            if (logo) logo.classList.add('about-logo-color');
            navLinks.forEach(link => link.classList.add('about-nav-font'));
            if (navBtn) navBtn.classList.add('about-nav-button-color');
        }
    });
}
// < === === about page transparent navbar animation end === ===>

// < === === slider swiper initialization start === ===>
const swiperMain = new Swiper(".cx-slider-swiper.swiper", {
    direction: "horizontal",
    loop: true,
    spaceBetween: 40,
    centeredSlides: false,
    slidesPerView: "auto",
    speed: 800,
    grabCursor: false, // Using custom cursor instead
});

// < === === slider swiper initialization end === ===>

// < === === custom cursor logic start === ===>
const sliderSection = document.querySelector('.cx-slider-section');
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const swiperContainer = document.querySelector('.cx-slider-swiper.swiper');

if (sliderSection && cursor && cursorDot) {
    // Optimized position setters
    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const xSetter = gsap.quickSetter(cursor, "x", "px");
    const ySetter = gsap.quickSetter(cursor, "y", "px");

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const updateCursor = (e) => {
        pos.x = e.clientX;
        pos.y = e.clientY;
        xSetter(pos.x);
        ySetter(pos.y);
    };

    // Track position on window to ensure it doesn't "freeze"
    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('pointermove', updateCursor);

    const onPress = () => {
        gsap.to(cursor, { scale: 0.8, duration: 0.2, ease: "power2.out" });
    };

    const onRelease = () => {
        gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.in" });
    };

    // Link with Swiper events for perfect swipe animation
    if (swiperMain) {
        swiperMain.on('touchStart', onPress);
        swiperMain.on('touchEnd', onRelease);
    }
    if (swiperPartners) {
        swiperPartners.on('touchStart', onPress);
        swiperPartners.on('touchEnd', onRelease);
    }

    // Standard mouse fallback for non-swipe areas
    sliderSection.addEventListener('mousedown', onPress);
    window.addEventListener('mouseup', onRelease);

    // Show/Hide cursor on slider section hover
    sliderSection.addEventListener('mouseenter', () => {
        gsap.to(cursorDot, {
            opacity: 1,
            width: "2.2rem",
            height: "2.2rem",
            duration: 0.3
        });
    });

    sliderSection.addEventListener('mouseleave', () => {
        gsap.to(cursorDot, {
            opacity: 0,
            width: 0,
            height: 0,
            duration: 0.3
        });
    });
}
// < === === custom cursor logic end === ===>

// < === === mobile menu submenu toggle start === ===>
const modelsToggle = document.querySelector('#mobileModelsToggle');
const modelsSubmenu = document.querySelector('#mobileModelsSubmenu');
let isSubmenuOpen = false;

if (modelsToggle && modelsSubmenu) {
    modelsToggle.addEventListener('click', () => {
        if (!isSubmenuOpen) {
            modelsSubmenu.style.height = modelsSubmenu.scrollHeight + 'px';
            isSubmenuOpen = true;
        } else {
            modelsSubmenu.style.height = '0';
            isSubmenuOpen = false;
        }
    });
}
// < === === mobile menu submenu toggle end === ===>


// < === === philoshopy section 1 animation start === ===>
const parallaxSection1 = document.querySelector('.philoshopy-section-1');
const parallaxImages1 = document.querySelectorAll('.parallax-img');

if (parallaxSection1 && parallaxImages1.length > 0) {
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        targetX = e.clientX - window.innerWidth / 2;
        targetY = e.clientY - window.innerHeight / 2;
    });

    const renderParallax = () => {
        mouseX += (targetX - mouseX) * 0.1;
        mouseY += (targetY - mouseY) * 0.1;

        parallaxImages1.forEach(img => {
            const speed = parseFloat(img.getAttribute('data-mouse-speed')) || 1;
            const x = -(mouseX * speed) / 100;
            const y = -(mouseY * speed) / 100;
            img.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(renderParallax);
    };

    renderParallax();
}
// < === === philoshopy section 1 animation end === ===>

// < === === philoshopy section 3 start === ===>
const swiperPartners = new Swiper(".philoshopy-partners-swiper", {
    direction: "horizontal",
    loop: false,
    spaceBetween: 24,
    slidesPerView: 1,
    speed: 800,
    breakpoints: {
        767: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        991: {
            slidesPerView: 2,
        },
        1440: {
            slidesPerView: 3.2,
        }
    }
});
// < === === philoshopy section 3 end === ===>

// < === === reveal animation start === ===>

gsap.registerPlugin(ScrollTrigger);

document.querySelectorAll(".reveal-img").forEach((img) => {
    if (img.parentElement.classList.contains("reveal-wrapper")) return;

    const imgStyle = window.getComputedStyle(img);
    const wrapper = document.createElement("div");
    wrapper.classList.add("reveal-wrapper");

    const isBlock = imgStyle.display === 'block';
    wrapper.style.display = isBlock ? 'flex' : 'inline-flex';

    wrapper.style.width = imgStyle.width === "0px" ? "auto" : imgStyle.width;
    wrapper.style.height = imgStyle.height === "0px" ? "auto" : imgStyle.height;
    wrapper.style.margin = imgStyle.margin;
    wrapper.style.position = imgStyle.position === 'static' ? 'relative' : imgStyle.position;

    wrapper.style.top = imgStyle.top;
    wrapper.style.left = imgStyle.left;
    wrapper.style.right = imgStyle.right;
    wrapper.style.bottom = imgStyle.bottom;

    wrapper.style.flex = imgStyle.flex;
    wrapper.style.gridArea = imgStyle.gridArea;
    wrapper.style.alignSelf = imgStyle.alignSelf;
    wrapper.style.justifySelf = imgStyle.justifySelf;
    wrapper.style.borderRadius = imgStyle.borderRadius;

    img.parentNode.insertBefore(wrapper, img);
    wrapper.appendChild(img);

    img.style.width = "100%";
    img.style.height = "100%";
    img.style.margin = "0";
    img.style.position = "static";
    img.style.borderRadius = "inherit";
    img.style.objectFit = imgStyle.objectFit;
    img.style.opacity = "1";

    gsap.set(wrapper, { autoAlpha: 0 });

    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: wrapper,
            start: "-50% 85%",
            toggleActions: "play none none none",
            once: true,
        }
    });

    tl.to(wrapper, { autoAlpha: 1, duration: 0.8, ease: "linear" });

    tl.from(wrapper, {
        yPercent: 100,
        duration: 1.2,
        ease: "power3.out"
    }, 0);

    tl.from(img, {
        yPercent: -100,
        duration: 1.2,
        ease: "power3.out"
    }, 0);
});

setTimeout(() => {
    ScrollTrigger.refresh();
}, 200);

// < === === reveal animation end === ===>

gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".footer-section-img",
    {
        opacity: 0
    },
    {
        opacity: 1,
        duration: 1.5,
        scrollTrigger: {
            trigger: ".footer-section-img",
            start: "top bottom",
            end: "top center",
            scrub: true
        }
    }
);

// const track = document.querySelector(".ethy-section-slider-main-slider-card-holder");
// const slides = gsap.utils.toArray(".ethy-section-slider-main-slider-card");
// const wrapper = document.querySelector(".ethy-section-slider-main-slider-holder");

// const currentEl = document.getElementById("ethy-current-slide");
// const totalEl = document.getElementById("ethy-total-slides");

// totalEl.innerText = String(slides.length).padStart(2, "0");

// let slideWidth = 0;
// let maxX = 0;

// // 🔥 setup
// function setupSlider() {
//     const gap = parseFloat(getComputedStyle(track).gap) || 0;
//     slideWidth = slides[0].offsetWidth + gap;

//     const totalWidth = slideWidth * slides.length;
//     const visibleWidth = wrapper.offsetWidth;

//     maxX = -(totalWidth - visibleWidth);

//     gsap.set(track, { x: 0 });
// }

// // 🔥 counter
// function updateCounter(x) {
//     let index = Math.round(Math.abs(x) / slideWidth);
//     index = Math.min(index, slides.length - 1);
//     currentEl.innerText = String(index + 1).padStart(2, "0");
// }

// // 🔥 SNAP FUNCTION
// function snapX(value) {
//     return Math.round(value / slideWidth) * slideWidth;
// }

// // 🔥 draggable
// let draggable = Draggable.create(track, {
//     type: "x",
//     inertia: true,

//     bounds: {
//         minX: () => maxX,
//         maxX: 0
//     },

//     snap: snapX, // 🔥 main magic

//     onDragEnd: function () {
//         gsap.to(track, {
//             x: snapX(this.x),
//             duration: 0.4,
//             ease: "power3.out"
//         });
//     },

//     onThrowUpdate: function () {
//         updateCounter(this.x);
//     }
// })[0];

// // init
// setupSlider();

// // resize
// window.addEventListener("resize", () => {
//     setupSlider();
//     draggable.applyBounds({
//         minX: maxX,
//         maxX: 0
//     });
// });



