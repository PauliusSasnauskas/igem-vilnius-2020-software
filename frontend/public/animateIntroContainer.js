// Title animation
function animate() {
    if (!document.body) return;
    let scrollTop = document.body.scrollTop === 0 ? document.documentElement.scrollTop : document.body.scrollTop;
    let scroll = scrollTop / window.innerHeight;
    if (scroll > 1) scroll = 1;
    let unit = "vw";
    if (window.innerWidth / window.innerHeight > 1) unit = "vh";
    // $(".introContainer span").css("top", (60 * scroll) + unit);
    document.querySelectorAll(".introContainer h1").forEach((el)=>{
        el.style.marginTop = (35 * scroll) + unit;
    });
}
window.addEventListener("scroll", animate, {passive: 1});
window.addEventListener("resize", animate, {passive: 1});
document.addEventListener("load", animate, {passive: 1});
animate();