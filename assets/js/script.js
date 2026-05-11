gsap.from(".hero-animate-left", {
    x: -500,
    duration: 1.5,
    ease: "power3.out"
});

gsap.from(".hero-animate-right", {
    x: 400,
    duration: 1.5,
    ease: "power3.out"
});
// < === === button hover effect start === ===>
document.addEventListener('mouseover', (e) => {
    const button = e.target.closest('.header-nav-button, .common-btn, .slider-button-ancore');
    if (button) {
        const arrow = button.querySelector('.arrow-icon');
        button.style.opacity = '0.7';
        if (arrow) {
            arrow.style.transform = 'rotateZ(45deg)';
        }
    }
});

document.addEventListener('mouseout', (e) => {
    const button = e.target.closest('.header-nav-button, .common-btn, .slider-button-ancore');
    if (button) {
        const arrow = button.querySelector('.arrow-icon');
        button.style.opacity = '1';
        if (arrow) {
            arrow.style.transform = 'rotateZ(0deg)';
        }
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


// <=== Scroll Smooth Start ===>
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",

    smooth: 1,
    smoothTouch: 1,
    effects: true,
    normalizeScroll: true,
    speed: 1,
    ease: "expo.out"
});
// <=== Scroll Smooth End ===>

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
            if (header) header.classList.remove('about-us-transparent');
        },
        onEnterBack: () => {
            const header = document.querySelector('.header-main');
            if (header) header.classList.add('about-us-transparent');
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
// (Moved to the end of the file to prevent ReferenceError)
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
const initRevealAnimations = () => {
    document.querySelectorAll(".trigger-main").forEach((trigger) => {

        let wrappers = Array.from(trigger.querySelectorAll(".wrapper"));

        if (wrappers.length === 0) {
            const section = trigger.closest(".section");

            if (section) {
                wrappers = Array.from(section.querySelectorAll(".wrapper"));
            }
        }

        if (wrappers.length > 0) {
            gsap.fromTo(wrappers,
                {
                    clipPath: "inset(100% 0% 0% 0%)",
                    opacity: 0
                },
                {
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    duration: 1.2,
                    ease: "power3.inOut",
                    scrollTrigger: {
                        trigger: trigger,
                        start: "top 80%",
                        invalidateOnRefresh: true,
                    }
                }
            );
        }
    });

    if (document.querySelector(".footer-section-img")) {
        gsap.from(".footer-section-img", {
            opacity: 0,
            duration: 1.5,
            scrollTrigger: {
                trigger: ".footer-section-img",
                start: "top 90%",
                end: "top 60%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true
            }
        });
    }

    gsap.utils.toArray(".fade-trigger").forEach((elem) => {
        gsap.from(elem, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                end: "top 60%",
                toggleActions: "play none none none",
                invalidateOnRefresh: true
            }
        });
    });

};

window.addEventListener("load", () => {
    initRevealAnimations();

    // Slight delay before refreshing to ensure smooth-scroll and all images have adjusted the layout
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 200);
});
// < === === reveal animation end === ===>

// filter tabs start
document.addEventListener("DOMContentLoaded", () => {
    const tabsContainer = document.querySelector(".tabs");
    if (!tabsContainer) return;

    const tabs = tabsContainer.querySelectorAll("ul li a");
    const underline = tabsContainer.querySelector(".underline");
    const contents = document.querySelectorAll(".tab-content");

    if (!tabs.length || !contents.length) return;

    let activeTab = tabsContainer.querySelector("ul li a.activ") || tabs[0];
    if (!activeTab.classList.contains("activ")) activeTab.classList.add("activ");

    // Initialize layout
    const initialContent = document.getElementById(activeTab.dataset.tab);
    if (initialContent) {
        contents.forEach(c => gsap.set(c, { display: "none", opacity: 0 }));
        gsap.set(initialContent, { display: "block", opacity: 1 });
        initialContent.classList.add("activ");
    }

    const moveUnderline = (targetTab, animate = true) => {
        if (!targetTab || !underline) return;
        // Using offsetLeft is much safer here because getBoundingClientRect
        // can be affected by GSAP ScrollSmoother's translate operations.
        const left = targetTab.offsetLeft;
        const width = targetTab.offsetWidth;

        if (animate) {
            gsap.to(underline, {
                x: left,
                width: width,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.set(underline, {
                x: left,
                width: width
            });
        }
    };

    // Setup initial underline position (slight delay ensures fonts have loaded and widths are correct)
    setTimeout(() => {
        moveUnderline(activeTab, false);
    }, 100);

    tabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            if (tab === activeTab) return;

            const targetContent = document.getElementById(tab.dataset.tab);
            if (!targetContent) return;

            // Update Tab State
            activeTab.classList.remove("activ");
            tab.classList.add("activ");
            activeTab = tab;

            // Animate Underline
            moveUnderline(activeTab);

            // Hide old content instantly, but fade in the new one
            contents.forEach(c => {
                c.classList.remove("activ");
                gsap.set(c, { display: "none", opacity: 0 });
            });

            // Show new content
            targetContent.classList.add("activ");
            gsap.set(targetContent, { display: "block", y: 15, opacity: 0 });

            gsap.to(targetContent, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                onComplete: () => {
                    // Critical for smooth scrolling: tell GSAP body height changed!
                    if (typeof ScrollTrigger !== 'undefined') {
                        ScrollTrigger.refresh();
                    }
                }
            });
        });
    });

    window.addEventListener("resize", () => {
        moveUnderline(activeTab, false);
    });
});
// filter tabs end


// < === === custom cursor logic start === ===>
const sliderSection = document.querySelector('.cx-slider-section');
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
const swiperContainer = document.querySelector('.cx-slider-swiper.swiper');

if (sliderSection && cursor && cursorDot) {
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

    window.addEventListener('mousemove', updateCursor);
    window.addEventListener('pointermove', updateCursor);

    const onPress = () => {
        gsap.to(cursor, { scale: 0.8, duration: 0.2, ease: "power2.out" });
    };

    const onRelease = () => {
        gsap.to(cursor, { scale: 1, duration: 0.2, ease: "power2.in" });
    };

    if (typeof swiperMain !== 'undefined' && swiperMain) {
        swiperMain.on('touchStart', onPress);
        swiperMain.on('touchEnd', onRelease);
    }
    if (typeof swiperPartners !== 'undefined' && swiperPartners) {
        swiperPartners.on('touchStart', onPress);
        swiperPartners.on('touchEnd', onRelease);
    }

    sliderSection.addEventListener('mousedown', onPress);
    window.addEventListener('mouseup', onRelease);

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
