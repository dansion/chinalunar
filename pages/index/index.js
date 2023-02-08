//var lunar=require('/lunar.js');
var lunar=require('/node_modules/lunar-javascript/lunar.js');

lunar.SolarUtil.XINGZUO=["\u2648","\u2649","\u264A","\u264B	","\u264C","\u264D","\u264E","\u264F	","\u2650","\u2651","\u2652	","\u2653"];

var color=require('/asset/color.js');
Page({
  data:{
    bgcolor:"#6F001E",
    d:{},
    toutchEvent:{},
    now:{},
    istoday:true
  },
  onLoad(query) {

    //my.setOptionMenu({
    //  icon: '在',
    //});

  // 页面加载

  this.animation = my.createAnimation({
   transformOrigin: "70% 30% 0",
    duration: 300,
    timeFunction: "ease-in",
    delay: 0,
  });
  //console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  //"titleBarColor": "#6F001E",
  //console.log(color.HexToHsl('#6F001E'))
  //console.log(color.HslToHex("hsl(343,100%,21%)"));
  //console.log(color.HslArrToHex(343,100,21));

   //let _rancolor=Math.floor(Math.random()*360);
   //console.log(_rancolor);


   let _rancolor=160;

   this.setColor(180);
   //this.data.bgcolor=color.HslArrToHex(_rancolor,100,21);

    //my.setNavigationBar({"titleBarColor": "#FF0000"});
    //my.setNavigationBar({backgroundColor:this.data.bgcolor})

  },
  onOptionMenuClick(){
    my.showToast({content:"顶部菜单"});
  },
  onReady() {
    this.setPageData();
  },
  onPress(e){
    //console(navigato)
    my.navigateTo({url:'/pages/set/set'});
  },
  touchMoveFun(e){
   
  },
  touchStartFun(e){
    
  this.animation.opacity(0.1).step();
  this.setData({ animation: this.animation.export()})
  this.data.toutchEvent=e.touches[0];

  },
  touchEndFun(e){
    //console.log("start");
    //console.log(this.data.toutchEvent);
    //console.log("end");
    //console.log(e.changedTouches[0]);
    this.animation.opacity(1).step();
    this.setData({ animation: this.animation.export()})

    
    //获取页面本来的日期
    let _data=this.data.now;
    //获取滑动前的坐标
    let _start=this.data.toutchEvent;
    //滑动停止的坐标
    let _end=e.changedTouches[0];

   
    //划动的距离
    let distance=Math.sqrt( Math.pow((_end.clientY-_start.clientY),2)+Math.pow((_end.clientX-_start.clientX),2));
    //计算划动向量角度，并增加45角度  
    let angle= ( Math.atan2((_end.clientY-_start.clientY),(_end.clientX-_start.clientX))* 180 / Math.PI + 360 + 45 ) % 360 ;
   
    //滑动距离少于11像素
    if(distance < 11 ){
        console.log("滑动太少");
        //_data=new Date();
        this.setPageData();
        

    }else {
      if(angle >= 0 && angle < 90){
        //console.log("向右");
        //my.showToast({content:"前一天"});
        _data=_data.setDate(_data.getDate()-1);
        _data=new Date(_data);
        this.setPageData(_data);

      }else if (angle >= 90 && angle < 180){
        //console.log("向下");
        //my.showToast({content:"上一月"});
        _data=_data.setMonth(_data.getMonth()-1);
        _data=new Date(_data);
        this.setPageData(_data);

      }else if(angle >= 180 && angle < 270){
        //console.log("向左");
        //my.showToast({content:"下一天"});
        _data=_data.setDate(_data.getDate()+1);
        _data=new Date(_data);
        this.setPageData(_data);

      }else if(angle >= 270 && angle < 360){
        //console.log("向上");
        //my.showToast({content:"下一月"});
        _data=_data.setMonth(_data.getMonth()+1);
        _data=new Date(_data);
        this.setPageData(_data);

      }
    }
  },
  setColor(H,S=100,L=21){
    let bgcolor=this.data.bgcolor;
        bgcolor=color.HslArrToHex(H,S,L);
        console.log(bgcolor);
        this.setData({bgcolor});

    my.setNavigationBar({backgroundColor:bgcolor,color:"#FFFFFF"});
  },
  setPageData(temp){
    //初始化日期
    let _now=new Date();

    if(!temp){
      temp=_now;
      this.data.istoday=true;
    }else{
      if(temp.getDate()==_now.getDate() && temp.getMonth()==_now.getMonth() && temp.getFullYear()==_now.getFullYear()){
        this.data.istoday=true;
      }else{
        this.data.istoday=false;
      }
    }
    this.data.now=temp;



    var _d=temp;
    var solar_d=lunar.Solar.fromDate(_d);
    var lunar_d =lunar.Lunar.fromDate(_d);
    //

    //console.log(lunar.HolidayUtil.getHoliday(solar_d.getYear(),solar_d.getMonth(),solar_d.getDay()));
    ////
    //获得法定假日信息

    let holiday=lunar.HolidayUtil.getHoliday(solar_d.getYear(),solar_d.getMonth(),solar_d.getDay());
    let iswork=((solar_d.getWeek()+1)%7) > 1; /* 是否工作日 */
    //holiday.isWork() 为是否为调休 


    if(holiday){
      if(holiday.isWork()){
          iswork=!iswork;
      }else{
          iswork=false;
      }
    }


    if(!iswork){
      this.setColor(340);
    }else{
      this.setColor(180);
    }

    
    //console.log(lunar.HolidayUtil.getHoliday(2021,10,1));

    //console.log(lunar_d.getTimes());
    //console.log(lunar.Lunar.fromDate(new Date()).toFullString());
    // 节日：.getFestivals()




    var d=this.data.d;
        d.week=solar_d.getWeekInChinese();
        d.festivals=solar_d.getFestivals() + lunar_d.getFestivals() + lunar_d.getJieQi();
        d.year=solar_d.getYear();
        d.month=solar_d.getMonth();
        d.day=solar_d.getDay();
        d.xingzuo=solar_d.getXingZuo();

    /* 特别颜色定义 */
    if(lunar_d.getFestivals()=="春节"){
      this.setColor(347,100,44);
    }
    if(solar_d.getFestivals()=="情人节"){
      this.setColor(333,78,57);
    }

    /*

      .getMonthInChinese()
      .getDayInChinese()
      d.getYearInGanZhi()
      d.getYearInGanZhiByLiChun()); 立春
      d.getMonthInGanZhi());
      d.getDayInGanZhi());
      .getYearShengXiao();
      .getYearShengXiaoExact();  立春

      d.getDayYi();
      d.getDayJi();



    */
    d.lunarMouth=lunar_d.getMonthInChinese();
    d.lunarDay=lunar_d.getDayInChinese();
    
    //处理农历大小月
    let lunarMouthCount=lunar.LunarMonth.fromYm(lunar_d.getYear(),lunar_d.getMonth()).getDayCount();
    d.lunarMouthIs30=lunarMouthCount>29?"大":"小";

    // lunar.LunarMonth.fromYm(lunar_d.getYear(),lunar_d.getMonth()).getDayCount();
    // lunar.LunarMonth.fromYm(2012, -4).getDayCount();

    //console.log(lunar.LunarMonth.fromYm(lunar_d.getYear(),lunar_d.getMonth()).getDayCount());

    d.yearganzhi=lunar_d.getYearInGanZhi();
    d.mouthganzhi=lunar_d.getMonthInGanZhi();
    d.dayganzhi=lunar_d.getDayInGanZhi();
    d.shengxiao=lunar_d.getYearShengXiao();

    //每日宜
    d.yi=lunar_d.getDayYi();
    d.yi_small=d.yi.length > 15?"samll_txt":"";
   
    //每日忌
    d.ji=lunar_d.getDayJi();
    d.ji_small=d.ji.length > 15 ?"samll_txt":"";

    d.yanggui=lunar_d.getPositionYangGui()+lunar_d.getPositionYangGuiDesc();
    d.yingui=lunar_d.getPositionYinGui()+lunar_d.getPositionYinGuiDesc();
    d.xi=lunar_d.getPositionXi()+lunar_d.getPositionXiDesc();
    d.cai=lunar_d.getPositionCai()+lunar_d.getPositionCaiDesc();
    d.fu=lunar_d.getPositionFu()+lunar_d.getPositionFuDesc();


    //console.log('日冲：'+d.getDayChongDesc());
    //console.log('日煞：'+d.getDaySha());

    d.chong=lunar_d.getDayChongDesc();
    d.sha=lunar_d.getDaySha();
    //getDayPositionTai()
    //getMonthPositionTai()

    d.daytai=lunar_d.getDayPositionTai();
    d.monthtai=lunar_d.getMonthPositionTai();

    //星宿 getXiu()，.getAnimal()，.getXiuLuck()

    
    d.xiu=lunar_d.getGong()+"方【"+lunar_d.getXiu()+lunar_d.getAnimal()+"】";
    d.xinluck=lunar_d.getXiuLuck();
    d.xinluckclass=(d.xinluck=='吉')?"ji":"xiong";

    //console.log(lunar_d.getGong());

    //.getZhiXing() 建除十二星
    d.zhixing=lunar_d.getZhiXing();
    //纳音五行 
    d.nayin=lunar_d.getDayNaYin();
    //.getDayTianShen() 天神  / .getDayTianShenType() 黄黑道 .getDayTianShenLuck()
    d.tianshen=lunar_d.getDayTianShen()+"【"+lunar_d.getDayTianShenType()+"】";
    d.tianshenluck=lunar_d.getDayTianShenLuck();


    d.tianshenluckclass=(d.tianshenluck=='吉')?"ji":"xiong";
   // d.tianshenluckclass=(lunar_d.getDayTianShenLuck()='吉')?"ji":"xiong";
    // .getDayJiShen() 吉神 .getDayXiongSha() 凶神




    d.jishen=lunar_d.getDayJiShen().join(" - ");
    d.xiongsha=lunar_d.getDayXiongSha().join(" - ");

    //.getPengZuGan() ，.getPengZuZhi()
    d.pengzu=lunar_d.getPengZuGan() + "  " + lunar_d.getPengZuZhi();

    /*

      console.log('干: ' + lunarTime.getGan());
      console.log('支: ' + lunarTime.getZhi());
      console.log('干支: ' + lunarTime.getGanZhi());
      console.log('生肖: ' + lunarTime.getShengXiao());
      console.log('喜神方位: ' + lunarTime.getPositionXi());
      console.log('喜神方位描述: ' + lunarTime.getPositionXiDesc());
      console.log('阳贵神方位: ' + lunarTime.getPositionYangGui());
      console.log('阳贵神方位描述: ' + lunarTime.getPositionYangGuiDesc());
      console.log('阴贵神方位: ' + lunarTime.getPositionYinGui());
      console.log('阴贵神方位描述: ' + lunarTime.getPositionYinGuiDesc());
      console.log('福神方位: ' + lunarTime.getPositionFu());
      console.log('福神方位描述: ' + lunarTime.getPositionFuDesc());
      console.log('财神方位: ' + lunarTime.getPositionCai());
      console.log('财神方位描述: ' + lunarTime.getPositionCaiDesc());
      console.log('纳音: ' + lunarTime.getNaYin());
      console.log('天神: ' + lunarTime.getTianShen());
      console.log('天神类型: ' + lunarTime.getTianShenType());
      console.log('天神吉凶: ' + lunarTime.getTianShenLuck());
      console.log('冲: ' + lunarTime.getChong());
      console.log('煞: ' + lunarTime.getSha());
      console.log('冲生肖: ' + lunarTime.getChongShengXiao());
      console.log('冲描述: ' + lunarTime.getChongDesc());
      console.log('无情之克冲天干: ' + lunarTime.getChongGan());
      console.log('有情之克冲天干: ' + lunarTime.getChongGanTie());
      console.log('宜: ' + lunarTime.getYi());
      console.log('忌: ' + lunarTime.getJi());
      console.log('九星: ' + lunarTime.getNineStar());
      console.log('旬: ' + lunarTime.getXun());
      console.log('旬空: ' + lunarTime.getXunKong());
      console.log('时间段: ' + lunarTime.getMinHm() + '-' + lunarTime.getMaxHm());


      d.getTimes();  时间对象

      .getTianShenLuck()

    */

    // 时辰吉凶
    d.times=[];
    
    var _times=lunar_d.getTimes();

    //console.log( Math.ceil((this.data.now.getHours()) / 2));
    var _nowtime=this.data.istoday?Math.ceil(this.data.now.getHours()/2):-1;   /* 当前时辰对应数组 */
   
    for(var i=0;i<_times.length;i++){
      let _style=(_times[i].getTianShenLuck()=="吉")?"ji":"xiong";
      let _nowstle=(i==_nowtime)?"now":"";
      d.times.push({"ganzhi":_times[i].getGanZhi(),"tianshen":_times[i].getTianShen(),"jixiong":_times[i].getTianShenLuck(),"style":_style,"now":_nowstle});
    }
    //console.log(d.times)

   




    this.setData({d});
  },
  onShow() {
    // 页面显示

     my.showToast({content:"左右滑动按天翻动日历，上下滑动按月翻动，点击回到当前日期"});
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: '老黄历',
      desc: '中国传统老黄历',
      path: 'pages/index/index',
    };
  },
});
