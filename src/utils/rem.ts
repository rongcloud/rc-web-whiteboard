/**
 * rem 适配屏幕大小
 */
function setRem () {
  const html = document.getElementsByTagName("html")[0];
  const width = 1440 || (window as any).innerWidth; // 获取窗口的文档显示区的宽度
  const font_Size = 100 * (width / 1920); // 设计稿以1920为准，在1920的设计稿中：16px = 1rem
  html.style.fontSize = font_Size + "px";
  const body = document.getElementsByTagName("body")[0];
  body.style.fontSize = '16px'

  // let rempx;
  // function adapt (designWidth, rem2px) {
  //   if (((window as any).innerWidth <= 0 || (window as any).innerHeight <= 0)) {
  //     return undefined;
  //   }
  //   const head = (window as any).document.getElementsByTagName('head')[0];
  //   const defaultFontSize = 16;
  //   rempx = (window as any).innerWidth / (designWidth / rem2px);
  //   // 如果设置过则干掉
  //   const old = document.getElementById("eagle");
  //   if (old) {
  //     old.remove();
  //   }
  //   const st = document.createElement('style');
  //   st.setAttribute("id", "eagle");
  //   const portrait = "@media screen and (min-width: " + (window as any).innerWidth + "px) {html{font-size:" + ((rempx / defaultFontSize) * 100) + "%;}}";
  //   const landscape = "@media screen and (min-width: " + (window as any).innerHeight + "px) {html{font-size:" + (((window as any).innerHeight / (designWidth / rem2px) / defaultFontSize) * 100) + "%;}}"
  //   st.innerHTML = portrait + landscape;
  //   head.appendChild(st);
  //   return defaultFontSize
  // }
  // if ((window as any).innerWidth < 900) {
  //   adapt(750, 100);
  // } else {
  //   adapt(960, 100);
  // }
}
setRem();
(window as any).onresize = function () { setRem(); };



