/* 皇城殡仪 —— 服务数据、预约清单/订单存储 */
window.HJ = (function(){
  var PKEY='hc_products_cart', OKEY='hc_orders';

  // 火化服务 / 殡葬用品数据（图片为本地免费图库图）
  var PRODUCTS=[
    {id:'p01',name:'标准火化服务套餐',cat:'火化服务',price:1880,old:2280,img:'assets/images/scene-hall.jpg',
     desc:'含遗体接运、告别厅简易布置、标准火化及骨灰整理，全程专人协助。',
     detail:'适合追求简约庄重的家庭，包含市内遗体接运、单次火化、骨灰盒基础款与骨灰寄存一年。服务流程透明，专员一对一跟进。',
     sizes:['单人','双人'],material:'标准火化炉',include:'遗体接运·简易告别·火化·骨灰整理·寄存一年',tags:['热销','标准']},
    {id:'p02',name:'尊贵火化服务套餐',cat:'火化服务',price:3880,old:4580,img:'assets/images/scene-candles.jpg',
     desc:'高档火化炉、专属告别厅、遗容整理与司仪主持，体面送别。',
     detail:'含市内遗体接运与冷藏、高档炉火化、独立告别厅 3 小时、专业司仪、遗容整理、鲜花布置及骨灰盒升级款。适合注重仪式感的家庭。',
     sizes:['单人','双人'],material:'高档火化炉',include:'接运·冷藏·独立告别厅·司仪·遗容整理·火化',tags:['热销','尊贵']},
    {id:'p03',name:'石雕骨灰坛·经典款',cat:'骨灰坛',price:1280,old:1680,img:'assets/images/urn-stone.jpg',
     desc:'天然石材雕刻，纹饰庄重，密封防潮，可长久安放。',
     detail:'选用优质花岗岩，手工雕刻传统纹样，内置密封内胆。规格适中，适合家庭存放或墓园安放，附赠防尘布套。',
     sizes:['小号','中号','大号'],material:'天然花岗岩',include:'骨灰坛·密封内胆·防尘布套·纪念铭牌',tags:['热销','石材']},
    {id:'p04',name:'玉石骨灰坛·典藏款',cat:'骨灰坛',price:2980,old:3580,img:'assets/images/urn-classic.jpg',
     desc:'温润玉石质感，精工雕琢，寓意福泽绵长，庄重典雅。',
     detail:'仿玉树脂与天然石粉复合材质，色泽温润，细节考究。配有鎏金铭牌与木质底座，兼顾美观与稳固，是许多家庭的选择。',
     sizes:['中号','大号'],material:'玉石复合材质',include:'骨灰坛·木质底座·鎏金铭牌·绒布内衬',tags:['高端','典藏']},
    {id:'p05',name:'大型告别厅租赁',cat:'告别厅',price:2680,old:3280,img:'assets/images/scene-hall.jpg',
     desc:'宽敞庄重的大型告别厅，可容纳百人，配鲜花与电子屏。',
     detail:'面积约 120 平米，可容纳 80–120 位亲友。含花艺布置、横幅、电子 memorial 屏、音响与座位，适合举办追悼会。按需选择使用时段。',
     sizes:['3 小时','半天','全天'],material:'大型厅 · 百人规模',include:'厅堂·花艺·横幅·电子屏·音响·座椅',tags:['场地','庄重']},
    {id:'p06',name:'生态树葬·纪念套餐',cat:'生态安葬',price:4680,old:5280,img:'assets/images/grave-moss.jpg',
     desc:'回归自然的树葬方式，含纪念树、草坪葬位与纪念牌，环保节地。',
     detail:'响应节地生态安葬理念，含正规生态葬位、纪念树一棵、可降解骨灰容器、纪念铭牌及年度维护。园区环境清幽，可常年祭扫。',
     sizes:['单穴','双穴'],material:'生态草坪葬位',include:'葬位·纪念树·可降解容器·纪念牌·年度维护',tags:['新品','环保']},
    {id:'p07',name:'遗体接运与冷藏服务',cat:'火化服务',price:880,old:1080,img:'assets/images/scene-white-flower.jpg',
     desc:'24 小时专业接运，配备冷藏设备，跨区转运安全稳妥。',
     detail:'覆盖全市及周边地区，使用专业接运车辆与冷藏设备，全程卫生规范操作。可指定接运时间与地点，支持跨区转运，费用按里程核算。',
     sizes:['市内','跨区'],material:'专业接运车辆',include:'接运·冷藏·卫生处理·随行护送',tags:['加急','24h']},
    {id:'p08',name:'雕花骨灰坛·艺术款',cat:'骨灰坛',price:1980,old:2480,img:'assets/images/urn-ornate.jpg',
     desc:'浮雕工艺，线条流畅，兼具艺术感与庄重气质。',
     detail:'采用高强度复合石材浮雕成型，纹饰立体细腻，色泽沉稳。附赠绒布内衬与防尘罩，适合注重审美与品质的家庭。',
     sizes:['中号','大号'],material:'浮雕复合石材',include:'骨灰坛·绒布内衬·防尘罩·纪念铭牌',tags:['新品','艺术']}
  ];

  function readCart(){try{return JSON.parse(localStorage.getItem(PKEY)||'[]')}catch(e){return []}}
  function saveCart(c){try{localStorage.setItem(PKEY,JSON.stringify(c))}catch(e){}}
  function addCart(id,size,qty){
    qty=qty||1;var c=readCart();var found=c.find(function(x){return x.id===id&&x.size===size});
    if(found){found.qty+=qty}else{c.push({id:id,size:size||'标准',qty:qty})}
    saveCart(c);return c.length;
  }
  function updateQty(id,size,qty){
    var c=readCart();c=c.map(function(x){if(x.id===id&&x.size===size)x.qty=qty;return x}).filter(function(x){return x.qty>0});
    saveCart(c);return c;
  }
  function removeCart(id,size){saveCart(readCart().filter(function(x){return !(x.id===id&&x.size===size)}))}
  function cartDetail(){
    return readCart().map(function(x){
      var p=PRODUCTS.find(function(y){return y.id===x.id});
      return p?{id:x.id,size:x.size,qty:x.qty,name:p.name,img:p.img,price:p.price}:null;
    }).filter(Boolean);
  }
  function cartCount(){return readCart().reduce(function(s,x){return s+x.qty},0)}
  function cartTotal(){return cartDetail().reduce(function(s,x){return s+x.price*x.qty},0)}

  function readOrders(){try{return JSON.parse(localStorage.getItem(OKEY)||'[]')}catch(e){return []}}
  function saveOrders(o){try{localStorage.setItem(OKEY,JSON.stringify(o))}catch(e){}}
  function orderNo(){
    var d=new Date(),p=function(n){return ('0'+n).slice(-2)};
    var stamp=''+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate());
    return 'HC-'+stamp+'-'+('0000'+Math.floor(Math.random()*10000)).slice(-4);
  }
  function placeOrder(info){
    var o=readOrders();var order={
      no:orderNo(),time:new Date().toLocaleString('zh-CN',{hour12:false}),
      items:cartDetail(),total:cartTotal(),info:info,status:'待服务'
    };
    o.unshift(order);saveOrders(o);saveCart([]);return order;
  }

  function money(n){return '¥'+Number(n).toLocaleString('zh-CN')}
  function fmtDate(){var d=new Date();return d.getFullYear()+'-'+('0'+(d.getMonth()+1)).slice(-2)+'-'+('0'+d.getDate()).slice(-2)}

  return {PRODUCTS:PRODUCTS,getProduct:function(id){return PRODUCTS.find(function(p){return p.id===id})},
    readCart:readCart,addCart:addCart,updateQty:updateQty,removeCart:removeCart,cartDetail:cartDetail,
    cartCount:cartCount,cartTotal:cartTotal,readOrders:readOrders,placeOrder:placeOrder,
    orderNo:orderNo,money:money,fmtDate:fmtDate,clearCart:function(){saveCart([])}};
})();
