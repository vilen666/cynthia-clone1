// import LocomotiveScroll from 'locomotive-scroll';
let timeout;
let timeout_color;
let centreMouseX = 0;
let centreMouseY = 0;
let inside = false;
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});
function circleMouseFollower() {
  let xprev = 0;
  let yprev = 0;
  let b;
  window.addEventListener("mousemove", (dets) => {
    clearTimeout(b);
    let xdiff = dets.x - xprev;
    let ydiff = dets.y - yprev;
    gsap.to("#minicircle", {
      x: dets.x + "px",
      y: dets.y + "px",
      duration: 0.3,
      scaleX: gsap.utils.clamp(0.8, 1.2, xdiff),
      scaleY: gsap.utils.clamp(0.8, 1.2, ydiff),
      onStart: () => {
        b = setTimeout(() => {
          console.log("reset");
          gsap.to("#minicircle", {
            scale: 1,
            duration: 0.2,
            ease: Expo,
          });
        }, 200)
      },
    });
    xprev = dets.x;
    yprev = dets.y;
  })
}
function firstPageAnim() {
  var t1 = gsap.timeline();
  t1.from("#nav", {
    y: "-100",
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 2,
      delay: -1,
      ease: Expo.easeInOut,
      stagger: 0.2, //delay between each element
    })
    .from("#footer", {
      y: +10,
      opacity: 0,
      delay: -1,
      duration: 2,
      ease: Expo.easeInOut,
    });
}
firstPageAnim();
circleMouseFollower();
function ImageHover() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function (dets) {
      inside = false;
      document.querySelector("#minicircle").style.transform="translate(-50%,-50%)";
      console.log(document.querySelector("#minicircle").style);
      document.querySelector("#view").style.display = "none";
      centreMouseX = 5;
      centreMouseY = 5;
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
      gsap.to(document.querySelector("#minicircle"), {
        ease: Power1,
        duration: 0,
        width: "10px",
        height: "10px",
      });
    });

    elem.addEventListener("mousemove", function (dets) {
      centreMouseX = 35;
      centreMouseY = 45;
      inside = true;
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power1,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot),
      });
      document.querySelector("#minicircle").style.transform="translate(-50%,-60%)";
      console.log(document.querySelector("#minicircle").style);
      document.querySelector("#view").style.display = "block";
      gsap.to(document.querySelector("#minicircle"), {
        ease: Power1,
        width: "5vw",
        delay:0,
        duration: 0,
        height: "5vw",
      });
    });
  });

}
ImageHover();
function mainAnim() {
  document.querySelector("#footer").querySelectorAll("a").forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      // console.log(elem);
      gsap.to(elem.querySelector("i"), {
        rotate: 45,
        ease: Power3,
        duration: 0.5
      });
    });
    elem.addEventListener("mouseleave", () => {
      // console.log(elem);
      gsap.to(elem.querySelector("i"), {
        rotate: 0,
        ease: Power3,
        duration: 0.5
      });
    });
  });
  document.querySelectorAll(".circle").forEach((elem) => {
    elem.addEventListener("mouseover", () => {
      console.log(elem);
      gsap.from(elem.querySelector("i"), {
        y: "-100%",
        ease: Expo,
        duration: 0.5,
      });
    })
  });
}
mainAnim();