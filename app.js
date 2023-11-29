
import 'umtrack-alipay';
App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
  //
  umengConfig: {
    appKey: '6566effeb2f6fa00ba88e30b', //由友盟分配的APP_KEY
    debug: true, //是否打开调试模式
    uploadUserInfo: true // 自动上传用户信息，设为false取消上传，默认为false
  }
});