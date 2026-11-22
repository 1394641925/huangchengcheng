/* 皇城殡仪 —— 公共交互：导航抽屉 / 购物车角标 / 提示 */
(function(){
  // 购物车角标
  function paintCart(){
    var els=document.querySelectorAll('[data-cart-count]');
    if(!els.length)return;
    var n=window.HJ?window.HJ.cartCount():0;
    els.forEach(function(e){e.textContent=n;e.style.display=n>0?'inline':'none'});
  }
  paintCart();

  // 抽屉
  var burger=document.getElementById('burger'),mask=document.getElementById('drawerMask'),drawer=document.getElementById('drawer');
  function openD(){if(mask)mask.classList.add('on');if(drawer)drawer.classList.add('on')}
  function closeD(){if(mask)mask.classList.remove('on');if(drawer)drawer.classList.remove('on')}
  if(burger)burger.addEventListener('click',openD);
  if(mask)mask.addEventListener('click',closeD);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeD()});

  // lightbox（产品图放大）
  window.HJToast=function(msg){
    var t=document.getElementById('toast');
    if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('on');
    clearTimeout(t._t);t._t=setTimeout(function(){t.classList.remove('on')},2200);
  };
})();
